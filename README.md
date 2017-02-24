## A Facebook Messenger 🤖  with Typescript

### Setup the Facebook App

1. Run ./node_modules/.bin/lt --port 3000, this will output the URL

2. Create or configure a Facebook Page here https://developers.facebook.com/apps/

3. Select the Messenger tab and click Setup Webhook. Here you will put in the URL of your local dev server and a token. Make sure to check all the subscription fields.

4. Get a Page Access Token and save it to a file called keys.ts.

```
// keys.ts
export const FB_ACCESS_TOKEN = <PAGE_ACCESS_TOKEN>;
```

5. Execute

    ```bash
    curl -X POST "https://graph.facebook.com/v2.6/me/subscribed_apps?access_token=<PAGE_ACCESS_TOKEN>"
    ```

