
* Socket.io server listens at 3000
* Allowed origins
    * http://localhost:8000 --> Hugo default
    * http://localhost:1313 --> python simple http server default
* Socket events
    * 'image' : debug
    * 'imageCapture' 
    ```json
        {
            "size" : "size in bytes",
            "mimeType" : "image type , png, jpg, ...",
            "caption" : "caption",
            "sketch" : "Sketch name",
            "imageData" : "bytestream of image data",            
        }
    ```
    * 'repost'  : testing



