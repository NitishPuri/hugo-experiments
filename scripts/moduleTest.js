const { FB } = require('./social')
const { GCS } = require('./google')
const { Twitter } = require('./twitter')

// Twitter Tests
// var twitter = new Twitter2();
// twitter.lookupUser('NitPuri')
// twitter.currentUser();

// var twitter = new Twitter();
// twitter.currentUser();

// GCS Tests
// const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
// var gcs = new GCS();
// gcs.uploadFileGCS('temp/PerlinNoise_1658084856962.jpg', 'PerlinNoise_1658084856962.jpg')


var fb = new FB();
fb.getAccounts();
// fb.getInstagramId(fb.pages.printsh)
// fb.getInstagramId(fb.pages.lifeonearth)
// fb.getFBUser();
// fb.getNode(fb.pages.ccStudio);
// fb.getNode(fb.pages.lifeonearth);
fb.getNode(fb.insta.printsh);
// fb.getNode(fb.insta.sketches);

// fb.createIGMedia(fb.insta.printsh, gcsImagePath, "Test Media")


// const creation_id = '17957805349605598';
// fb.publishIGmedia(fb.insta.printsh, creation_id)
// fb.publishFBFeed(fb.pages.ccStudio, "Post from a bot!!")
// fb.publishFBPhoto(fb.pages.ccStudio, gcsImagePath);
// fb.listIGMedia(fb.insta.printsh)
// .then((ig_media_list) => {

// })
// fb.describeIGMedia('17930841283891055')
// fb.commentOnIGMedia('17930841283891055', "Test comment on media. #instaapi")
// fb.getPermissions()

