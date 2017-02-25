import * as express from 'express';
import * as bodyParser from 'body-parser';

import { BotController } from './src/BotController';

const app: express.Application = express();

const port: number = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/', BotController);

app.listen(port, () => {
    console.log(`Stella listening at http://localhost:${port}/`);
});
