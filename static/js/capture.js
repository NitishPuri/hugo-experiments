
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
  connect() {
    const canvas = document.getElementById('defaultCanvas0');
    var stream = canvas.captureStream(); // frames per second
    this.stream = stream
    console.log('Started stream capture from canvas element: ', stream);
    this.recordedBlobs = []

    this.connectWebSocket()
  }

  start() {
    console.log("Recorder started.")
    let options = { mimeType: 'video/webm' };
    this.recordedBlobs = [];
    try {
      mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (e0) {
      console.log('Unable to create MediaRecorder with options Object: ', e0);
      try {
        options = { mimeType: 'video/webm,codecs=vp9' };
        mediaRecorder = new MediaRecorder(stream, options);
      } catch (e1) {
        console.log('Unable to create MediaRecorder with options Object: ', e1);
        try {
          options = 'video/vp8'; // Chrome 47
          mediaRecorder = new MediaRecorder(stream, options);
        } catch (e2) {
          alert('MediaRecorder is not supported by this browser.\n\n' +
            'Try Firefox 29 or later, or Chrome 47 or later, ' +
            'with Enable experimental Web Platform features enabled from chrome://flags.');
          console.error('Exception while creating MediaRecorder:', e2);
          return;
        }
      }
    }
    console.log('Created MediaRecorder', mediaRecorder, 'with options', options);
    // recordButton.textContent = 'Stop Recording';
    // playButton.disabled = true;
    // downloadButton.disabled = true;
    mediaRecorder.onstop = (event) => {
      console.log('Recorder stopped: ', event);
      const superBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' });
    }
    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        this.recordedBlobs.push(event.data);
      }
    };
    mediaRecorder.start(100); // collect 100ms of data
    console.log('MediaRecorder started', mediaRecorder);

  }
  stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', this.recordedBlobs);
    // video.controls = true;
  }

  download() {
    const blob = new Blob(this.recordedBlobs, { type: 'video/webm' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.webm';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 100);
  }

  stop() {
    this.stopRecording()
    this.download()
  }

  connectWebSocket() {
    var server = 'http://localhost:3000'
    console.log("Connecting to " + server)
    const socket = io.connect(server)
    console.log('Now connected');
    this.socket = socket;
  }

  capture() {
    console.log("Capturing Canvas.")
    const canvas = document.getElementById('defaultCanvas0');
    canvas.toBlob((blob) => {
      console.log("Sending image.")
      let data = {
        imageData: blob,
        size: blob.size,
        mimeType: "image/jpeg",
        caption: "Perlin noise flow field.",
        sketch: "PerlinNoise"
      };
      console.log("Sending message with blob of size, %s MB", blob.size / (1024 * 1024))
      this.socket.emit('imageCapture', data)
    }, 'image/jpeg')
  }

  repost() {
    console.log("Post to IG")
    this.socket.emit('repost')
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


