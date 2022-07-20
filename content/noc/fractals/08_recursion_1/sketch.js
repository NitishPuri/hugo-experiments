
var t = 0;

let params = {
  reduction: 0.75
}

function setup() {
  createCanvasCustom();

  let gui = new dat.GUI();
  gui.add(params, 'reduction').min(0.3).max(0.95).step(0.01)
}

let offset = [15, 4]

function draw() {
  background(51);
  drawCircle(width / 2, height / 2, width);
  t += 0.005;
  offset[0] += random(-0.1, 0.1)
  offset[1] += random(-0.1, 0.1)
  // noLoop()
}

function drawCircle(x, y, r) {
  stroke(255);
  // noStroke()
  // noFill();
  fill(map(r, width, 0, 100, 255), map(r, width, 0, 255, 150), 0, map(r, width, 0, 100, 255));
  ellipse(x, y, r);
  if (r > 4) {
    drawCircle(x + offset[0] * sin(t) / params.reduction, y + offset[1] * cos(t) / params.reduction, params.reduction * r);
  }
}