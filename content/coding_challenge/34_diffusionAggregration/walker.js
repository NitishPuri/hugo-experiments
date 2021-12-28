class Walker {
  constructor(x, y) {
    if (arguments.length == 2) {
      this.pos = createVector(x, y)
      this.stuck = true
    }
    else {
      this.pos = randomPoint()
      this.stuck = false
    }

    this.r = radius

    radius *= 0.99
  }

  walk() {
    let vel = p5.Vector.random2D()
    this.pos.add(vel)

    this.pos.x = constrain(this.pos.x, 0, width)
    this.pos.y = constrain(this.pos.y, 0, height)

  }

  checkStuck(others) {
    for (let i = 0; i < others.length; i++) {
      let d = distSq(others[i].pos, this.pos)
      if (d < (this.r * others[i].r) * 4) {
        this.stuck = true
        break
      }
    }

    return this.stuck
  }
  show() {
    var hu = map(this.r, 0, 8, 0, 360)
    noStroke()
    fill(hu, 255, 255)
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }
}

function distSq(a, b) {
  let dx = (a.x - b.x)
  let dy = (a.y - b.y)
  return (dx * dx + dy * dy)
}

function randomPoint() {
  let i = floor(random(4))

  // let
  if (i === 0) {
    return createVector(random(width), 0)
  }
  else if (i === 1) {
    return createVector(random(width), height)
  }
  else if (i === 2) {
    return createVector(0, random(height))
  }
  else {
    return createVector(width, random(height))
  }
}