
let attackLevel = 1;
let releaseLevel = 0;

let attackTime = 0.01
let decayTime = 0.1;
let susPercent = 0.5;
let releaseTime = 0.5;

let numbers = [];
let count = 1;
let sequence = [];
let index = 0;

let scl = 0;

let arcs = [];

let biggest = 0;

let osc;

let started = false;

class Arc {
  constructor(start, end, dir) {
    this.start = start;
    this.end = end;
    this.dir = dir;
  }

  show() {
    let diameter = abs(this.end - this.start);
    let x = (this.end + this.start) / 2;
    let h = map(diameter, 0, biggest, 0, 360);
    stroke(h, 100, 100, 100)
    if (this.dir == 0) {
      arc(x, 0, diameter, diameter, PI, 0)
    } else {
      arc(x, 0, diameter, diameter, 0, PI)
    }
  }
}

function setup() {
  createCanvasCustom();
  frameRate(5)
  background(0);

  stroke(255);
  strokeWeight(0.5);
  noFill();

  colorMode(HSB, 360, 100, 100, 100)

  numbers[index] = true;
  sequence.push(index);

  noLoop();
}

function start() {
  env = new p5.Envelope();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.amp(env);
  osc.start();

  loop();
}

function step() {
  let next = index - count;
  if (next < 0 || numbers[next]) {
    next = index + count;
  }

  numbers[next] = true;
  sequence.push(next);

  let a = new Arc(index, next, count % 2);
  arcs.push(a);
  index = next;

  let n = (index % 25) + 24;
  let freq = pow(2, (n - 49) / 12) * 440;
  osc.freq(freq);
  env.play();

  if (index > biggest) {
    biggest = index;
  }

  count++;
}

function draw() {
  // background(0);

  if (!started) return;

  step();
  translate(0, height / 2);
  scl = lerp(scl, width / biggest, 0.1)
  scale(scl);
  background(0)

  arcs.forEach((a) => a.show());
}

function mousePressed() {
  if (started) {
    return;
  }
  else {
    start();
  }
}