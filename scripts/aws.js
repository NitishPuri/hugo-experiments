
var AWS = require('aws-sdk');

// Set the region 
// AWS.config.update({region: 'REGION'});

function callback(fn) {
    return function(err, data) {
        if(err) {
            console.log("Error ", err)
        } else {
            console.log("Success ");
            fn(data)
        }
    }
}

class AWSUtil {
    // https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascript/example_code
    // Create S3 service object  231536
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    
    async listBuckets() {
        // Call S3 to list the buckets
        try {
            const results = await this.s3.listBuckets().promise();        
            console.log("Success " , results.Buckets)
            return results.Buckets;
        } catch(err) {
            console.error("Error ", err)
        }
    }
    
    async upload(bucketName, filename) {
        var uploadParams = { Bucket: bucketName,  Key: '', Body: ''}
        
        var fs = require('fs')
        
        var fileStream = fs.createReadStream(filename)
        fileStream.on('error', function(err) { console.log('File Error: ', err)})
        uploadParams.Body = fileStream;
        
        var path = require('path');
        uploadParams.Key = path.basename(filename);

        try{
            const data = await this.s3.upload(uploadParams).promise()            
            console.log("Success ", data.Location);
            return data.Location;
        } catch(err) {
            console.error("Error ", err)
        }        
    }
    
    async listObjects(bucketName) {
        this.s3.listObjectsV2({Bucket: bucketName} , callback((data) => { console.log(data.Contents) }))
    }
    
    async getBucketACL(bucketName) {
        var bucketParams = { Bucket: bucketName }        
        this.s3.getBucketAcl(bucketParams, callback((data) => console.log(data.Grants)))
    }
    
}

module.exports = {AWSUtil}



