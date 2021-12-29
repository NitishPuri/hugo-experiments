
let circles = []
let numCircles = 10

function setup() {
  createCanvasCustom()

  // for (let i = 0; i < numCircles; i++) {
  //   circles.push(new Circle(random(width), random(height)))
  // }
  // circles.push(new Circle())
}

function draw() {
  background(0)

  let newC = newCircle()
  if (newC) {
    circles.push(newC)
  }

  circles.forEach(c => {
    if (c.growing) {
      if (c.edges()) {
        c.growing = false
      }
      else {
        let overlapping = false;
        for (c2 of circles) {
          if (c !== c2) {
            let d = p5.Vector.dist(c.pos, c2.pos)
            if (d < c.r + c2.r) {
              c.growing = false
              break;
              overlapping = true
            }
          }
        }
      }
    }
    c.show()
    c.grow()
  })
}

function newCircle() {
  let x = random(width)
  let y = random(height)

  let valid = true;
  for (c of circles) {
    let d = dist(x, y, c.pos.x, c.pos.y)
    if (d < c.r) {
      valid = false
      break;
    }
  }

  if (valid) {
    return new Circle(x, y)
  }

  return null
}