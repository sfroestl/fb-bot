import * as apiai from 'apiai';
const { API_AI_TOKEN } = process.env;

const ai = apiai(API_AI_TOKEN);

export default {
    ask
};

function ask(id: string, query: string) {
    console.log('ask', query, id);
    return new Promise((resolve, reject) => {
        const request = ai.textRequest(query, { sessionId: id });
        request.on('response', (response) => resolve(response));
        request.on('error', (err) => reject(err));
        request.end();
    });
}
