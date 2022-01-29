// Based on https://github.com/andreikorchagin/regenerative-generation

const express = require('express')
const socket = require('socket.io')
const fs = require('fs');
const request = require('request');
const { FB, Twitter, GCS } = require('./social.js');

const fb = new FB;
const twitter = new Twitter()
const gcs = new GCS()

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
    
    const tweet_id = await twitter.tweetImage(data.caption, filepath)

    const gcsImagePath = await gcs.uploadFileGCS(filepath, filename);

    const ig_creation_id = await fb.createIGMedia(fb.insta.printsh, gcsImagePath, data.caption);
    const publish_response = await fb.publishIGmedia(fb.insta.printsh, ig_creation_id);
    console.log("Image publish response from to insta : ", publish_response.status);

    const fb_post = await fb.publishFBPhoto(fb.pages.ccStudio, gcsImagePath);
  })

  connection.on('repost', () => {
    const gcsImagePath = 'https://storage.googleapis.com/generative-art-1/PerlinNoise_1642871786851.jpg';
    // createIGMedia(config.instagram, gcsImagePath, "Test Media")
    fb.createIGMedia(fb.insta.printsh, gcsImagePath, "Test Media")
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
