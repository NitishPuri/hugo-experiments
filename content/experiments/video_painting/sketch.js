
var video;

var vScale;

var params = {
  alpha: 127,
  lerp: 0.0
}

var offset;
var bgColor;

var particles = [];

function setup() {
  createCanvasCustom()
  // createCanvas(640, 480);
  // createCanvas(320, 240);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(64, 48)
  // video.size(32, 24)
  video.hide()

  vScale = height / video.height
  offset = {
    // x : video.width*vScale ,
    x: (width - video.width * vScale) / 2,
    y: 0
  }

  bgColor = color(255, 255, 255, 100);

  var gui = new dat.GUI();
  gui.add(params, 'alpha').min(0).max(255)
  gui.add(params, 'lerp').min(0).max(1).step(0.1)
  // gui.add(params, 'bgColor').min(0).max(255)

  for (let i = 0; i < 200; i++) {
    particles.push(new Particle())
  }

  rectMode(CENTER)
}

function draw() {
  // background(bgColor)

  translate(offset.x, offset.y)

  particles.forEach(p => {
    p.update();
    p.show();
  })
}
