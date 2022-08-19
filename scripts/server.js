// Based on https://github.com/andreikorchagin/regenerative-generation

const express = require('express')
const socket = require('socket.io')

const { FB } = require('./insta');
const { Twitter } = require('./twitter');
const { GCS } = require('./gcs');
const { AWSUtil } = require('./aws');
const {processImage, saveFile} = require('./image_utils')



const fb = new FB;
const twitter = new Twitter()
const gcs = new GCS()
const aws = new AWSUtil()

// Create express app and server.
let app = express();
app.get('/', (req, res) => {
    res.send('Hello World!')
})
// app.use(express.static('public'))
var server = app.listen(3000, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Media publishing app listening at http://' + host + ':' + port);
})

// Create web socket
var io = socket(server, {
    cors: {origin: ['http://localhost:8000', 'http://localhost:1313']},    // origin of request (hugo or local python server)
    maxHttpBufferSize: 1e8
});

io.sockets.on('connection', (connection) => {
    console.log(`new connection ${connection.id} from ${connection.handshake.headers.origin}`)
    
    connection.on('image', (data) => {
        console.log("received a message " + data)
        console.log("received a message " + data.data)
    })
    
    connection.on('imageCapture', async (data) => {
        
        console.log("received a message : imageCapture")
        console.log("Image size %d MB" , data.size / (1024*1024))
        console.log("Image type " , data.mimeType)
        console.log("Image Caption: ", data.caption)
        console.log("Sketch Name: ", data.sketch_name)
        
        let sketch = data.sketch_name || 'sketch' 
        const filename = `${sketch}_${Date.now()}.jpg`
        var filepath = saveFile(filename, data.imageData)
        
        filepath = await processImage(filepath)
        
        const tweet_id = await twitter.tweetImage(data.caption, filepath)
        
        const use_gcs = false;
        var media_url = ""
        if (use_gcs) {
            media_url = await gcs.uploadFileGCS(filepath, filename);
        } else {
            media_url = await aws.upload('nit-gen-bucket', filepath);
        }
        
        if(media_url) {
            const ig_creation_id = await fb.createIGMedia(fb.insta.ccStudio, media_url, data.caption);
            console.log("Media Created :: ", ig_creation_id)
            const publish_id = await fb.publishIGmedia(fb.insta.ccStudio, ig_creation_id);
            console.log("Media Published :: ", publish_id)
            
            const fb_post = await fb.publishFBPhoto(fb.pages.ccStudio, media_url);
            fb.postFBPostComment(fb.pages.ccStudio, fb_post.post_id, data.caption)  
        }
        
    })

    connection.on('videoCapture', async (data) => {
        console.log("Received a message : videoCapture")
        console.log("Video size %d MB" , data.size / (1024*1024))
        console.log("Video Caption: ", data.caption)
        console.log("Sketch Name: ", data.sketch_name)


        const filename = saveFile(`${data.sketch_name}.webm`, data.videoData)

        // process video

        // tweet

        // upload to cloud 
            // post to insta,
            // post to fb page

    })    
})

