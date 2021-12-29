

let params = {
  r: 200,
  n: 7,
  d: 1
}

function setup() {
  createCanvasCustom()

  gui = new dat.GUI()
  gui.add(params, 'r').min(100).max(500).step(1)
  gui.add(params, 'n').min(0).max(20).step(1)
  gui.add(params, 'd').min(1).max(20).step(1)
}

function draw() {
  background(0)

  translate(width / 2, height / 2)

  stroke(255)
  strokeWeight(1)
  noFill()

  beginShape()
  let k = params.n / params.d
  for (let a = 0; a < TWO_PI * params.d; a += 0.01) {
    let rad = cos(k * a)
    let x = params.r * rad * cos(a)
    let y = params.r * rad * sin(a)

    vertex(x, y)
  }
  endShape(CLOSE)
}
