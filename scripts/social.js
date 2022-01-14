console.log("This is node.")

const request = require('request');

// upload file to GCS for public download
async function uploadFile(bucketName, filePath, destFileName) {
    await storage.bucket(bucketName).upload(filePath, {
        destination: destFileName,
    });
    logger.info({ message: `${filePath} uploaded to ${bucketName}` });
}

// create media container
function createIGMedia(config, imageURL, caption) {
    const containerCreationURL =
        'https://graph.facebook.com/' + config.ig_user_id + '/media?';
    request.post(
        {
            url: containerCreationURL,
            form: {
                image_url: imageURL,
                access_token: config.access_token,
                caption: caption,
            }, ff
        },
        function (error, response, body) {
            const bodyObj = JSON.parse(body);
            const mediaContainerID = bodyObj.id;
            logger.info({
                message: 'IG Media Container ID',
                id: mediaContainerID,
            });
            if (bodyObj.error == 'undefined') {
                logger.error(bodyObj.error);
            }
            if (mediaContainerID != null) {
                publishMediaContainer(mediaContainerID, config);
            }
        },
    );
}

// publish media container
function publishMediaContainer(mediaContainerID, config) {
    const containerPublishURL =
        'https://graph.facebook.com/' + config.ig_user_id + '/media_publish?';
    request.post(
        {
            url: containerPublishURL,
            form: {
                creation_id: mediaContainerID,
                access_token: config.access_token,
            },
        },
        function (error, response, body) {
            const bodyObj = JSON.parse(body);
            const igMediaID = bodyObj.id;
            logger.info({ message: 'IG Media ID', id: igMediaID });
            if (bodyObj.error == 'undefined') {
                logger.error(bodyObj.error);
            }
            commentOnMedia(config, igMediaID);
        },
    );
}

function createCaption(canvasName, config) {
    // You can't store template literals in a JSON config, so had to split
    // the caption string as follows to introduce a dynamic value.
    const caption = config.caption.start + canvasName + config.caption.end;
    return caption;
}

function commentOnMedia(config, igMediaID) {
    const commentMediaURL =
        'https://graph.facebook.com/' + igMediaID + '/comments?';
    setTimeout(() => {
        request.post(
            {
                url: commentMediaURL,
                form: {
                    message: config.hashtags,
                    access_token: config.access_token,
                },
            },
            function (error, response, body) {
                const bodyObj = JSON.parse(body);
                logger.info({ message: 'IG Comment ID', id: bodyObj.id });
                if (bodyObj.error == 'undefined') {
                    logger.error(bodyObj.error);
                }
            },
        );
    }, 1000);
}

async function createTweet(config, canvasName, filePath) {
    const twitterClient = new TwitterApi({
        appKey: config.twitter_credentials.app_key,
        appSecret: config.twitter_credentials.app_secret,
        accessToken: config.twitter_credentials.access_token,
        accessSecret: config.twitter_credentials.access_secret,
    });
    mediaID = await twitterClient.v1.uploadMedia(filePath);
    twitterCaption =
        config.twitter_credentials.caption.start +
        canvasName +
        config.twitter_credentials.caption.end;
    logger.info({ message: 'Twitter Media ID', id: mediaID });
    tweetID = await twitterClient.v1.tweet(twitterCaption, {
        media_ids: mediaID,
    });
    logger.info({ message: 'Tweet ID', id: tweetID });
}