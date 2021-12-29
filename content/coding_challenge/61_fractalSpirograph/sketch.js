
let path = []

let k = -4

let sun
let end

let resolution = 10

function setup() {
  createCanvasCustom();

  sun = new Orbit(width / 2, height / 2, 100, 0)

  let next = sun
  for (let i = 0; i < 10; i++) {
    next = next.addChild()
  }

  end = next
}

function draw() {
  background(0);


  for (let i = 0; i < resolution; i++) {
    let current = sun
    while (current != null) {
      current.update()
      current.show()
      current = current.child
    }
    path.push(createVector(end.x, end.y))
  }


  stroke(255, 0, 255)
  beginShape()
  path.forEach(p => vertex(p.x, p.y))
  endShape()

  if (path.length > 2500) {
    path.splice(0, 500)
  }

}

