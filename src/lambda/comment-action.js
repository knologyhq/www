"use strict";

const axios = require("axios");
const querystring = require("querystring");
const dotenv = require("dotenv");
dotenv.config();

/*
  Delete this submission via the API
*/
async function purgeComment(id) {
  try {
    const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
    const response = await axios.delete(url);
    console.log("Comment deleted from queue.");
  } catch (error) {
    console.error("Error deleting comment:", error.message);
  }
}

/*
  Handle the lambda invocation
*/
exports.handler = async (event) => {
  try {
    console.log("Slack got inside the handler!");
    // parse the payload
    const payload = JSON.parse(querystring.parse(event.body).payload);
    const method = payload.actions[0].name;
    const id = payload.actions[0].value;

    if (method === "delete") {
      await purgeComment(id);
      return {
        statusCode: 200,
        body: "Comment deleted",
      };
    } else if (method === "approve") {
      // get the comment data from the queue
      const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const data = response.data.data;
        console.log(data);

        // prepare data to post to the approved form
        const approvedPayload = {
          "form-name": "comments-approved",
          path: data.path,
          postId: data.postId,
          received: new Date().toString(),
          last_name: data.last_name,
          first_name: data.first_name,
          comment: data.comment,
        };
        const approvedURL = process.env.URL;

        console.log("Posting to", approvedURL);

        const approvedResponse = await axios.post(approvedURL, querystring.stringify(approvedPayload));
        console.log("Post to approved comments:", approvedResponse.data);

        await purgeComment(id);

        const msg = "Comment registered. Site deploying to include it.";
        return {
          statusCode: 200,
          body: msg,
        };
      }
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing the request." }),
    };
  }
};
