class Hankin {
  constructor(a, v) {
    this.a = a
    this.v = v
    this.b = p5.Vector.add(a, v)
  }

  show() {
    stroke(255, 0, 255)
    line(this.a.x, this.a.y, this.b.x, this.b.y)

    // fill(255)
    // ellipse(this.a.x, this.a.y, 8)

    // if (this.b) {
    //   fill(255, 255, 0)
    //   ellipse(this.b.x, this.b.y, 4)
    // }
  }

}