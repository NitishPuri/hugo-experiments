const fs = require('fs');
const sharp =  require('sharp');

function delay(number) { 
    return new Promise(resolve => setTimeout(resolve, number) ) 
}

function saveFile(filename, base64data) {
    let tempdir = 'temp'
    if(!fs.existsSync(tempdir)) {
        console.log("Creating temp dir.")
        fs.mkdirSync(tempdir)
    }
    var filepath = `${tempdir}/${filename}`
    fs.writeFileSync(filepath, base64data, 'base64')
    console.log(`File saved as : ${filepath}`)
    return filepath;
}

async function processImage(filepath) {
    // https://developers.facebook.com/docs/instagram-api/reference/ig-user/media#image-specifications
    // Check image dimensions (< 1440p)
    // Check image aspect (0.8 < 1.9)

    const MAX_WIDTH = 1440
    const MAX_ASPECT = 1.9
    const MIN_ASPECT = 0.8    
    
    try {
        const metadata = await sharp(filepath).metadata();
        var aspectRatio = metadata.width/metadata.height
        var width = metadata.width
        var height = metadata.height

        // Checks for aspect ratio
        if(aspectRatio > MAX_ASPECT) {
            width = Math.floor(metadata.height * MAX_ASPECT)
        } else if(aspectRatio < MIN_ASPECT) {
            height = Math.floor(width / MIN_ASPECT)
        }

        // Check for max width
        if(width > MAX_WIDTH) {
            height = Math.floor(MAX_WIDTH * (height/width))
            width = MAX_WIDTH
        }

        if( width == metadata.width && height == metadata.height) {
            return filepath;
        }

        console.log(`Crop image to :: ${width} x ${height}`)

        const path = require('path');
        const extname = path.extname(filepath);
        // const new_filename = path.basename(filepath, extname) + "_resized" + extname;    
        // console.log(path.join(path.dirname(filepath), new_filename))
        const new_filename = filepath.replace(extname, `_resized${extname}`)
        console.log(`Saving to ${new_filename}`)

        await sharp(filepath).resize({
            width: width, height: height,
        }).toFile(new_filename)

        return new_filename
        
    } catch(error) {
        console.log("Error , ", error)
    }
}

async function processVideo (filepath) {
    // https://developers.facebook.com/docs/instagram-api/reference/ig-user/media#video-specifications
    const CONTAINER = "mp4"
    const VIDEO_CODEC = "h264"
    
    const MAX_ASPECT = 16/9 // 1.777
    const MIN_ASPECT = 4/5;  // 0.8
    const MAX_DURATION = 60;    // 60s
    const MIN_DURATION = 3;    // 3s
    const MAX_WIDTH = 1920;
    const FPS = 55;

    const REELS_ASPECT = 9/16 // 0.56
    const REELS_MAX_DURATION = 15*60  // 15m

    const MAX_VIDEO_BITRATE = 5000  // 5000 kbps

    // https://github.com/fluent-ffmpeg/node-fluent-ffmpeg#readme
    const ffmpeg = require('fluent-ffmpeg')

    // ffmpeg.ffprobe(filepath, (err, data) => {
    //     if(err) {
    //         console.error(`Error : ${err}`)
    //     }
    //     console.log(data);
    // })

    // console.log("Probe complete...")

    const path = require('path');
    const extname = path.extname(filepath);
    const new_filename = filepath.replace(extname, `_procesed.mp4`)
    console.log(`Saving to ${new_filename}`)


    const ffmpeg_promise = () => {
        return new Promise((resolve, reject) => {
            ffmpeg(filepath)
            // .on('progress', (info) => console.log(`progress: ${JSON.stringify(info)}%`))
            .on('error', (err) => {
                console.error(`error: ${err}`)
                return reject(new Error(err))
            })
            .on('end', resolve)
            .videoBitrate(MAX_VIDEO_BITRATE)
            .fps(FPS)
            .size('1920x?').aspect(MAX_ASPECT)
            .autoPad()
            .save(new_filename)    
        })
    }

    await ffmpeg_promise();

    console.log("Processing complete...")

    return new_filename;

    // ffmpeg(filepath)
    //     // .on('progress', (info) => console.log(`progress: ${JSON.stringify(info)}%`))
    //     .on('error', (err) => console.error(`error: ${err}`))
    //     .videoBitrate(MAX_VIDEO_BITRATE)
    //     .fps(FPS)
    //     .size('1920x?').aspect(MAX_ASPECT)
    //     .autoPad()
    //     .save('temp/target2.mp4')


    // ffmpeg(filepath)
    //     // .on('progress', (info) => console.log(`progress: ${JSON.stringify(info)}%`))
    //     .on('error', (err) => console.error(`error: ${err}`))
    //     .videoBitrate(MAX_VIDEO_BITRATE)
    //     .fps(FPS)
    //     .size('1920x?').aspect(REELS_ASPECT)
    //     .autoPad()
    //     .save('temp/target3.mp4')

}

module.exports = {saveFile, processImage, processVideo, delay}