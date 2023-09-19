const { App } = require("@slack/bolt");
const request = require("request");

// Initialize your Bolt App.
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listen to a Slack action with the callback_id "comment-action"
app.action("comment-action", async ({ ack, body, client }) => {
  await ack();
  const method = body.actions[0].name;
  const id = body.actions[0].value;

  if (method === "delete") {
    purgeComment(id);
  } else if (method === "approve") {
    // Logic to approve comment
    approveComment(id);
  }
});

async function purgeComment(id) {
  const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
  
  request.delete(url, function(err, response, body) {
    if (err) {
      console.log("Comment deletion failed:", err);
    } else {
      console.log("Comment deleted from queue.");
    }
  });
}

async function approveComment(id) {
  const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
  
  request(url, function(err, response, body) {
    if (!err && response.statusCode === 200) {
      const data = JSON.parse(body).data;
      
      const payload = {
        "form-name": "comments-approved",
        path: data.path,
        postId: data.postId,
        received: new Date().toString(),
        last_name: data.last_name,
        first_name: data.first_name,
        comment: data.comment
      };
      const approvedURL = process.env.URL;
      
      request.post({ url: approvedURL, formData: payload }, function(err, httpResponse, body) {
        if (err) {
          console.log("Post to approved comments failed:", err);
        } else {
          console.log("Post to approved comments list successful.");
          purgeComment(id);
        }
      });
    }
  });
}

// Netlify serverless function
exports.handler = async function(event, context, callback) {
  const body = JSON.parse(event.body);
  const slackPayload = {
    text: "New comment on " + process.env.URL,
    attachments: [
      {
        fallback: "New comment",
        color: "#444",
        author_name: body.data.first_name + " " + body.data.last_name,
        title: body.data.path,
        title_link: process.env.URL + body.data.path,
        text: body.data.comment
      },
      {
        fallback: "Manage comments",
        callback_id: "comment-action",
        actions: [
          {
            type: "button",
            text: "Approve comment",
            name: "approve",
            value: body.id
          },
          {
            type: "button",
            style: "danger",
            text: "Delete comment",
            name: "delete",
            value: body.id
          }
        ]
      }
    ]
  };
  
  // Post the notification to Slack
  const slackURL = process.env.SLACK_WEBHOOK_URL;
  request.post({ url: slackURL, json: slackPayload }, function(err, httpResponse, body) {
    if (err) {
      callback(null, {
        statusCode: 500,
        body: "Post to Slack failed:" + err
      });
    } else {
      callback(null, {
        statusCode: 200,
        body: "Post to Slack successful!"
      });
    }
  });
};
