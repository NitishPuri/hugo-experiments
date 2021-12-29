
let x = 0;
let y = 0;

let spacing = 10

function setup() {
  createCanvasCustom()
  background(0)
}

function draw() {

  stroke(255)
  strokeWeight(2)

  if (random(1) < 0.5) {
    line(x, y, x + spacing, y + spacing)
  }
  else {
    line(x, y + spacing, x + spacing, y)
  }

  x += spacing
  if (x >= width) {
    x = 0
    y += spacing
  }
}

