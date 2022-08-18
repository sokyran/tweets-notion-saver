# Save Tweets to Notion using Cloudflare and Telegram

## Showcase

<img width="590" alt="image" src="https://user-images.githubusercontent.com/28529576/173915581-9dc1921c-3bae-4eac-9a15-e62cdcd9e91b.png">


<img width="901" alt="image" src="https://user-images.githubusercontent.com/28529576/173913201-2493760a-141a-409a-bde1-00fdd3385b72.png">


## Requirements

0. Register a Telegram bot
1. You need to get Twitter developer account first, so that you can parse tweets with their API
2. You also need to create API key for Notion page, but that's not so hard
3. Create Cloudflare worker, install their CLI
4. Install ngrok

## Install local environment


0. Create Telegram bot 
1. Create Cloudflare Worker
2. Create Notion Database 
3. Look for `ENVIRONMENT` type in `src/types.ts` and set all secret with `wrangler secret put SECRET_SOMETHING`
4. `npm i`
5. `wrangler dev`
6. `ngrok http http://localhost:8787`
7. Get that url
8. Visit [Telegram Bot SDK](https://telegram-bot-sdk.readme.io/reference/setwebhook) and setWebhook
9. Now you can write to this bot! No this one, but the one you create
