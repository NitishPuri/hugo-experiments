module.exports =  {
    facebook : {
        pages : {
            ccStudio : "XXX"
        },
        insta : {
            printsh : "XXX"
        },
        accessToken : "XXX",
        userId : "XXX",
        appId: "XXX",
        appSecret: "XXX",        
    },
    twitter: {
        username: '<DEVELEOPER ACCOUNT USERNAME>',
        userid: '<DEVELOPER ACCOUNT USER ID>',
        bearerToken: "<BEARER TOKEN>",
        config : {
            appKey: '<APP CONSUMER KEY>',
            appSecret: '<APP CONSUMER KEY SECRET>>',
            // Following access tokens are to be associated with developer account itself, 
            // For other users you need to use the 3-legged workflow and request for suer access tokens
            accessToken: '<OAUTH USER TOKEN>',  
            accessSecret: '<OAUTH USER TOKEN SECRET>',
        },
        oauth2 : {
            clientId : "<OAUTH 2 CLIENT ID>",
            clientSecret: "<OAUTH 2 CLIENT SECRET>"
        }
    },
    gcs: {
        bucketName : ""        
    }
}
