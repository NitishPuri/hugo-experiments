class Blob {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.r = 40
    this.vel = p5.Vector.random2D();
    this.vel.mult(2, 5);
  }

  update() {
    this.pos.add(this.vel);
    this.bounce();
  }

  bounce() {
    if (this.pos.x < 0 || this.pos.x > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.vel.y *= -1;
    }
  }

  show() {
    noFill()
    stroke(0);
    strokeWeight(2)
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}