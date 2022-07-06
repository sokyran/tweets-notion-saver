import type { Client } from '@notionhq/client'

async function saveToNotion(notion: Client, notionDb: string, text: string, icon: string, url: string) {
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
          title: [
            {
              text: {
                content: text,
              },
            },
          ],
        },
        Link: {
          url,
        },
      },
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
