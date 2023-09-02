const { App, ExpressReceiver } = require('@slack/bolt');
const axios = require('axios');

const app = new App({
  signingSecret: 'YOUR_SLACK_SIGNING_SECRET',
  token: 'YOUR_SLACK_BOT_TOKEN',
  receiver: new ExpressReceiver({ signingSecret: 'YOUR_SLACK_SIGNING_SECRET' }),
});

let appStarted = false;

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
    say('Comment approved!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to handle comment deletion
async function handleDeletion(commentId, say) {
  try {
    await purgeComment(commentId);
    say('Comment deleted!');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Function to fetch comment data from the Netlify API
async function fetchCommentData(commentId) {
  try {
    // Implement your logic to fetch comment data here
    // Example: const response = await axios.get(`YOUR_API_ENDPOINT/${commentId}`);
    // Ensure you parse and return the comment data from the response
    return commentData;
  } catch (error) {
    console.error('Error:', error.message);
  }
  return null;
}

// Function to prepare data for the approved form
function prepareApprovedPayload(commentData) {
  return {
    'form-name': 'comments-approved',
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
    // Implement your logic to post data to the approved form here
    // Example: const approvedResponse = await axios.post('YOUR_APPROVED_FORM_ENDPOINT', payload);
    // Ensure you handle the response as needed
  } catch (error) {
    console.error('Error posting to approved comments:', error.message);
  }
}

// Function to delete a comment from the queue
async function purgeComment(id) {
  try {
    // Implement your logic to delete a comment from the queue here
    // Example: const url = `YOUR_QUEUE_API_ENDPOINT/${id}`;
    // Example: await axios.delete(url);
  } catch (error) {
    console.error('Error deleting comment:', error.message);
  }
}

// Event listener for new comment added to the queue
app.event('commentAdded', async ({ event, say }) => {
  try {
    // Fetch comment data from your comment-queue
    const commentData = await fetchCommentData(event.commentId);

    // Construct a message to post to Slack
    const message = {
      token: 'YOUR_SLACK_BOT_TOKEN',
      channel: 'YOUR_SPECIFIC_CHANNEL_ID', // Specify the Slack channel where you want to post the message
      text: 'New comment in the queue:',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*Author*: ${commentData.author}\n*Comment*: ${commentData.comment}`,
          },
        },
        // Add more blocks as needed to display additional comment details
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Approve',
              },
              action_id: 'approve_button',
              value: commentData.commentId, // Replace with the actual comment ID
            },
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: 'Delete',
              },
              action_id: 'delete_button',
              value: commentData.commentId, // Replace with the actual comment ID
            },
          ],
        },
      ],
    };

    // Send the message to Slack
    await app.client.chat.postMessage(message);

  } catch (error) {
    console.error('Error posting comment to Slack:', error);
  }
});

// Listener for button actions (Approve or Delete)
app.action('approve_button', async ({ ack, body, say }) => {
  // Acknowledge the button click
  await ack();

  // Retrieve the comment ID from the button's value
  const commentId = body.actions[0].value;

  // Handle comment approval
  await handleApproval(commentId, say);
});

app.action('delete_button', async ({ ack, body, say }) => {
  // Acknowledge the button click
  await ack();

  // Retrieve the comment ID from the button's value
  const commentId = body.actions[0].value;

  // Handle comment deletion
  await handleDeletion(commentId, say);
});

// Export the Bolt app for use as a Netlify function handler
exports.handler = async (event, context) => {
  try {
    // Start the Bolt app only if it's not already running
    if (!appStarted) {
      await app.start();
      appStarted = true;
      console.log("⚡️ Bolt app is running!");

      // Send the introductory message
      sendIntroductoryMessage(specificChannelId); // Make sure to specify the channel ID
    }

    // Respond to the Netlify function request
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Bolt app is running!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while processing the request." }),
    };
  }
};
