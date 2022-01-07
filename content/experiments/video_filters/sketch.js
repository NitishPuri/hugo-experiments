
var video;

var vScale;

var offset;
// var bgColor;

var params = {
  bgColor: [0, 0, 0, 255],
  // filters
  filter: 0,
  filters: {
    Pixelate: 0,
    GrayScale: 1,
    Invert: 2,
    Threshold: 3,
  },
  filterFuncs: [
    Filters.pixelate,
    Filters.grayscale,
    Filters.invert,
    Filters.threshold
  ],
  threshold: 127
}

var currFilter;

function setup() {
  noCanvas()
  createCanvasCustom()
  // createCanvas(640, 480);
  // createCanvas(320, 240);
  pixelDensity(1);
  console.log(windowWidth, windowHeight)

  background(51)
  video = createCapture(VIDEO);
  // video.size(width/vScale, height/vScale);
  // video.size(windowWidth/vScale, windowHeight/vScale);
  video.size(64, 48)
  // video.size(32, 24)
  // video.size(width/vScale, height/vScale);
  video.hide()

  // vScale = width / video.width
  vScale = height / video.height
  offset = {
    // x : video.width*vScale ,
    x: (width - video.width * vScale) / 2,
    y: 0
  }

  bgColor = color(255, 0, 0, 100);
  currFilter = params.filterFuncs[params.filter];

  var gui = new dat.GUI();
  gui.addColor(params, 'bgColor').name('Background')
  gui.add(params, 'threshold').name('Threshold').min(0).max(255).step(1)
  gui.add(params, 'filter', params.filters)
    .onFinishChange(value => currFilter = params.filterFuncs[value])
    .name('Filter')

  rectMode(CENTER)
}

function draw() {
  translate(offset.x, offset.y)
  currFilter()
}
