

var params = {
  points: 100,
  dx: 0.1,
  rose: true,
  size: 100,
  animate: true,
  reset: () => {
    yOff = 0;
    noiseSeed(random(100))
  }
}

var yOff = 0;

function setup() {
  createCanvasCustom();

  var gui = new dat.GUI();
  gui.add(params, 'points').min(50).max(400)
  gui.add(params, 'dx').min(0.001).max(0.5).step(0.004)
  gui.add(params, 'rose')
  gui.add(params, 'animate')
  gui.add(params, 'size').min(100).max(500)
  gui.add(params, 'reset')
}

function draw() {
  background(0);
  translate(width / 2, height / 2)

  if (params.rose) {
    rotate(PI / 2)
  }

  var r = 100;
  stroke(255);
  fill(200)
  strokeWeight(1);

  var da = PI / params.points;
  var dx = params.dx;

  const rMin = params.size * 2 / 5;
  const rMax = params.size;

  beginShape()
  var xoff = 0;
  let a = -PI / 2
  for (; a < 3 / 2 * PI; a += da) {
    var n = noise(xoff + yOff);
    var r = map(n, 0, 1, rMin, rMax)
    if (params.rose) {
      r *= sin(2 * a);
    }
    var x = r * cos(a);
    var y = r * sin(a);
    // point(x, y);
    if (a < PI / 2) {
      xoff += dx;
    }
    else {
      xoff -= dx;
    }
    vertex(x, y)
    // r--;
  }
  endShape();

  if (params.animate) {
    yOff += 0.01
  }

  // noLoop();

}

