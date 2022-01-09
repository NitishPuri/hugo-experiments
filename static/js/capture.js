
class Recorder {        
    constructor() {
        console.log("Recorder created.")
        this.ccapturer = new CCapture({format: 'webm', frameRate: 30})
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


function handleSourceOpen(event) {
    console.log('MediaSource opened');
    sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
    console.log('Source buffer: ', sourceBuffer);
}

function handleStop(event) {
    console.log('Recorder stopped: ', event);
    const superBuffer = new Blob(recordedBlobs, {type: 'video/webm'});
    // video.src = window.URL.createObjectURL(superBuffer);
}

function handleDataAvailable(event) {
    if (event.data && event.data.size > 0) {
      recordedBlobs.push(event.data);
    }
}
  

const mediaSource = new MediaSource();
mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
let mediaRecorder;
let recordedBlobs;
let sourceBuffer;

function stopRecording() {
    mediaRecorder.stop();
    console.log('Recorded Blobs: ', recordedBlobs);
    // video.controls = true;
  }

  function download() {
    const blob = new Blob(recordedBlobs, {type: 'video/webm'});
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


class Recorder2 {        
    constructor() {
        // console.log("Recorder created.")
        // this.ccapturer = new CCapture({format: 'webm', frameRate: 30})
        const canvas = document.getElementById('defaultCanvas0');
        var stream = canvas.captureStream(); // frames per second
        this.stream = stream
        console.log('Started stream capture from canvas element: ', stream);
    }
    start() {                
        // console.log("Recorder started.")
        // this.ccapturer.start();

        let options = {mimeType: 'video/webm'};
        recordedBlobs = [];
        try {
          mediaRecorder = new MediaRecorder(this.stream, options);
        } catch (e0) {
          console.log('Unable to create MediaRecorder with options Object: ', e0);
          try {
            options = {mimeType: 'video/webm,codecs=vp9'};
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
        mediaRecorder.onstop = handleStop;
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start(100); // collect 100ms of data
        console.log('MediaRecorder started', mediaRecorder);

    }
    capture() {
        // this.ccapturer.capture(document.getElementById('defaultCanvas0'))
    }
    stop() {
        // this.ccapturer.stop();
        // this.ccapturer.save();
        stopRecording()
        download()
    }
}


  