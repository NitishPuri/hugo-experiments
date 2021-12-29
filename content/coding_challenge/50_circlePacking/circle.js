class Circle {
  constructor(x, y, r) {
    this.pos = createVector(x, y)

    this.r = r || 1;

    this.growing = true;
  }

  show() {
    // fill(255)
    // noStroke()
    stroke(255)
    noFill()
    ellipse(this.pos.x, this.pos.y, this.r * 2)
  }

  grow() {
    if (this.growing)
      this.r += 1
  }

  edges() {
    return (this.pos.x + this.r > width || this.pos.x - this.r < 0
      || this.pos.y + this.r > height || this.pos.y - this.r < 0)
  }
}