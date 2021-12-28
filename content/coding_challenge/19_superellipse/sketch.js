
var params = {
  n1: 1,
  n2: 1,
  n3: 1,
  m: 0,
  a: 1,
  b: 1,
  radius: 100,
  numPoints: 100,
  iterations: 1
}

function setup() {
  createCanvasCustom();
  background(0);
  // angleMode(DEGREES)
  // colorMode(HSB)

  const gui = new dat.GUI();
  gui.add(params, 'n1').min(0).max(100).step(0.1);
  gui.add(params, 'n2').min(0).max(100).step(0.1);
  gui.add(params, 'n3').min(0).max(100).step(0.1);
  gui.add(params, 'm').min(0).max(100).step(1);
  gui.add(params, 'a').min(1).max(10).step(1);
  gui.add(params, 'b').min(1).max(10).step(1);
  gui.add(params, 'numPoints').min(10).max(500).step(1);
  gui.add(params, 'radius').min(10).max(500).step(1);
  gui.add(params, 'iterations').min(1).max(3).step(1);
  // gui.add(params, 'colorMode', params.colorModes);
  // gui.add(params, 'reset');
}

function superShape(theta) {
  const a = params.a;
  const b = params.b;
  const m = params.m;
  const n1 = params.n1;
  const n2 = params.n2;
  const n3 = params.n3;

  let t1 = (1 / a) * cos(theta * m / 4)
  t1 = abs(t1);
  t1 = pow(t1, n2);

  let t2 = (1 / b) * sin(theta * m / 4)
  t2 = abs(t2);
  t2 = pow(t2, n3);

  const t3 = pow(t1 + t2, 1 / n1);

  if (t3 === 0) {
    return 0;
  }

  return (1 / t3);
}

function draw() {
  background(0)

  translate(width / 2, height / 2);

  const r = 100;

  stroke(255);
  noFill();
  beginShape()

  const increment = TWO_PI / params.numPoints

  for (let theta = 0; theta < params.iterations * TWO_PI; theta += increment) {
    const r = superShape(theta);
    const x = params.radius * r * cos(theta);
    const y = params.radius * r * sin(theta);

    vertex(x, y)
  }
  endShape(CLOSE)
}