import type { SendMesssageOptions } from '../types'

const postMessage = async ({
  text,
  chatId,
  messageId,
  token,
}: SendMesssageOptions) => {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      chat_id: chatId,
      parse_mode: 'markdown',
      ...(Boolean(messageId) && {reply_to_message_id: messageId})
    }),
  }

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, options)
  } catch (error: any) {
    console.log(error);
    throw new Error(`Couldn't send message: ${error.message}`)
  }
}

export { postMessage }
