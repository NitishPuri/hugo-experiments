
let n = 0;

var params = {
  angle: 137.5,
  colorMode: '1',
  increment: 1.0,
  colorModes: [1, 2, 3],
  c: 4,
  reset() {
    n = 0
    background(0);
  }
}

function setup() {
  createCanvasCustom();
  background(0);
  angleMode(DEGREES)
  colorMode(HSB)

  const gui = new dat.GUI();
  gui.add(params, 'angle').min(135.0).max(150.0).step(0.1).name('Divergence(deg)');
  gui.add(params, 'increment').min(0.1).max(1.5).step(0.1).name('Increment');
  gui.add(params, 'c').min(2).max(20).step(1).name('Scaling parameter');
  gui.add(params, 'colorMode', params.colorModes);
  gui.add(params, 'reset');
}

function draw() {
  const a = n * (137.5);
  const r = params.c * sqrt(n);


  const x = r * cos(a) + width / 2;
  const y = r * sin(a) + height / 2;


  noStroke();
  switch (params.colorMode) {
    case '1': fill(n % 256, 255, 255); break;
    case '2': fill(a % 256, 255, 255); break;
    case '3': fill((a - r) % 256, 255, 255); break;
  }

  ellipse(x, y, 4);
  n += params.increment;
}