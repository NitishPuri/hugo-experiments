
let attractors = []
let particles = []

function setup() {
  createCanvasCustom()
}

function mousePressed() {
  attractors.push(createVector(mouseX, mouseY))
}

function draw() {
  background(0, 150)

  stroke(255)
  strokeWeight(1)

  particles.push(new Particle())

  if (particles.length > 1000) {
    particles.splice(0, 1)
  }

  stroke(0, 255, 0)
  attractors.forEach(a => point(a.x, a.y))


  particles.forEach(p => {
    attractors.forEach(a => p.attracted(a))
    p.update()
    p.show()
  })
}
