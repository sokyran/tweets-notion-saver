import { Client } from '@notionhq/client'
import type { Message } from 'node-telegram-bot-api'

import type { Environment } from './types'

import { saveToNotion, updateNotionPage } from './services/notion';
import { postMessage } from './services/telegram';
import { getTweet, processTweet } from './services/twitter';

let millisFromLastMessage = 0;
let lastCreatedNotionPageId = '';

export default {
  async fetch(req: Request, env: Environment): Promise<Response> {
    const { message }: { message: Message } = await req.json();
    if (!message) {
      return new Response('probably edited message'); 
    }
    const { id: chatId } = message.chat;
    const { message_id: messageId } = message;

    const sendMessage = (text: string, replyToMessage = false) => (
      postMessage({
        chatId,
        text,
        token: env.SECRET_TELEGRAM_API_TOKEN,
        ...(replyToMessage && { messageId: messageId })
      })
    );

    const fetchWithPatch = async (
      url: Parameters<typeof fetch>[0],
      init: Parameters<typeof fetch>[1]
    ): ReturnType<typeof fetch> => {
      if (init?.method === 'patch') {
        // @ts-ignore
        init.method = 'PATCH';
      };
      return await fetch(url, init);
    };

    const notion = new Client({ auth: env.SECRET_NOTION_API_KEY, fetch: fetchWithPatch });

    const text = message.text ?? '';
    const isURL = text.startsWith('https://');
    const tweetUrl = text.indexOf('?') > 0 ?  text.slice(0, text.indexOf('?')) : text;
    const tweetId = tweetUrl.split('/').pop();

    const secondsFromLastMessage = Math.floor((Date.now() - millisFromLastMessage) / 1000);

    console.log(lastCreatedNotionPageId);

    if (secondsFromLastMessage <= 30 && !isURL && lastCreatedNotionPageId) {
      try {
        await updateNotionPage(notion, lastCreatedNotionPageId, text);
        await sendMessage('Updated title! 👌');
      } catch (error: any) {
        await sendMessage(`*Couldn't update title*.\n${error.message}`, true);
      };
    };

    millisFromLastMessage = Date.now();

    if (tweetId && isURL) {
      try {
        const tweet = await getTweet(
          tweetId,
          env.SECRET_TWITTER_BEARER_TOKEN,
        );

        const proccesed = processTweet(tweet, tweetUrl);

        const { id } = await saveToNotion(notion, env.SECRET_NOTIOB_DB, proccesed.title, proccesed.authorPhoto, tweetUrl);
        lastCreatedNotionPageId = id;

        await sendMessage('__yep__, seems like added to your db 👌', true);
        await sendMessage('And now you have 30 seconds to add title to that note. Rememba, no links! ⏱️');
      } catch (error: any) {
        await sendMessage(`*Didn't quite get that link*.\n${error.message}`, true);
      }
    }
    return new Response('aight, everything is cool, mate')
  },
}
