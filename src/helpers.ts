import { Request } from 'express';
import * as request from 'request';

const FB_URL = 'https://graph.facebook.com/v2.6/me/messages';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

export const getEvents = (req: Request) => req.body.entry[0].messaging;

export const sendTextMessage = (id: String, text: String) => {
	const messageData = { text };
    const config = {
		url: FB_URL,
		qs: { access_token: FB_ACCESS_TOKEN },
		method: 'POST',

	};
	const writing = new Promise((resolve: Function, reject: Function) => {
		request({
			...config,
			json: { recipient: { id },
				sender_action: 'typing_on',
			},
		}, function(error, response, body) {
			if (error) {
				reject(error);
			} else if (response.body.error) {
				reject(response.body.error);
			} else {
				resolve({ response, body });
			}
		});
	});

	const reply = new Promise((resolve: Function, reject: Function) => {
		setTimeout(() => {
			request({
				...config,
				json: { recipient: { id },
					message: messageData
				}
			}, function(error, response, body) {
				if (error) {
					reject(error);
				} else if (response.body.error) {
					reject(response.body.error);
				} else {
					resolve({ response, body });
				}
			});
		}, 500);
	});
};
