
var video;

var vScale;

var params = {
  effect: 0,
  effects: {
    Blur: 0,
    Chroma: 1
  },
  blur: 0.5,
  chromaScreen: [0.5, 0.5, 0.5, 1]
}

var offset;

var counter = 0;

function setup() {
  // createCanvasCustom()
  var canvas = createCanvas(640, 480, WEBGL);
  canvas.id('p5Canvas')
  // createCanvas(800, 240);
  // createCanvas(320, 240);
  pixelDensity(1);

  video = createCapture(VIDEO);
  video.size(640, 480)
  video.id('p5Video')
  // video.size(64, 48)
  // video.size(32, 24)
  // video.hide()

  vScale = height / video.height
  offset = {
    // x : video.width*vScale ,
    x: (width - video.width * vScale) / 2,
    y: 0
  }

  // background(51)

  var seriously = new Seriously()
  var src = seriously.source('#p5Video')
  var target = seriously.target('#p5Canvas')

  var blur = seriously.effect('blur')
  blur.source = src;
  target.source = blur;

  var chroma = seriously.effect('chroma');
  // chroma.source = src;
  // target.source = chroma;
  // chroma.screen = [r. g, b, 1]


  seriously.go();
  var gui = new dat.GUI();
  // gui.add(params, 'lerp').min(0).max(1).step(0.1)
  gui.add(params, 'effect', params.effects).onFinishChange(value => {
    if (value == params.effects.Blur) {
      blur.source = src;
      target.source = blur;
    }
    else if (value == params.effects.Chroma) {
      chroma.source = src;
      target.source = chroma;
    }
  })
  gui.add(params, 'blur').min(0).max(1).step(0.01)
    .onChange(value => blur.amount = value)
  gui.addColor(params, 'chromaScreen').onChange(value => {
    chroma.screen = [value[0] / 255, value[1] / 255, value[2] / 255, 1];
  })

  // rectMode(CENTER)
}