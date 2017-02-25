import { Request } from 'express';
import * as request from 'request';
import { FB_ACCESS_TOKEN, } from '../keys';
const FB_URL = 'https://graph.facebook.com/v2.6/me/messages';

export const getEvents = (req: Request) => req.body.entry[0].messaging;

export const sendTextMessage = (id: String, text: String) => {
	const messageData = { text };
    const config = {
		url: FB_URL,
		qs: { access_token: FB_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id },
			message: messageData,
		}
	};

	const reply = new Promise((resolve: Function, reject: Function) => {
		request(config, function(error, response, body) {
			if (error) {
				reject(error);
			} else if (response.body.error) {
				reject(response.body.error);
			} else {
				resolve({ response, body });
			}
		});
	});
	reply.then(console.log);
	reply.catch(console.log);
};
