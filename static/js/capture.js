
class Recorder_CC {
    constructor() {
        console.log("Recorder created.")
        this.ccapturer = new CCapture({ format: 'webm', frameRate: 30 })
    }
    start() {
        console.log("Recorder started.")
        this.ccapturer.start();
    }
    capture() {
        this.ccapturer.capture(document.getElementById('defaultCanvas0'))
    }
    stop() {
        this.ccapturer.stop();
        this.ccapturer.save();
    }
}

let mediaRecorder;
class Recorder_Web {
    
    socket_connected = false
    connect(success_callback) {
        if(this.socket_connected && this.socket.connected) {
            console.log("Recorder already connected.")
            success_callback()
        } else {
            this.connectWebSocket('http://localhost:3000', success_callback)
        }
    }
    
    connectWebSocket(server, success_callback) {    
        console.log("Connecting to " + server)
        const socket = io.connect(server, {
            reconnectionAttempts: 3
        })      
        this.socket = socket;
        socket.on("connect", () => {
            console.log("Connected to %s : socket id : %s", server, socket.id)
            this.socket_connected = true
            if(success_callback) {
                success_callback()
            }
        })
    }
    
    stream_created = false;
    createCanvasCaptureStream() {
        const canvas = document.getElementById('defaultCanvas0');
        var stream = canvas.captureStream(); // frames per second
        this.canvas_stream = stream
        console.log('Started stream capture from canvas element: ', stream);
        this.recordedBlobs = []
        this.stream_created = true
        this.recording = false
    }

    destroyCanvasCaptureStream() {
        this.recordedBlobs = []
        this.stream_created = false;
        this.canvas_stream = 'undefined'
        this.recording = false;
        console.log("Canvas stream destroyed.");
    }
    
    createAudioCaptureStream() {
        const audio_context = new window.AudioContext() // do i need to capture the same context here ??
        // Example :: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination
        const dest = audio_context.createMediaStreamDestination()
        this.audio_stream = dest.stream        
        // need to connect input audio to stream ????        
    }

    combineStreams() {
        https://stackoverflow.com/questions/52768330/combine-audio-and-video-streams-into-one-file-with-mediarecorder
        return new MediaStream([...this.canvas_stream.getTracks(), ...this.audio_stream.getTracks()])
    }
    
    start() {
        if(this.stream_created == false) {
            this.createCanvasCaptureStream()
            this.createAudioCaptureStream()
        }
        
        console.log("Recorder started.")
        let options = { mimeType: 'video/webm' };
        this.recordedBlobs = [];
        let combined_stream = this.combineStreams();
        try {
            mediaRecorder = new MediaRecorder(this.canvas_stream, options);
        } catch (e0) {
            console.log('Unable to create MediaRecorder with options Object: ', e0);
            try {
                options = { mimeType: 'video/webm,codecs=vp9' };
                mediaRecorder = new MediaRecorder(combined_stream, options);
            } catch (e1) {
                console.log('Unable to create MediaRecorder with options Object: ', e1);
                try {
                    options = 'video/vp8'; // Chrome 47
                    mediaRecorder = new MediaRecorder(combined_stream, options);
                } catch (e2) {
                    alert('MediaRecorder is not supported by this browser.\n\n' +
                    'Try Firefox 29 or later, or Chrome 47 or later, ' +
                    'with Enable experimental Web Platform features enabled from chrome://flags.');
                    console.error('Exception while creating MediaRecorder:', e2);
                    return false;
                }
            }
        }
        console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
        mediaRecorder.onstop = (event) => {
            console.log('Recorder stopped: ', event);
            // const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
        }
        mediaRecorder.ondataavailable = (event) => {
            if (event.data && event.data.size > 0) {
                this.recordedBlobs.push(event.data);
            }
        };
        mediaRecorder.start(100); // collect 100ms of data
        console.log('MediaRecorder started');
        this.recording = true
        return true;
    }
    
    stop(sketch_name, caption) {
        this.stopRecording()
        this.sendVideo(sketch_name, caption)
    }
    
    
    stopRecording() {
        mediaRecorder.stop();
        console.log('Recorded Blobs length: ', this.recordedBlobs.length);
    }
    
    sendVideo(sketch_name, caption) {
        if(this.socket.connected) {
            const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})
            console.log("Sending captured video.")
            this.socket.emit('videoCapture', {
                videoData: blob,
                size: blob.size,
                caption: caption,
                sketch_name: sketch_name,
            })
        } else {
            this.downloadVideo(sketch_name)
        }
    }
    
    downloadVideo(sketch_name) {
        const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${sketch_name}.webm`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    }
    
    
    
    captureImage(sketch_name, caption, canvas_id = 'defaultCanvas0') {
        console.log("Capturing Canvas.")
        
        if(this.socket.connected) {
            const canvas = document.getElementById(canvas_id);
            canvas.toBlob((blob) => {
                console.log("Sending image.")
                let data = {
                    imageData: blob,
                    size: blob.size,
                    mimeType: "image/jpeg",
                    caption: caption,
                    sketch_name: sketch_name
                };
                console.log("Sending message with blob of size, %s MB", blob.size / (1024 * 1024))
                this.socket.emit('imageCapture', data)
            }, 'image/jpeg')  
        } else {
            console.log("Socket not connected, downloading image locally.")
            this.downloadImage(sketch_name + ".jpeg")
        }
    }
    
    downloadImage(filename) {
        console.log("Capturing Canvas.")
        const canvas = document.getElementById('defaultCanvas0');
        var link = document.createElement('a')
        link.download = filename
        link.href = canvas.toDataURL('image/jpeg')
        link.click()
    }
}


