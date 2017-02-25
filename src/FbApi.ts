import { Request } from 'express';
import * as request from 'request';

const BASE_API = 'https://graph.facebook.com/v2.8';
const FB_MSG_URL = `${BASE_API}/me/messages`;
const FB_ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;
const USER_FIELDS = 'first_name,last_name,profile_pic,locale,timezone,gender';

interface IFbMessageUser {
	id: string;
};

interface IFbResponse {
	recipient: IFbMessageUser;
	message?: any;
	sender_action?: any,
};

export interface IFacebookProfile {
	first_name?: string;
	last_name?: string;
	profile_pic?: string;
	locale?: string;
	timezone?: number;
	gender?: string;
};

function dispatchMessage(response: IFbResponse) {
	const { recipient, message } = response;
	console.log(`dispatch message to user id=${recipient.id}`);
	const config = {
		url: FB_MSG_URL,
		qs: { access_token: FB_ACCESS_TOKEN },
		method: 'POST',
		json: {
			recipient,
			message,
		}
	};
	return new Promise((resolve: Function, reject: Function) => {
		request(
			config,
			function (error, response, body) {
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

export const indicateWriting = (id: string) => {
	const response: IFbResponse = {
		recipient: { id },
		sender_action: 'typing_on',
	};
	return dispatchMessage(response);
};

export const sendTextMessage = (id: string, text: string) => {
	console.log(`sening message to id=${id} message=${text}`);
	const response: IFbResponse = {
		recipient: { id },
		message: { text },
	};
	return dispatchMessage(response);
};

export const sendButton = (id: string, text: string) => {
	console.log(`sening button to id=${id} message=${text}`);
	const response: IFbResponse = {
		recipient: { id },
		message: {
			attachment: {
				type: 'template',
				payload: {
					template_type: 'button',
					text,
					buttons: [{
						type: 'postback',
						title: 'Great',
						payload: 'GREAT',
					},
					{
						type: 'postback',
						title: 'Bad',
						payload: 'BAD',
					}],
				},
			},
		},
	};
	return dispatchMessage(response);
};

export const getUserDetails = (id: string): Promise<IFacebookProfile> => {
	const config = {
		url: `${BASE_API}/${id}`,
		qs: { fields: USER_FIELDS, access_token: FB_ACCESS_TOKEN },
		method: 'GET',
	};
	return new Promise((resolve: Function, reject: Function) => {
		request(
			config,
			(err, res, body) => {
				if (err) {
					console.log('facebook: could not get user from facebook err=', err);
					reject(err);
				}
				if (res.statusCode >= 400) {
					console.log('facebook: could not get user from facebook err=', body);
					reject(new Error(`facebook: Error getting profile for user ${JSON.stringify(body)} ${JSON.stringify(id)}`));
				}
				var obj = {};
				try {
					obj = JSON.parse(body);
				} catch (e) {
					obj = body;
				}
				return resolve(<any>obj);
			});
	});
};
