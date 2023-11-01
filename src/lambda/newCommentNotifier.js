const axios = require('axios');
require('dotenv').config();

exports.handler = async function(event, context) {
	try {
		console.log('newCommentNotifier function invoked');

		const body = JSON.parse(event.body);

		// prepare call to the Slack API
		const slackURL = process.env.SLACK_WEBHOOK_URL;
		const slackPayload = {
			text: 'New comment on ' + process.env.URL,
			attachments: [
				{
					fallback: 'New comment',
					color: '#444',
					author_name: `${body.data.first_name} ${body.data.last_name}`,
					title: body.data.path,
					title_link: process.env.URL + body.data.path,
					text: body.data.comment,
				},
				{
					fallback: 'Manage comments',
					callback_id: 'comment-action',
					actions: [
						{
							type: 'button',
							text: 'Approve comment',
							name: 'approve',
							value: body.id,
						},
						{
							type: 'button',
							style: 'danger',
							text: 'Delete comment',
							name: 'delete',
							value: body.id,
						},
					],
				},
			],
		};

		console.log('Sending payload to Slack: ', JSON.stringify(slackPayload));

		const result = await axios.post(slackURL, slackPayload);

		console.log('Slack API response:', result.data);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Notification sent' }),
		};

	} catch (error) {
		console.log('Error:', error);

		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to notify' }),
		};
	}
};
