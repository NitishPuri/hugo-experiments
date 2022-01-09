
class Recorder {        
    constructor() {
        this.ccapturer = new CCapture({format: 'webm', frameRate: 30})
    }
    start() {                
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


  