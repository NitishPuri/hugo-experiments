const axios = require('axios').default;
const fb_config = require('./keys/config').facebook;

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
    getInstagramId = (pageId) => this.getNode(pageId, 'name,instagram_business_account')

    async createIGMedia(ig_user_id, params) {
        const containerCreationURL =  `${this.base_url + ig_user_id}/media`;
        console.log(containerCreationURL)
        console.log(params)

        params.access_token = fb_config.accessToken
        try {
            const response = await axios.post(containerCreationURL, params);
            console.log(`Response from : ${containerCreationURL} : ${response.status}`)            
            console.log(`IG Media Container ID : ${response.data.id}`)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }
    
    async createIGImageMedia(ig_user_id, imageURL, caption) {
        return this.createIGMedia(ig_user_id, {
            image_url: imageURL,            
            caption: caption
        })
    }

    async createIGVideoMedia(ig_user_id, video_url, caption, is_reel = false) {
        return this.createIGMedia(ig_user_id, {
            media_type: (is_reel ? 'REELS' : 'VIDEO'),
            video_url: video_url,            
            caption: caption,
            thumb_offset: 1
        })
    }

    async verifyIGVideoContainer(container_id) {
        // https://developers.facebook.com/docs/instagram-api/reference/ig-user/media#response
        // https://developers.facebook.com/docs/instagram-api/reference/ig-container
        // TODO: Also add `status` to check the reason of failure. https://developers.facebook.com/docs/instagram-api/reference/error-codes#error-codes
        const verifyURL = `${this.base_url + container_id}`;
        const verifyURLWithParams = `${verifyURL}?fields=status,status_code&access_token=${fb_config.accessToken}`

        try {
            const response = await axios.get(verifyURLWithParams);
            console.log(`Response from : ${verifyURL} : ${response.status}`)            
            console.log(`Verification Status : ${response.data.status_code}`)            
            return { status_code : response.data.status_code, status: response.data.status };
        } catch (error) {
            console.error(error);
        }

        return false
    }
    
    async publishIGmedia(ig_user_id, creation_id) {
        // https://developers.facebook.com/docs/instagram-api/reference/ig-user/media#creating
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
        // https://developers.facebook.com/docs/pages/publishing/#publish-a-page-post
        const page_post_url = `${this.base_url + fb_page.id}/feed`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.token,
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
        // https://developers.facebook.com/docs/pages/publishing/#publish-a-photo
        const page_post_url = `${this.base_url + fb_page.id}/photos`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.token,
                url: image_url                
            })
            console.log(`Posted photo to page [${fb_page.id}] with status [${response.status}] `)
            console.log(`Post id : [${response.data.post_id}]`)
            console.log(`Photo id : [${response.data.id}]`)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    async publishFBVideo(fb_page, video_url) {
        // https://developers.facebook.com/docs/pages/publishing/#publish-a-video
        const page_post_url = `${this.base_url + fb_page.id}/videos`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.token,
                file_url: video_url                
            })
            console.log(`Posted video to page [${fb_page.id}] with status [${response.status}] `)
            console.log(`Video id : [${response.data.id}]`)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    async postFBPostComment(fb_page, post_id, comment) {
        // https://developers.facebook.com/docs/pages/publishing/#comment-on-a-post
        const page_post_url = `${this.base_url + post_id}/comments`
        try {
            const response = await axios.post(page_post_url, {
                access_token: fb_page.token,
                message: comment                
            })
            console.log(`Posted comment to post [${post_id}] with status [${response.status}] `)
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

module.exports = {FB};
