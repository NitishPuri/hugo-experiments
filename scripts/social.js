const axios = require('axios').default;
const { TwitterApi } = require('twitter-api-v2');
const { Storage } = require('@google-cloud/storage');
const config = require('./config.js');
const fb_config = config.facebook;

class FB {    
    pages = fb_config.pages;
    insta = fb_config.insta;
    base_url = 'https://graph.facebook.com/v12.0/';

    async get(endpoint, params = {}) {
        const url = this.base_url + endpoint;
        console.log("Fetching : ", url);
        params['access_token'] = fb_config.accessToken;
        try {
            const response = await axios.get(url, {params: params});
            console.log(`Response from : ${url} : ${response.status} , ${response.statusText}`);
            console.log(response.data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    getNode(nodeId, fields = '') {
        let params = {};
        if(fields !== '') {
            params['fields'] = fields;
        }
        return this.get(nodeId, params);
    }

    getFBUser = () => this.getNode(fb_config.userId)
    getPage = (page) => this.getNode(page)
    getPermissions = () => this.get('me/permissions')
    getAccounts = () => this.get(`${fb_config.userId}/accounts`)

    async createIGMedia(ig_user_id, imageURL, caption) {
        const containerCreationURL =  `${this.base_url + ig_user_id}/media`;
        console.log(imageURL)
        console.log(containerCreationURL)
        try {
            const response = await axios.post(containerCreationURL, {
                image_url: imageURL,
                access_token: fb_config.accessToken,
                caption: caption
            });
            console.log(`Response from : ${containerCreationURL} : ${response.status}`)            
            console.log(response.data)
            console.log(`IG Media Container ID : ${response.data.id}`)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }   

    async publishIGmedia(ig_user_id, creation_id) {
        const publishURL = `${this.base_url + ig_user_id}/media_publish`;
        console.log(publishURL)
        try {
            const response = await axios.post(publishURL, {
                access_token: fb_config.accessToken,
                creation_id: creation_id
            })
            console.log(`Response from : ${publishURL} : ${response.status}`);
            console.log(response.data)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    async listIGMedia(ig_user_id) {
        return this.get(`${ig_user_id}/media`)
    }

    async describeIGMedia(ig_media_id) {
        await this.get(`${ig_media_id}`, {
            'fields': 'id,caption,comments_count,like_count,media_product_type,media_type,media_url,permalink,shortcode'
        })
        await this.get(`${ig_media_id}/insights`, {
            'metric': 'engagement,impressions,reach,saved'
        })
    }

    async commentOnIGMedia(ig_media_id, comment) {
        const commentURL = `${this.base_url + ig_media_id}/comments`
        try {
            const response = await axios.post(commentURL, {
                access_token: fb_config.accessToken,
                message: comment
            })
            console.log(`Response from : ${commentURL} : ${response.status} , ${response.statusText}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async publishFBFeed(fb_page, message) {
        const page_post_url = `${this.base_url + fb_page.id}/feed`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.accessToken,
                message: message
            })
            console.log(`Posted to page [${fb_page.id}] with status [${response.status}] `)
            console.log(`Post id : [${response.data.id}]`)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    async publishFBPhoto(fb_page, image_url) {
        const page_post_url = `${this.base_url + fb_page.id}/photos`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.accessToken,
                url: image_url                
            })
            console.log(`Posted photo to page [${fb_page.id}] with status [${response.status}] `)
            console.log(`Post id : [${response.data.post_id}]`)
            console.log(`Photo id : [${response.data.id}]`)
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    async getAccessToken(config) {
        const accessTokenURL = 'http://graph.facebook.com/v12.0/oauth/access_token?';
        const response = await axios.post()
        request.post({
            url: accessTokenURL,
            form: {
                grant_type: 'fb_exchange_token',
                client_id: config.appId,
                client_secret: config.appSecret,
                fb_exchange_token: config.accessToken
            },
        }, (error, response, body) => {
            // const bodyObj 
        })
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

class GCS {
    gcstorage = new Storage({keyFilename: 'scripts/starry-folder-225114-3baffa34f0d9.json'})
    gcsPrefix = 'https://storage.googleapis.com/'

    async uploadFileGCS(filepath, destFileName) {
        let res = await this.gcstorage.bucket(config.gcs.bucketName).upload(filepath, {
          destination: destFileName, 
        });
      
        //TODO: How to check if upload was successfull??        
        console.log(`${filepath} uploaded to ${config.gcs.bucketName}`);
        const gcsImagePath = this.gcsPrefix + config.gcs.bucketName + '/' + destFileName;
        return gcsImagePath;
      }
      
}

module.exports = {FB, Twitter, TwitterNative, GCS};