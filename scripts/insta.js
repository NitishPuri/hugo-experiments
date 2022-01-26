const axios = require('axios').default;
var config = require('./config.js').facebook;

var baseUrl = 'https://graph.facebook.com/v12.0/';
class FB {    
    pages = config.pages;
    insta = config.insta;

    async get(endpoint, params = {}) {
        const url = baseUrl + endpoint;
        console.log("Fetching : ", url);
        params['access_token'] = config.accessToken;
        try {
            const response = await axios.get(url, {params: params});
            console.log(`Response from ${url} : ${response.status}`);
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

    getFBUser = () => this.getNode(config.userId)
    getPage = (page) => this.getNode(page)
    getPermissions = () => this.get('me/permissions')
    getAccounts = () => this.get(`${config.userId}/accounts`)

    async createIGMedia(ig_user_id, imageURL, caption) {
        const containerCreationURL =  `${baseUrl + ig_user_id}/media`;
        console.log(imageURL)
        console.log(containerCreationURL)
        try {
            const response = await axios.post(containerCreationURL, {
                image_url: imageURL,
                access_token: config.accessToken,
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
        const publishURL = `${baseUrl + ig_user_id}/media_publish`;
        console.log(publishURL)
        try {
            const response = await axios.post(publishURL, {
                access_token: config.accessToken,
                creation_id: creation_id
            })
            console.log(`Response from : ${publishURL} : ${response.status}`);
            console.log(response.data)
            return response.data.id;
        } catch (error) {
            console.error(error);
        }
    }

    async commentOnMedia(ig_media_id, comment) {
        const commentURL = `${baseUrl + ig_media_id}/comments`
        setTimeout(() => {
            const response = axios.post(commentURL, {
                access_token: config.accessToken,
                message: comment
            })
        }, 1000);
    }

    async publishFBFeed(fb_page, message) {
        const page_post_url = `${baseUrl + fb_page.id}/feed`
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
        const page_post_url = `${baseUrl + fb_page.id}/photos`
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

module.exports = FB;