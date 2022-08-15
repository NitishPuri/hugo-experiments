const { TwitterApi } = require('twitter-api-v2');
const config = require('./keys/config');
const axios = require('axios').default;

class Twitter {
    twitterClient = new TwitterApi(config.twitter.config)
    
    async currentUser() {
        const currentUser = await this.twitterClient.currentUser();
        console.log(currentUser);
        return currentUser;
    }

    async tweetText(text) {
        const tweet_response = await this.twitterClient.v1.tweet(text);
        console.log(`Tweet posted on ${tweet_response.created_at} with id {${tweet_response.id}}: `)
        return tweet_response.id;
    }

    async commentOnTweet(text, tweet_id) {
        const tweet_response = await this.twitterClient.v1.reply(text, tweet_id)
        console.log(`Tweet posted on ${tweet_response.created_at} with id {${tweet_response.id}}: `)
        return tweet_response.id;
    }

    async tweetImage(caption, filepath) {        
        const mediaIds = await Promise.all([
          this.twitterClient.v1.uploadMedia('./' + filepath)
        ])
        console.log("Twitter media uploaded : ", mediaIds)
        const tweet_response = await this.twitterClient.v1.tweet(caption, { media_ids: mediaIds })
        console.log(`Tweet posted on ${tweet_response.created_at} with id {${tweet_response.id}}: `)
        return tweet_response.id;
    }
}

class TwitterNative {
    async lookupUser(username) {
        // curl "https://api.twitter.com/2/users/by/username/{username}" -H "Authorization: Bearer $BEARER_TOKEN"
        const url = `https://api.twitter.com/2/users/by/username/${username}`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${config.twitter.bearerToken}`
            }
        })
        console.log(response.data)
    }
    async currentUserv2() {
        // curl "https://api.twitter.com/2/users/me" -H "Authorization: OAuth $OAUTH_SIGNATURE"
        // curl "https://api.twitter.com/2/users/me" -H "Authorization: OAuth 240619432-gYkD55uSH3U8LGrVIdlUbohTgkDC9NCBATfNyd8e"
        const url = `https://api.twitter.com/2/users/me`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `OAuth oauth_consumer_key`
            }
        })
        console.log(response.data)
    }

    async currentUserv1() {
        // curl "https://api.twitter.com/2/users/me" -H "Authorization: OAuth $OAUTH_SIGNATURE"
        // curl "https://api.twitter.com/2/users/me" -H "Authorization: OAuth 240619432-gYkD55uSH3U8LGrVIdlUbohTgkDC9NCBATfNyd8e"
        const url = `https://api.twitter.com/1.1/account/verify_credentials.json`
        const response = await axios.get(url, {
            headers: {
                'Authorization': `OAuth oauth_consumer_key=${config.twitter}`
            }
        })
        console.log(response.data)
    }

}


module.exports = { Twitter, TwitterNative};