import { Request } from 'express';
import * as request from 'request';

const FB_URL = 'https://graph.facebook.com/v2.6/me/messages';
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

export const getEvents = (req: Request) => req.body.entry[0].messaging;

export const indicateWriting = (id: String) => {
	const config = {
		url: FB_URL,
		qs: { access_token: FB_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id },
			sender_action: 'typing_on',
		},
	};
	return new Promise((resolve: Function, reject: Function) => {
		request(config, (error, response, body) => {
			if (error) {
				reject(error);
			} else if (response.body.error) {
				reject(response.body.error);
			} else {
				resolve({ response, body });
			}
		});
	});
}

export const sendTextMessage = (id: string, text: string) => {
	console.log(`sening message to id=${id} message=${text}`);
    const config = {
		url: FB_URL,
		qs: { access_token: FB_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient: { id },
			message: { text }
		}
	};

	return new Promise((resolve: Function, reject: Function) => {
		request(
			config
			, function(error, response, body) {
			if (error) {
				reject(error);
			} else if (response.body.error) {
				reject(response.body.error);
			} else {
				resolve({ response, body });
			}
		});
	});
};
