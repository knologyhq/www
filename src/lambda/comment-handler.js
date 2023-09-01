"use strict";

const { App } = require("@slack/bolt");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Slack configuration
const slackToken = process.env.SLACK_TOKEN; // Your Slack bot token
const slackSigningSecret = process.env.SLACK_SIGNING_SECRET; // Your Slack signing secret
const app = new App({
  token: slackToken,
  signingSecret: slackSigningSecret,
});

// Netlify API configuration
const apiAuth = process.env.API_AUTH;
const netlifyApiUrl = "https://api.netlify.com/api/v1/submissions/";

// Replace 'CMZ8L7V9N-1693580427.669119' with the actual channel ID where you want your app to listen for messages.
const specificChannelId = "CMZ8L7V9N-1693580427.669119";

// Listen for messages in the specified channel
app.message(async ({ message, say }) => {
  if (message.channel === specificChannelId) {
    const text = message.text.toLowerCase();
    if (text === "approve" || text === "delete") {
      const commentId = message.ts; // Assuming the timestamp represents the comment ID
      if (text === "approve") {
        await handleApproval(commentId, say);
      } else if (text === "delete") {
        await handleDeletion(commentId, say);
      }
    }
  }
});

// Function to handle comment approval
async function handleApproval(commentId, say) {
  try {
    const commentData = await fetchCommentData(commentId);
    if (!commentData) {
      return;
    }

    const approvedPayload = prepareApprovedPayload(commentData);
    await postToApprovedForm(approvedPayload);

    await purgeComment(commentId);
    say("Comment approved!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle comment deletion
async function handleDeletion(commentId, say) {
  try {
    await purgeComment(commentId);
    say("Comment deleted!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to fetch comment data from the Netlify API
async function fetchCommentData(commentId) {
  try {
    const response = await axios.get(`${netlifyApiUrl}${commentId}?access_token=${apiAuth}`);
    if (response.status === 200) {
      return response.data.data;
    }
    console.error("Error fetching comment data:", response.statusText);
  } catch (error) {
    console.error("Error:", error.message);
  }
  return null;
}

// Function to prepare data for the approved form
function prepareApprovedPayload(commentData) {
  return {
    "form-name": "comments-approved",
    path: commentData.path,
    postId: commentData.postId,
    received: new Date().toString(),
    last_name: commentData.last_name,
    first_name: commentData.first_name,
    comment: commentData.comment,
  };
}

// Function to post data to the approved form
async function postToApprovedForm(payload) {
  try {
    const approvedURL = process.env.URL;
    const approvedResponse = await axios.post(approvedURL, payload);
    console.log("Post to approved comments:", approvedResponse.data);
  } catch (error) {
    console.error("Error posting to approved comments:", error.message);
  }
}

// Function to delete a comment from the queue
async function purgeComment(id) {
  try {
    const url = `${netlifyApiUrl}${id}?access_token=${apiAuth}`;
    await axios.delete(url);
    console.log("Comment deleted from queue.");
  } catch (error) {
    console.error("Error deleting comment:", error.message);
  }
}

// Export the Bolt app for use as a Netlify function handler
exports.handler = async (event, context) => {
  await app.start();
  console.log("⚡️ Bolt app is running!");
};
