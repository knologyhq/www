"use strict";

const { WebClient } = require('@slack/web-api');
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

// Slack configuration
const slackToken = process.env.SLACK_TOKEN; // Your Slack bot token
const web = new WebClient(slackToken);

// Netlify API configuration
const apiAuth = process.env.API_AUTH;
const netlifyApiUrl = "https://api.netlify.com/api/v1/submissions/";

// Replace 'CMZ8L7V9N-1693580427.669119' with the actual channel ID where you want your app to listen for messages.
const specificChannelId = 'CMZ8L7V9N-1693580427.669119';

// Start listening for Slack events in the specified channel
function listenForMessages(channelId) {
  if (channelId === specificChannelId) {
    web.chat.postMessage({
      channel: channelId,
      text: "Listening for 'approve' or 'delete' messages...",
    });

    const eventEmitter = web.socketMode().start();

    eventEmitter.on('message', async (event) => {
      const { text, channel } = event;
      if (text) {
        const lowercaseText = text.toLowerCase();
        if (lowercaseText === 'approve' || lowercaseText === 'delete') {
          // Assuming the channel ID represents the comment ID
          const commentId = channel;

          if (lowercaseText === 'approve') {
            await handleApproval(commentId, channelId);
          } else if (lowercaseText === 'delete') {
            await handleDeletion(commentId, channelId);
          }
        }
      }
    });
  }
}

// Function to handle comment approval
async function handleApproval(commentId, channelId) {
  try {
    const commentData = await fetchCommentData(commentId);
    if (!commentData) {
      return;
    }

    const approvedPayload = prepareApprovedPayload(commentData);
    await postToApprovedForm(approvedPayload);

    await purgeComment(commentId);
    replyToUser(channelId, "Comment approved!");
  } catch (error) {
    console.error("Error:", error);
  }
}

// Function to handle comment deletion
async function handleDeletion(commentId, channelId) {
  try {
    await purgeComment(commentId);
    replyToUser(channelId, "Comment deleted!");
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

// Function to reply to the user in Slack
async function replyToUser(channel, message) {
  try {
    await web.chat.postMessage({
      channel: channel,
      text: message,
    });
  } catch (error) {
    console.error("Error replying to user:", error.message);
  }
}

// Start listening for Slack messages
listenForMessages(specificChannelId);
