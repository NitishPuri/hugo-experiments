const fs = require('fs');
const sharp =  require('sharp');

function saveImage(filename, imageData) {
    let tempdir = 'temp'
    if(!fs.existsSync(tempdir)) {
        console.log("Creating temp dir.")
        fs.mkdirSync(tempdir)
    }
    filename = filename.replaceAll(" ", "_")
    var filepath = `${tempdir}/${filename}`
    fs.writeFileSync(filepath, imageData, 'base64')
    console.log(`File saved as : ${filepath}`)
    return filepath;
}

async function processImage(filepath) {
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


module.exports = {saveImage, processImage}