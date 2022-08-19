
* Socket.io server listens at 3000
* Allowed origins
    * http://localhost:8000 --> Hugo default
    * http://localhost:1313 --> python simple http server default
* Socket events
    * 'image' : debug
    * 'imageCapture' 
    ```json
        {
            "size" : "size in bytes",
            "mimeType" : "image type , png, jpg, ...",
            "caption" : "caption",
            "sketch" : "Sketch name",
            "imageData" : "bytestream of image data",            
        }
    ```
    * 'repost'  : testing



### Config
Expected in a file in `keys/config.js`
```JSON
module.exports =  {
    facebook : {
        pages : {
            ccStudio : {
                id: "XXX",
                token: "XXX"
            },
        },
        insta : {
            ccStudio : "XXX",
            printsh : "XXX",
            lifeonearth: "XXX"
        },
        accessToken : "XXX",
        userId : "XXX",
        appId: "XXX",
        appSecret: "XXX",
        appDisplayName: "XXX"             
    },
    twitter: {
        username: "<DEVELEOPER ACCOUNT USERNAME>",
        userid: "<DEVELOPER ACCOUNT USER ID>",
        bearerToken: "<BEARER TOKEN>",
        config : {
            appKey: "<APP CONSUMER KEY>",
            appSecret: "<APP CONSUMER KEY SECRET>>",
            // Following access tokens are to be associated with developer account itself, 
            // For other users you need to use the 3-legged workflow and request for suer access tokens
            accessToken: "<OAUTH USER TOKEN>",  
            accessSecret: "<OAUTH USER TOKEN SECRET>",
        },
        oauth2 : {
            clientId : "<OAUTH 2 CLIENT ID>",
            clientSecret: "<OAUTH 2 CLIENT SECRET>"
        }
    },
    gcs: {
        bucketName : "",
        keyfilename: "XXX.json"                
    }
}
```



