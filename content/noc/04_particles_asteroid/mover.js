class Mover {
  constructor(x, y, m) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = m * 20;
    this.mass = m;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  render() {
    stroke(0);
    strokeWeight(2);
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  checkEdges() {
    var buffer = this.r * 2;
    if (this.pos.x > width + buffer) {
      this.pos.x = -buffer;
    }
    else if (this.pos.x < -buffer) {
      this.pos.x = width + buffer;
    }
    if (this.pos.y > height + buffer) {
      this.pos.y = -buffer;
    }
    else if (this.pos.y < -buffer) {
      this.pos.y = height + buffer;
    }
  }
}
