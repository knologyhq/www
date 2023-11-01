"use strict";

const request = require("request");
require("dotenv").config();

exports.handler = async function(event, context) {
	try {
		const body = JSON.parse(event.body);
		const slackURL = process.env.SLACK_WEBHOOK_URL;

		const slackPayload = {
			text: `New comment on ${process.env.URL}`,
			attachments: [
				{
					fallback: "New comment on the website",
					color: "#444",
					author_name: `${body.data.first_name} ${body.data.last_name}`,
					title: body.data.path,
					title_link: `${process.env.URL}${body.data.path}`,
					text: body.data.comment
				},
				{
					fallback: `Manage comments on ${process.env.URL}`,
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
				return {
					statusCode: 500,
					body: `Failed to post to Slack: ${err}`
				};
			}
		});
		return {
			statusCode: 200,
			body: "Notification sent to Slack."
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: `Error: ${error}`
		};
	}
};
