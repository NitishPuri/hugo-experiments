const axios = require('axios').default;
var config = require('./config.js').facebook;

var baseUrl = 'https://graph.facebook.com/v12.0/';
class FB {    
    pages = config.page;
    insta = config.insta;

    async get(endpoint, params) {
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
            return response;
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

// const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
// createIGMedia(config.facebook, gcsImagePath, "Test Media")
// getUser(config.facebook, config.facebook.userId)
// getUser(config.facebook, 'me')
// getUser(config.facebook, 'me/permissions')
// getUser(config.facebook, 'me/permissions')
// getUser(config.facebook, `${config.facebook.userId}/accounts`)
// var rsponse1 = getUser(config.facebook, `${config.facebook.insta.printsh}`, 'id,name,biography,username')
// var response2 = getUser(config.facebook, `${config.facebook.userId}`)
// getIGUser(config.facebook, `${config.facebook.userId}`)
// getIGUser(config.facebook, config.facebook.userId)
// getIGUser(config.facebook, config.facebook.page.ccStudioId)

module.exports = FB;