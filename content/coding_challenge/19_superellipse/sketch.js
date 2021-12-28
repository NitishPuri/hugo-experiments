
var params = {
  n: 2,
  a: 100,
  b: 100,
}

function setup() {
  createCanvasCustom();
  background(0);

  const gui = new dat.GUI();
  gui.add(params, 'n').min(0).max(10).step(0.1).name('Degree');
  gui.add(params, 'a').min(50).max(1000).step(10).name('Major Axis');
  gui.add(params, 'b').min(50).max(1000).step(10).name('Minor Axis');
}

function sgn(x) {
  if (x > 0) return 1;
  else if (x < 0) return -1;
  else return 0;
}

function draw() {
  background(0)

  translate(width / 2, height / 2);

  stroke(255);
  strokeWeight(2);
  noFill();

  const n = params.n;
  const a = params.a;
  const b = params.b;

  beginShape()
  for (let theta = 0; theta < TWO_PI; theta += 0.1) {
    const na = 2 / n;
    const x = pow(abs(cos(theta)), na) * a * sgn(cos(theta))
    const y = pow(abs(sin(theta)), na) * b * sgn(sin(theta))
    vertex(x, y)
  }
  endShape(CLOSE)
}