let express = require('express')
let socket = require('socket.io')
let fs = require('fs')

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
    cors: {origin: '*'},
    maxHttpBufferSize: 1e8
});

// Twitter Support
const { TwitterApi } = require('twitter-api-v2');
var twitter_config = require('./config.js')
const twitterClient = new TwitterApi(twitter_config)

io.sockets.on('connection', (s) => {
  console.log('new connection ' + s.id)

  s.on('image', (data) => {
    console.log("received a message " + data)
    console.log("received a message " + data.data)
  })

  s.on('imageCapture', (data) => {

    console.log("received a message " + data)
    console.log("Image size %d MB" , data.size / (1024*1024))
    console.log("Image type " , data.mimeType)
    console.log("Image Caption: ", data.caption)

    fs.mkdirSync('temp')
    var filename = 'temp/image.jpeg'+ Date.now()
    fs.writeFileSync(filename, data.data, 'base64')    

    const mediaIds = await Promise.all([
      twitterClient.v1.uploadMedia('./' + filename)
    ])

    await twitterClient.v1.tweet(data.caption, { media_ids: mediaIds })
  })
})






