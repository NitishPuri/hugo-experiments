class Orbit {
  constructor(x, y, r, l, p) {
    this.x = x
    this.y = y
    this.r = r
    this.parent = p

    this.child = null
    this.level = l
    this.angle = -PI / 2

    this.speed = radians(pow(k, this.level - 1)) / resolution
  }

  update() {
    if (this.parent) {
      this.angle += this.speed
      let rsum = this.r + this.parent.r
      this.x = this.parent.x + rsum * cos(this.angle)
      this.y = this.parent.y + rsum * sin(this.angle)
    }
  }

  show() {
    stroke(255)
    strokeWeight(2)
    noFill()

    ellipse(this.x, this.y, this.r * 2)
  }

  addChild() {
    let r = this.r / 3
    let x = this.x + this.r + r
    let y = this.y
    this.child = new Orbit(x, y, r, this.level + 1, this)

    return this.child
  }
}