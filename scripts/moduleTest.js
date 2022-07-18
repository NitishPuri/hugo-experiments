const { FB, Twitter2, Twitter } = require('./social')
// const TestClass = require('./testModule')

// var fb = new FB();

// fb.getAccounts();
// fb.getFBUser();
// fb.getNode(fb.pages.ccStudioId);
// fb.getNode(fb.pages.sketchesId);
// fb.getNode(fb.insta.printsh);
// fb.getNode(fb.insta.sketches);

const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
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

// var twitter = new Twitter2();
// twitter.lookupUser('NitPuri')
// twitter.currentUser();

var twitter = new Twitter();
twitter.currentUser();