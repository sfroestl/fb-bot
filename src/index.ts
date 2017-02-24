import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as request from 'request';
import { FB_ACCESS_TOKEN, VERIFY_TOKEN } from '../keys';

const PORT = 3000;

const FB_URL = 'https://graph.facebook.com/v2.6/me/messages';

const getEvents = (req) => req.body.entry[0].messaging;

const sendTextMessage = (id, text) => {
	const messageData = { text: text };
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

const app = express();

app.set('port', PORT);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello world I am Stella.'));

app.get('/webhook', (req, res) => {
    console.log('webhook validation!');
	if (req.query['hub.verify_token'] === VERIFY_TOKEN) {
		res.send(req.query['hub.challenge']);
	} else {
		res.send('Error, wrong token');
	}
});

app.post('/webhook', (req, res) => {
    console.log('webhook triggered!');
	const events = getEvents(req);
	for (let i = 0; i < events.length; i++) {
		const event = events[i];
		const senderId = event.sender.id;
		if (event.message && event.message.text) {
			const text = event.message.text;
			sendTextMessage(senderId, `Echo: ${text.substring(0, 200)}`);
		}
	}
	res.sendStatus(200);
});

app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'));
});
