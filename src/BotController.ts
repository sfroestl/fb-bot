import { Router, Request, Response } from 'express';
import { getEvents, sendTextMessage } from './helpers';
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const router: Router = Router();

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

router.post('/webhook', (req: Request, res: Response) => {
	const events = getEvents(req);
    console.log('webhook triggered! events=', events.length);
	for (let i = 0; i < events.length; i++) {
		const event = events[i];
        console.log('---EVENT=', event);
		const senderId = event.sender.id;
		if (event.message && event.message.text) {
			const text = event.message.text;
			sendTextMessage(senderId, `Echo: ${text.substring(0, 200)}`);
		}
	}
	res.sendStatus(200);
});

export const BotController: Router = router;
