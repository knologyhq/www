const { App, ExpressReceiver } = require('@slack/bolt');
const request = require('request');
const dotenv = require('dotenv');

dotenv.config();

const expressReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: expressReceiver,
});

// Custom route for Netlify
expressReceiver.router.post('/netlify-handler', (req, res) => {
  const body = JSON.parse(req.body);
  const slackURL = process.env.SLACK_WEBHOOK_URL;
  const slackPayload = {
    text: "New comment on " + process.env.URL,
    attachments: [
      {
        fallback: "New comment on the Knology web site",
        color: "#444",
        author_name: body.data.first_name,
        title: body.data.path,
        title_link: process.env.URL + body.data.path,
        text: body.data.comment
      },
      {
        fallback: "Manage comments on " + process.env.URL,
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

  request.post({ url: slackURL, json: slackPayload }, function(err, httpResponse, body) {
    if (err) {
      console.log("Post to Slack failed:" + err);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Post to Slack successful! Server responded with:" + body);
      res.status(200).send('Notification Sent');
    }
  });
});

app.action('comment-action', async ({ action, ack, respond }) => {
  await ack();

  const method = action.name;
  const id = action.value;

  if (method === 'delete') {
    const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
    request.delete(url, function(err, response, body) {
      if (err) {
        console.log(err);
        respond({ text: 'Failed to delete comment.' });
      } else {
        console.log("Comment deleted from queue.");
        respond({ text: 'Comment deleted' });
      }
    });
  } else if (method === 'approve') {
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
            console.log("Post to approved comments failed:" + err);
            respond({ text: 'Failed to approve comment.' });
          } else {
            console.log("Post to approved comments list successful.");
            respond({ text: 'Comment approved' });
            // Purge the comment from the queue
            request.delete(url, function(err, response, body) {
              if (err) {
                console.log("Failed to delete comment from queue: " + err);
              } else {
                console.log("Comment deleted from queue.");
              }
            });
          }
        });
      } else {
        console.log("Failed to get comment data.");
        respond({ text: 'Failed to approve comment.' });
      }
    });
  }
});

// Initialize your app
(async () => {
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();
