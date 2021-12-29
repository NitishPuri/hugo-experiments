
let params = {
  r1: 200,
  r2: 200,
  m1: 40,
  m2: 40,
  g: 1,
  damping: 1,
  reset: function () {
    a1 = PI / 2;
    a2 = PI / 2;
    buffer.background(255)
  }
}

let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;

let px2 = -1;
let py2 = -1;
let cx, cy;

let buffer;

function setup() {
  createCanvasCustom();
  cx = width / 2;
  cy = 100;
  buffer = createGraphics(width, height);


  pixelDensity(1)
  buffer.pixelDensity(1)

  params.reset()
  buffer.translate(cx, cy);

  let gui = new dat.GUI()
  gui.add(params, 'r1').min(50).max(400).step(5)
  gui.add(params, 'r2').min(50).max(400).step(5)
  gui.add(params, 'm1').min(10).max(80).step(5)
  gui.add(params, 'm2').min(10).max(80).step(5)
  gui.add(params, 'damping').min(0.9).max(1).step(0.01)
  gui.add(params, 'reset')
}

function draw() {
  background(175);
  imageMode(CORNER);
  image(buffer, 0, 0, width, height);

  let num1 = -params.g * (2 * params.m1 + params.m2) * sin(a1);
  let num2 = -params.m2 * params.g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * params.m2;
  let num4 = a2_v * a2_v * params.r2 + a1_v * a1_v * params.r1 * cos(a1 - a2);
  let den = params.r1 * (2 * params.m1 + params.m2 - params.m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * sin(a1 - a2);
  num2 = (a1_v * a1_v * params.r1 * (params.m1 + params.m2));
  num3 = params.g * (params.m1 + params.m2) * cos(a1);
  num4 = a2_v * a2_v * params.r2 * params.m2 * cos(a1 - a2);
  den = params.r2 * (2 * params.m1 + params.m2 - params.m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num1 * (num2 + num3 + num4)) / den;

  translate(cx, cy);
  stroke(0);
  strokeWeight(2);

  let x1 = params.r1 * sin(a1);
  let y1 = params.r1 * cos(a1);

  let x2 = x1 + params.r2 * sin(a2);
  let y2 = y1 + params.r2 * cos(a2);

  line(0, 0, x1, y1);
  fill(0);
  ellipse(x1, y1, params.m1);

  line(x1, y1, x2, y2);
  fill(0);
  ellipse(x2, y2, params.m2);

  a1_v += a1_a;
  a2_v += a2_a;

  // a1_v = 0.02;
  // a2_v = 0.02;
  a1 += a1_v;
  a2 += a2_v;

  a1_v *= params.damping;
  a2_v *= params.damping;

  buffer.stroke(0, 150);
  buffer.fill(0, 150)
  // buffer.translate(2, 2);
  if (frameCount > 1) {
    // buffer.ellipse(x2, y2, 5)
    // buffer.ellipse(0, 0, 5)
    buffer.line(px2, py2, x2, y2);
  }

  px2 = x2;
  py2 = y2;
}