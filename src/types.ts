export type Environment = {
  SECRET_TELEGRAM_API_TOKEN: string
  SECRET_TWITTER_BEARER_TOKEN: string
  SECRET_NOTION_API_KEY: string
  SECRET_NOTIOB_DB: string
}

export type SendMesssageOptions = {
  chatId: number
  text: string
  token: string
  messageId?: number
}

export type TweetError = {
  errors: any[],
  title: string,
  detail: string,
  type: string,
};

export type Tweet = {
  data: {
    author_id: string,
    text: string,
    conversation_id: string,
    id: string,
  },
  includes: {
    users: Array<{
      profile_image_url: string,
      id: string,
      username: string,
      name: string,
    }>,
    media: Array<{
      type: string,
      url: string,
    }>
  },
}

export type ProccesedTweet = {
  title: string
  tweetText: string
  authorName: string
  authorPhoto: string
  tweetUrl: string
  photos: string[]
}
