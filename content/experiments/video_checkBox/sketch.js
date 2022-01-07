
var video;

var vScale;

var params = {
  threshold: 127
}

var cb = []

function setup() {
  noCanvas()
  // createCanvasCustom()
  pixelDensity(1);

  background(51)
  video = createCapture(VIDEO);
  video.size(64, 48)
  // video.size(32, 24)
  video.hide()

  // vScale = width / video.width
  vScale = height / video.height

  var gui = new dat.GUI();
  gui.add(params, 'threshold').min(0).max(255)

  for (let y = 0, vh = video.height; y < vh; y++) {
    for (let x = 0, vw = video.width; x < vw; x++) {
      var c = createElement('input')
      c.class('cb_grid')
      c.elt.type = 'checkbox'
      c.parent('sketch-holder')
      cb.push(c)
    }
    createSpan('<br/>').parent('sketch-holder')
  }
  rectMode(CENTER)
}

function draw() {
  video.loadPixels();

  for (let y = 0, vh = video.height; y < vh; y++) {
    for (let x = 0, vw = video.width; x < vw; x++) {
      const index = (x + y * vw) * 4;
      const r = video.pixels[index + 0];
      const g = video.pixels[index + 1];
      const b = video.pixels[index + 2];
      const a = video.pixels[index + 3];

      const bright = (r + g + b) / 3;
      // const w = map(bright, 0, 255, 0, vScale);
      const w = vScale;

      var boxIndex = (x + y * vw);
      if (bright > params.threshold) {
        cb[boxIndex].elt.checked = false
      }
      else {
        cb[boxIndex].elt.checked = true
      }
    }
  }
}
