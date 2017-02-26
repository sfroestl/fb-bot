## A Facebook Messenger 🤖  with Typescript


### Start the Bot

1. Setup
    ```bash
        $ npm i
    ```

2. Dev
    ```bash
        $ npm run dev
        $ npm run server
    ```

3. Using https://localtunnel.github.io/www/ to generate a public https connection to your local dev server.
    ```bash
    ./node_modules/.bin/lt --port 3000 # this will output the URL for the webhook
    ```

### Setup the Facebook App

1. Create or configure a Facebook Page here: https://developers.facebook.com/apps/

2. Select the Messenger tab and click Setup Webhook.
    - Put in the URL of localtunnel + /webhook. Check all subscription fields.
    - Put in a Verify Token and save it.

3. Get a Page Access Token and save it.

4. Execute to validate the token
    ```bash
    curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"
    ```

### Create an api.ai account and save the client acces token.

### Export all tokens

```bash
    export FB_ACCESS_TOKEN=<PAGE_ACCESS_TOKEN>
    export VERIFY_TOKEN=<WEBHOOK_VERIFY_TOKEN>
    export API_AI_TOKEN=<API_AI_TOKEN>
```
