"use strict";

const request = require("request");
require("dotenv").config();

function purgeComment(id) {
	const url = `https://api.netlify.com/api/v1/submissions/${id}?access_token=${process.env.API_AUTH}`;
	request.delete(url, function(err, response, body) {
		if (err) {
			return console.log(err);
		} else {
			return console.log("Comment deleted from queue.");
		}
	});
}

exports.handler = async function(event, context, callback) {
	try {
		const body = event.body.split("payload=")[1];
		const payload = JSON.parse(unescape(body));
		const method = payload.actions[0].name;
		const id = payload.actions[0].value;

		if (method === "delete") {
			purgeComment(id);
			return {
				statusCode: 200,
				body: "Comment deleted"
			};
		} else if (method === "approve") {
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
					const approvedURL = process.env.APPROVED_COMMENTS_URL;

					request.post({ url: approvedURL, formData: payload }, function(err, httpResponse, body) {
						if (err) {
							console.log(`Post to approved comments failed: ${err}`);
						} else {
							console.log("Post to approved comments list successful.");
							purgeComment(id);
						}
					});
				}
			});
			return {
				statusCode: 200,
				body: "Comment approved."
			};
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: `Error: ${error}`
		};
	}
};
