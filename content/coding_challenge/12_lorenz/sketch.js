let x = 0.01
let y = 0
let z = 0

let points = []

let params = {
  a: 10,
  b: 28,
  c: 8 / 3,
  reset: function() {
    points = []
  }
}

function setup() {
  createCanvasCustom({ renderer: WEBGL });

  let gui = new dat.GUI()
  gui.add(params, "a").min(1).max(100)
  gui.add(params, "b")
  gui.add(params, "c")
  gui.add(params, "reset")

  colorMode(HSB)
  background(0)
}



function draw() {

  background(0)

  const camX = map(mouseX, 0, width, -200, 200);
  const camY = map(mouseY, 0, height, -200, 200);
  // // orbit
  camera(camX, camY, (height / 2) / (tan(PI / 6)), 0, 0, 0, 0, 1, 0)

  let dt = 0.01
  let dx = params.a * (y - x)
  let dy = x * (params.b - z) - y
  let dz = x * y - params.c * z

  x += (dx * dt)
  y += (dy * dt)
  z += (dz * dt)

  points.push(createVector(x, y, z))

  // translate(width / 2, height / 2)
  scale(5)
  stroke(255)
  noFill();
  // translate(x, y, z)

  let hu = 0
  beginShape()
  points.forEach(p => {
    stroke(hu, 255, 255)
    vertex(p.x, p.y, p.z)
    hu = ((hu + 0.1) % 255)
  })
  endShape()

  if(points.length > 1000) {
    params.reset()
  }

  // sphere(0.5)
  // sphere(x, y, z)

  // console.log(x, y, z)

}