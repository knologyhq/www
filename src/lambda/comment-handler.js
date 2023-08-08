"use strict";

const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

exports.handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const slackPayload = {
      text: `New comment on ${process.env.URL}`,
      attachments: [
        {
          fallback: "New comment on the Knology web site",
          color: "#444",
          author_name: body.data.first_name,
          title: body.data.path,
          title_link: `${process.env.URL}${body.data.path}`,
          text: body.data.comment,
        },
        {
          fallback: `Manage comments on ${process.env.URL}`,
          callback_id: "comment-action",
          actions: [
            {
              type: "button",
              text: "Approve comment",
              name: "approve",
              value: body.id,
            },
            {
              type: "button",
              style: "danger",
              text: "Delete comment",
              name: "delete",
              value: body.id,
            },
          ],
        },
      ],
    };

    const response = await axios.post(process.env.SLACK_WEBHOOK_URL, slackPayload);

    return {
      statusCode: response.status,
      body: JSON.stringify({ message: "Post to Slack successful!", response: response.data }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An error occurred while posting to Slack." }),
    };
  }
};
