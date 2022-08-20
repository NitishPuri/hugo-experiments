// Based on https://github.com/andreikorchagin/regenerative-generation

const express = require('express')
const socket = require('socket.io')

const { FB } = require('./insta');
const { Twitter } = require('./twitter');
const { GCS } = require('./gcs');
const { AWSUtil } = require('./aws');
const {processImage, saveFile, processVideo, delay} = require('./utils');


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
        
        const tweet_id = await twitter.tweetMedia(data.caption, filepath)
        
        const use_gcs = false;
        var media_url = ""
        if (use_gcs) {
            media_url = await gcs.uploadFileGCS(filepath, filename);
        } else {
            media_url = await aws.upload('nit-gen-bucket', filepath);
        }
        
        if(media_url) {
            const ig_creation_id = await fb.createIGImageMedia(fb.insta.ccStudio, media_url, data.caption);
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

        // process video
        var filename = saveFile(`${data.sketch_name}.webm`, data.videoData)
        filepath = await processVideo(filepath)

        // tweet
        const tweet_id = await twitter.tweetMedia(data.caption, filepath)

        // upload to cloud 
        const use_gcs = false;
        var media_url = ""
        if (use_gcs) {
            media_url = await gcs.uploadFileGCS(filepath, filename);
        } else {
            media_url = await aws.upload('nit-gen-bucket', filepath);
        }

        if(media_url) {
            const ig_creation_id = await fb.createIGVideoMedia(fb.insta.ccStudio, media_url, data.caption);
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
            fb.postFBPostComment(fb.pages.ccStudio, fb_post, data.caption)              
        }

    })    
})

