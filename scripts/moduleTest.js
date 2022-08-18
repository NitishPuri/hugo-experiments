
function test_twitter() {
    const { Twitter } = require('./twitter')
    // var twitter = new Twitter2();
    // twitter.lookupUser('NitPuri')
    // twitter.currentUser();
    
    var twitter = new Twitter();
    twitter.currentUser();
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
    // const creation_id = await fb.createIGMedia(fb.insta.ccStudio, image_url, "Test Media")    
    // console.log("Media Created :: ", creation_id)
    // const media_id = await fb.publishIGmedia(fb.insta.ccStudio, creation_id)
    // console.log("Media Published :: ", media_id)
    // fb.commentOnIGMedia(media_id, "Test Media #test_media")
    
    
    // fb.publishFBFeed(fb.pages.ccStudio, "Post from a bot!!")
    fb.publishFBPhoto(fb.pages.ccStudio, image_url);

    // fb.getPermissions()    
}
// test_insta()


async function test_aws() {
    const { AWSUtil } = require('./aws')
    var aws = new AWSUtil();
    var buckets = await aws.listBuckets();
    var bucketName = buckets[0].Name
    
    aws.getBucketACL(bucketName)
    aws.listObjects(bucketName)
    
    // var filename = 'temp/PerlinNoise_1658084856962.jpg'
    // aws.upload(bucketName, filename);
    
    
}
// test_aws()

async function test_image() {
    const processImage = require('./image_utils').processImage
    const new_filepath = await processImage("temp/One Dimensional Cellular Automata_1660841112440.jpg");
    console.log("Returned path :: ", new_filepath)
}

test_image()






