class Particle {
  constructor(x, y) {
    x = x || random(width)
    y = y || random(height)
    this.pos = createVector(x, y)
    this.vel = createVector(0, 0)
    // this.vel = p5.vector.random2D()
    this.acc = createVector(0, 0)
    this.prev = createVector(x, y)
  }

  update() {
    this.vel.add(this.acc)
    this.vel.limit(5)
    this.pos.add(this.vel)
    this.acc.mult(0)
  }

  show() {
    stroke(255, 255)
    strokeWeight(4)
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y)

    this.prev.x = this.pos.x
    this.prev.y = this.pos.y
  }

  attracted(t) {
    let force = p5.Vector.sub(t, this.pos)
    let d = force.mag()
    d = constrain(d, 1, 25)
    let G = 50
    let strength = G / (d * d)
    force.setMag(strength)
    if (d < 20) {
      force.mult(-10)
    }
    this.acc.add(force)
  }
}