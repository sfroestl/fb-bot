import { Router, Request, Response } from 'express';
import { sendTextMessage, indicateWriting, getUserDetails, sendButton } from './FbApi';
import ai from './ai';
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const router: Router = Router();

export const getEvents = (req: Request) => req.body.entry[0].messaging;

function handleWebhook(req: Request, res: Response) {
	console.log('received webhook body=', req.body);

	getEvents(req).forEach((messagingEvent) => {
		if (messagingEvent.message) {
			receivedMessage(messagingEvent);
		} else if (messagingEvent.postback) {
			receivedPostback(messagingEvent);
		} else {
			console.log('Webhook received unknown messagingEvent: ', messagingEvent);
		}
	});
	res.sendStatus(200);
}

function receivedMessage(event) {
	const text: string = event.message.text;
	const senderId: string = event.sender.id;

	indicateWriting(senderId);

	ai
		.ask(senderId, text)
		.then((aiResponse: any) => {
			console.log('---aiResponse=', aiResponse);
			const { speech } = aiResponse.result.fulfillment;
			sendTextMessage(senderId, speech)
				.catch(console.log);
		})
		.catch((error) => {
			console.log('API Error', error);
		});
}

function receivedPostback(event) {
	const payload: string = event.postback.payload;
	const senderId: string = event.sender.id;

	indicateWriting(senderId);

	if (payload === 'GREAT') {
		sendTextMessage(senderId, `I'm glad you feel great!`);
	}

	if (payload === 'BAD') {
		sendTextMessage(senderId, `I'm sorry to hear you feel bad!`);
	}
}

function sendMood(id: string) {
	console.log('Sending mood query!');
	sendButton(id, 'How do you feel right now?');
}

router.get('/', (req: Request, res: Response) => {
	res.send('Hello world I am Stella.')
});

router.get('/webhook', (req: Request, res: Response) => {
	console.log('webhook validation!');
	if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong token');
	}
});

router.get('/mood', (req, res) => {
	const userId = req.query['user'];
	sendMood(userId);
	res.sendStatus(200);
});

router.post('/message', (req, res) => {
	const { userId, message } = req.body;
	sendTextMessage(userId, message);
	res.sendStatus(200);
});

router.post('/webhook', handleWebhook);

export const BotController: Router = router;
