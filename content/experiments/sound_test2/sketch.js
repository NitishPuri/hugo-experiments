
var wave;
var env;

var gui;
var bgColor;

var params = {
  volume: 1,
  freq: 440,
  type: 'sine',
  pan: 0,
  toggle() {
    env.play()
  },
  types: {
    sine: 'sine',
    triangle: 'triangle',
    sawtooth: 'sawtooth',
    square: 'square'
  }
}


function setupGui() {
  console.log("Setting up the gui.")

  bgColor = color(0)

  gui = new dat.GUI()
  // gui.add(params, 'volume').min(0).max(1).step(0.01)
  //   .onChange(value => wave.amp(value, 0.5));
  gui.add(params, 'freq').min(100).max(1200)
    .onChange(value => wave.freq(value));
  gui.add(params, 'pan').min(-1).max(1).step(0.01)
    .onChange(value => wave.pan(value));
  gui.add(params, 'type', params.types)
    .onChange(value => wave.setType(value))
  gui.add(params, 'toggle')
  // gui.add(params, 'stop')
  // gui.add(params, 'jumpRandom')
}

function setup() {
  createCanvasCustom();
  bgColor = color(255);
  // song = loadSound(resolveUrl('/data/rainbow.mp3'), setupGui)

  env = new p5.Env();
  env.setADSR(0.5, 0.25, 0.5, 0.1);
  env.setRange(0.8, 0)

  wave = new p5.Oscillator();
  wave.start();
  wave.setType('sine');
  wave.freq(params.freq);
  wave.amp(env)


  setupGui();
}

function draw() {
  background(bgColor);

  // fill(255, 0, 255);
  // ellipse(width / 2, height / 2, vol);
}