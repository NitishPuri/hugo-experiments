function setup() {
  createCanvasCustom();
  frameRate(10)
  // put setup code here
}

var t = 0;

function draw() {
  background(51);
  drawCircle(width / 2, height / 2, width * 0.75);
  colorMode(HSB)
  t += 0.005;
  // noLoop()
}

function drawCircle(x, y, r) {
  stroke(255);
  // noStroke()
  // noFill();
  fill(map(r, width, 0, 0, 360), 255, 255, map(r, width, 0, 0, 1));
  ellipse(x, y, r);
  if (r > 8) {
    drawCircle(x + 100 * sin(t), y + 50 * cos(t), 0.6 * r, 0.4 * r);
    drawCircle(x - 100 * sin(t), y - 50 * cos(t), 0.6 * r, 0.4 * r);
  }
}