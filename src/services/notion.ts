import type { Client } from '@notionhq/client'
import { ProccesedTweet } from '../types';

type SaveToNotionProps = {
  notion: Client,
  notionDb: string,
  url: string,
  tweet: ProccesedTweet,
}

async function saveToNotion({
  notion,
  notionDb,
  tweet,
  url,
}: SaveToNotionProps) {
  const { title, tweetText, authorName, authorPhoto: icon, photos: pictures} = tweet;

  try {
    return await notion.pages.create({
      parent: { database_id: notionDb },
      icon: {
        type: 'external',
        external: {
          url: icon,
        },
      },
      properties: {
        title: {
          title: [{ text: { content: title } }],
        },
        Link: { url },
        Author: {
          "rich_text": [
            { text: { content: authorName }},
          ]
        }
      },
      children: [
        {
          object: 'block',
          callout: {
            rich_text: [{ text: { content: tweetText } }],
            icon: {
              external: {
                url: icon,
              },
            },
            children: pictures?.map((pictureUrl) => (
              {
                type: 'image',
                image: {
                  type: 'external',
                  external: {
                    url: pictureUrl,
                  },
                }
              }
            ))
          },
        },
      ],
    })
  } catch (error: any) {
    throw new Error(`Couldn't save to Notion: ${error.message}`)
  }
}

async function updateNotionPage(notion: Client, pageId: string, newTitle: string) {
  try {
    await notion.pages.update({
      page_id: pageId,
      properties: {
        title: {
          title: [
            { text: { content: newTitle } },
          ],
        },
      },
    });
  } catch (error: any) {
    throw new Error(`Couldn't update Notion page: ${error.message}`)
  }
};


export {
  saveToNotion,
  updateNotionPage,
}
