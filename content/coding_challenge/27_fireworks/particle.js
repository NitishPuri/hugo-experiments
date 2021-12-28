class Particle {
  constructor(x, y, hue, firework) {
    this.hue = hue
    this.pos = createVector(x, y);
    this.firework = firework
    this.lifespan = 100;
    if (this.firework) {
      this.vel = createVector(0, random(-15, -10));
    }
    else {
      this.vel = p5.Vector.random2D()
      this.vel.mult(random(1, 6))
    }
    this.acc = createVector(0, 0);

    pCount++;
  }
  update() {
    if (!this.firework) {
      this.vel.mult(0.95)
      this.lifespan -= 1
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }
  applyForce(f) {
    this.acc.add(f)
  }
  show() {
    if (!this.firework) {
      strokeWeight(2)
      stroke(this.hue, 255, 255, this.lifespan / 100)
    }
    else {
      strokeWeight(4)
      stroke(this.hue, 255, 255)
    }
    point(this.pos.x, this.pos.y);
  }
  done() {
    return (this.lifespan < 0)
  }
}