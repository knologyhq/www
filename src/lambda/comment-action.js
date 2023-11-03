"use strict";

var request = require("request");

// populate environment variables locally.
require("dotenv").config();

/*
  delete this submission via the api
*/
function purgeComment(id) {
  var url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
  request.delete(url, function(err, response, body) {
    if (err) {
      return console.log("Error deleting comment:", err);
    } else {
      return console.log("Comment deleted from queue.");
    }
  });
}

/*
  Handle the lambda invocation
*/
export function handler(event, context, callback) {
  // Added logging here
  console.log("Received Slack action event:", JSON.stringify(event, null, 2));

  // parse the payload
  var body = event.body.split("payload=")[1];
  var payload = JSON.parse(unescape(body));
  var method = payload.actions[0].name;
  var id = payload.actions[0].value;

  if (method == "delete") {
    purgeComment(id);
    callback(null, {
      statusCode: 200,
      body: "Comment deleted"
    });
  } else if (method == "approve") {
    // get the comment data from the queue
    var url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;

    request(url, function(err, response, body) {
      if (!err && response.statusCode === 200) {
        var data = JSON.parse(body).data;
        var created_at = JSON.parse(body).created_at;
        console.log("Fetched comment data:", data);
        console.log("Fetched comment datetime:", created_at);

        // now we have the data, let's massage it and post it to the approved form
        var payload = {
          "form-name": "comments-approved",
          path: data.path,
          postId: data.postId,
          received: new Date().toString(),
          last_name: data.last_name,
          first_name: data.first_name,
          comment: data.comment,
          "comment_date": created_at // Preserve the original timestamp
        };
        var approvedURL = process.env.URL;

        console.log("Posting to", approvedURL);

        request.post({ url: approvedURL, formData: payload }, function(
          err,
          httpResponse,
          body
        ) {
          var msg;
          if (err) {
            msg = "Post to approved comments failed:" + err;
            console.log(msg);
          } else {
            msg = "Post to approved comments list successful.";
            console.log(msg);
            purgeComment(id);
          }
          callback(null, {
            statusCode: 200,
            body: "Comment registered. Site deploying to include it."
          });
        });
      } else {
        console.log("Error fetching comment:", err);
      }
    });
  }
}
