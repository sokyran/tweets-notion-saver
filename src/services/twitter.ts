import type { TweetError, Tweet } from '../types'

const processTweet = (tweet: Tweet, tweetUrl: string) => {
  const picUrlRegex = /( ?https:\/\/t\.co\/[\d\w]+)+$/;
  const title = tweet.data.text.replace(picUrlRegex, '').trim();
  const authorName = tweet.includes.users[0].name;
  const authorPhoto = tweet.includes.users[0].profile_image_url;
  const photos = tweet.includes.media ? tweet.includes.media: [];

  return {
    title, authorName, authorPhoto, tweetUrl, photos,
  }
}

const getTweet = async (tweetId: string, bearer: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${bearer}`,
      'Content-Type': 'application/json',
    },
  }

  const url = `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=conversation_id&expansions=attachments.media_keys,referenced_tweets.id,referenced_tweets.id.author_id&media.fields=url&user.fields=profile_image_url`;

  const twitterResponse: any = await (await fetch(url, config)).json();

  if (twitterResponse.errors) {
    const twitterError: TweetError = twitterResponse;
    throw new Error(twitterError.detail);
  }
  const twitterData: Tweet = twitterResponse;

  return twitterData;
}

export { processTweet, getTweet }
