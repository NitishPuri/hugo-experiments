let x = 0.01
let y = 0
let z = 0

let points = []

let params = {
  a: 10,
  b: 28,
  c: 8 / 3,
  dt: 0.01,
  reset: function() {
    x = random(-0.05, 0.05)
    y = 0
    z = 0
    points = []
  }
}

function setup() {
  createCanvasCustom({ renderer: WEBGL });

  let gui = new dat.GUI()
  gui.add(params, "a").min(1).max(20)
  gui.add(params, "b").min(20).max(30)
  gui.add(params, "c").min(1).max(10)
  gui.add(params, "dt").min(0.01).max(0.02)
  gui.add(params, "reset")

  colorMode(HSB)
  background(0)
}

function draw() {

  background(0)
  orbitControl()

  let dt = params.dt
  let dx = params.a * (y - x)           // dx = a*(y - x)
  let dy = x * (params.b - z) - y       // dy = x*(b - z) * y
  let dz = x * y - params.c * z         // dz = x*y - c*z

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

  if(points.length > 10000) {
    params.reset()
  }

  // sphere(0.5)
  // sphere(x, y, z)

  // console.log(x, y, z)

}