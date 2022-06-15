# Save Tweets to Notion using Cloudflare and Telegram

## Install local environment


0. Create Telegram bot 
1. Create Cloudflare Worker
2. Create Notion Database 
3. Look for `ENVIRONMENT` type in src/types.ts and set all secret with `wrangler secret put SECRET_SOMETHING`
4. `npm i`
5. `wrangler dev`
6. `ngrok http http://localhost:8787`
7. Get that url
8. Visit [Telegram Bot SDK](https://telegram-bot-sdk.readme.io/reference/setwebhook) and setWebhook
9. Now you can write to this bot! No this one, but the one you create
