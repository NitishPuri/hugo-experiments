// Based on https://github.com/andreikorchagin/regenerative-generation

const express = require('express')
const socket = require('socket.io')
const fs = require('fs');
const {Storage} = require('@google-cloud/storage');
const { TwitterApi } = require('twitter-api-v2');
const request = require('request');
const FB = require('./insta.js');

const config = require('./config.js');
const fb = new FB;

// Create express app and server.
let app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// app.use(express.static('public'))
var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://' + host + ':' + port);
})

// Create web socket
var io = socket(server, {
    cors: {origin: 'http://localhost:1313'},
    maxHttpBufferSize: 1e8
});

io.sockets.on('connection', (connection) => {
  console.log('new connection ' + connection.id)

  connection.on('image', (data) => {
    console.log("received a message " + data)
    console.log("received a message " + data.data)
  })

  connection.on('imageCapture', async (data) => {

    console.log("received a message " + data)
    console.log("Image size %d MB" , data.size / (1024*1024))
    console.log("Image type " , data.mimeType)
    console.log("Image Caption: ", data.caption)
    console.log("Image Caption: ", data.sketch)

    let sketch = data.sketch || 'sketch' 
    const filename = `${sketch}_${Date.now()}.jpg`
    const filepath = saveImage(filename, data.imageData)
    
    const tweet_id = await tweetImage(data.caption, filepath)

    const gcsImagePath = await uploadFileGCS(config.gcs.bucketName, filepath, filename);

    const ig_creation_id = await fb.createIGMedia(fb.insta.printsh, gcsImagePath, data.caption);
    const publish_response = await fb.publishIGmedia(fb.insta.printsh, ig_creation_id);
    console.log("Image publish response from to insta : ", publish_response.status);
  })

  connection.on('repost', () => {
    const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
    // createIGMedia(config.instagram, gcsImagePath, "Test Media")
    fb.createIGMedia(config.facebook.insta.printsh, gcsImagePath, "Test Media")
  })
})

function saveImage(filename, imageData) {
  let tempdir = 'temp'
  try {
    fs.mkdirSync(tempdir)
  } catch (error) {
    console.log(`directory ${tempdir} already exists`)
  }
  var filepath = `${tempdir}/${filename}`
  fs.writeFileSync(filepath, imageData, 'base64')
  console.log(`File saved as : ${filepath}`)
  return filepath;
}

// Twitter Support
const twitterClient = new TwitterApi(config.twitterConfig)
async function tweetImage(caption, filename) {
  const mediaIds = await Promise.all([
    twitterClient.v1.uploadMedia('./' + filename)
  ])
  console.log("Twitter media uploaded : ", mediaIds)
  const tweet_response = await twitterClient.v1.tweet(caption, { media_ids: mediaIds })
  console.log(`Tweet posted on ${tweet_response.created_at} with id {${tweet_response.id}}: `)
  return tweet_response.id;
}

// Google Cloud Storage
// let storage = new Storage({keyFilename: 'starry-folder-225114-3baffa34f0d9.json'});
let gcstorage = new Storage({keyFilename: 'scripts/starry-folder-225114-3baffa34f0d9.json'});
async function uploadFileGCS(bucketName, filepath, destFileName) {
  let res = await gcstorage.bucket(bucketName).upload(filepath, {
    destination: destFileName, 
  });

  //TODO: How to check if upload was successfull??

  console.log(`${filepath} uploaded to ${bucketName}`);
  const gcsPrefix = 'https://storage.googleapis.com/';
  const gcsImagePath = gcsPrefix + config.gcs.bucketName + '/' + destFileName;
  return gcsImagePath;
}




