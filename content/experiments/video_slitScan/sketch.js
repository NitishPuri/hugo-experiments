
var video;

var vScale;

var params = {
  alpha: 127,
  lerp: 0.0
}

var offset;

var counter = 0;

function setup() {
  // createCanvasCustom()
  // createCanvas(640, 480);
  createCanvas(800, 240);
  // createCanvas(320, 240);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(320, 240)
  // video.size(64, 48)
  // video.size(32, 24)
  // video.hide()

  vScale = height / video.height
  offset = {
    // x : video.width*vScale ,
    x: (width - video.width * vScale) / 2,
    y: 0
  }

  // var gui = new dat.GUI();
  // gui.add(params, 'alpha').min(0).max(255)
  // gui.add(params, 'lerp').min(0).max(1).step(0.1)
  // gui.add(params, 'bgColor').min(0).max(255)

  // rectMode(CENTER)
}

function draw() {
  // background(51)
  const vw = video.width
  const vh = video.height

  copy(video, vw / 2, 0, 1, vh, counter, 0, 1, vh)
  counter = (counter + 1) % width
  // image(video, 0, 0)


  // translate(offset.x, offset.y)

}
