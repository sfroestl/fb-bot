import { ApiAiClient, IServerResponse } from "api-ai-javascript/ApiAiClient";

const { API_AI_TOKEN } = process.env;

const ai = new ApiAiClient({ accessToken: API_AI_TOKEN });

export default {
    ask,
};

function ask(query: String) {
  return new Promise((resolve, reject) => {
    const request = ai.textRequest(query)
        .then(resolve)
        .catch(reject);
  });
}
