
function test_twitter() {
    const { Twitter } = require('./twitter')
    // var twitter = new Twitter2();
    // twitter.lookupUser('NitPuri')
    // twitter.currentUser();
    
    var twitter = new Twitter();
    twitter.currentUser();

    // twitter.tweetMedia("Test Video", "temp/test1_procesed.mp4")
}

function test_gcs() {
    const { GCS } = require('./gcs')
    // const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
    var gcs = new GCS();
    gcs.uploadFileGCS('temp/PerlinNoise_1658084856962.jpg', 'PerlinNoise_1658084856962.jpg')
}

async function test_insta() {
    const { FB } = require('./insta')    
    
    var fb = new FB();
    // fb.getAccounts();
    // fb.getInstagramId(fb.pages.printsh)
    
    // fb.getFBUser();
    // fb.getNode(fb.pages.ccStudio);
    // fb.getNode(fb.insta.ccStudio)
    
    var image_url = "https://nit-gen-bucket.s3.amazonaws.com/PerlinNoise_1658084856962.jpg";
    // const creation_id = await fb.createIGImageMedia(fb.insta.ccStudio, image_url, "Test Media")    
    // console.log("Media Created :: ", creation_id)
    // const media_id = await fb.publishIGmedia(fb.insta.ccStudio, creation_id)
    // console.log("Media Published :: ", media_id)
    // fb.commentOnIGMedia(media_id, "Test Media #test_media")
    
    
    // fb.publishFBFeed(fb.pages.ccStudio, "Post from a bot!!")
    // fb.publishFBPhoto(fb.pages.ccStudio, image_url);
    
    // fb.postFBPostComment(fb.pages.ccStudio, '100872602511840', "Test Comment")
    
    // fb.getPermissions()    


    var video_url = "https://nit-gen-bucket.s3.amazonaws.com/test1_procesed.mp4"
    // const creation_id = await fb.createIGVideoMedia(fb.insta.ccStudio, video_url, "Test Media")    
    // console.log("Media Created :: ", creation_id)

    const creation_id = '18030713506381456'

    // fb.verifyIGVideoContainer(creation_id)

    // const media_id = await fb.publishIGmedia(fb.insta.ccStudio, creation_id)
    // console.log("Media Published :: ", media_id)
    // fb.commentOnIGMedia(media_id, "Test Media #test_media")

    // const fb_post = await fb.publishFBVideo(fb.pages.ccStudio, video_url);
    // fb.postFBPostComment(fb.pages.ccStudio, '1475009299592234', 'Test Video')              
}


async function test_aws() {
    const { AWSUtil } = require('./aws')
    var aws = new AWSUtil();
    var buckets = await aws.listBuckets();
    var bucketName = buckets[0].Name
    
    aws.getBucketACL(bucketName)
    aws.listObjects(bucketName)
    
    var filename = 'temp/test1_procesed.mp4'
    aws.upload(bucketName, filename);    
}

async function test_image() {
    const processImage = require('./utils').processImage
    const new_filepath = await processImage("temp/One Dimensional Cellular Automata_1660841112440.jpg");
    console.log("Returned path :: ", new_filepath)
}


async function test_video() {
    const processVideo = require('./utils').processVideo
    const new_filepath = await processVideo("temp/Sound_painter_procesed.mp4")
    console.log(new_filepath)
}

async function uploadVideo(filepath, caption) {

    const { Twitter } = require('./twitter')
    const { FB } = require('./insta')
    const { AWSUtil } = require('./aws')
    const { delay } = require('./utils')

    const fb = new FB;
    // const twitter = new Twitter()    
    // const aws = new AWSUtil()

    // // tweet
    // const tweet_id = await twitter.tweetMedia(caption, filepath)
    
    // // upload to cloud 
    // const use_gcs = false;
    // var media_url = ""
    // if (use_gcs) {
    //     media_url = await gcs.uploadFileGCS(filepath, filename);
    // } else {
    //     media_url = await aws.upload('nit-gen-bucket', filepath);
    // }

    var media_url = "https://nit-gen-bucket.s3.amazonaws.com/Sound_painter_procesed.mp4"
    
    if(media_url) {
        const ig_creation_id = await fb.createIGVideoMedia(fb.insta.ccStudio, media_url, caption);
        console.log("Media Created :: ", ig_creation_id)
        
        // Wait till upload finishes.
        let upload_success = false
        while(true) {
            const upload_status = await fb.verifyIGVideoContainer(ig_creation_id)
            if(upload_status.status_code == 'FINISHED ') {
                console.log("Upload finished :: ", ig_creation_id)
                upload_success = true;
                break;
            }
            if(upload_status.status_code == 'ERROR') {
                console.log("Upload error :: ", ig_creation_id)
                console.log(upload_status.status)
                upload_success = false;
                break;
            }
            await delay(1000)
        }
        
        // post to insta,
        if(upload_success) {
            const publish_id = await fb.publishIGmedia(fb.insta.ccStudio, ig_creation_id);
            console.log("Media Published :: ", publish_id)    
        }
        
        // post to fb page
        const fb_post = await fb.publishFBVideo(fb.pages.ccStudio, media_url);
        fb.postFBPostComment(fb.pages.ccStudio, fb_post, caption)              
    }
    
}


async function test_upload() {

    const caption = "Sound painter\n https://nitishpuri.gitlab.io/hugo-experiments/experiments/sound_painter/"
    uploadVideo("temp\\Sound_painter_procesed.mp4", caption)
}

// test_upload()




// test_twitter()
// test_insta()
// test_image()
// test_aws()
test_video()






