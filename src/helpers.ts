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

	request(config, function(error, response, body) {
		if (error) {
			console.log('Error sending messages: ', error)
		} else if (response.body.error) {
			console.log('Error: ', response.body.error)
		}
	});
};
