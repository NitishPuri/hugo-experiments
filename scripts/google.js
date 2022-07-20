const { Storage } = require('@google-cloud/storage');
const config = require('./config.js');

class GCS {
    gcstorage = new Storage({keyFilename: config.gcs.keyfilename})
    gcsPrefix = 'https://storage.googleapis.com/'

    async uploadFileGCS(filepath, destFileName) {
        let res = await this.gcstorage.bucket(config.gcs.bucketName).upload(filepath, {
          destination: destFileName, 
        });
      
        //TODO: How to check if upload was successfull??        
        console.log(`${filepath} uploaded to ${config.gcs.bucketName}`);
        const gcsImagePath = this.gcsPrefix + config.gcs.bucketName + '/' + destFileName;
        return gcsImagePath;
      }
      
}

module.exports = {GCS};
