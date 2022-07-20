class Spaceship {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.ps = new ParticleSystem();

    this.mass = 1;

    this.damping = 0.99;
    this.topSpeed = 6;

    this.heading = 0;
    this.r = 16;
    this.thrusting = false;
  }

  applyForce(force) {
    var f = p5.Vector.div(force, this.mass);
    this.acc.add(f);
  }

  turn(a) {
    this.heading += a;
  }

  thrust() {
    var angle = this.heading - PI / 2;
    var force = createVector(cos(angle), sin(angle));
    force.mult(0.3);
    this.applyForce(force);
    this.thrusting = true;

    // this.ps.addParticle(this.pos.x, this.pos.y + 2*this.r, force);
    this.ps.addParticle(this.pos.x, this.pos.y, force, random(imgs));
  }

  render() {
    stroke(0);
    strokeWeight(2);

    push();
    // translate(this.pos.x, this.pos.y - this.r);
    translate(this.pos.x, this.pos.y);


    rotate(this.heading);
    fill(175);
    if (this.thrusting) fill(255, 0, 0);
    rect(-this.r / 2 - this.r / 3, 0, this.r / 3, this.r / 2);
    rect(this.r / 2, 0, this.r / 3, this.r / 2);
    fill(175);
    beginShape();
    vertex(-this.r, 0);
    vertex(0, -this.r * 2);
    vertex(this.r, 0);
    endShape(CLOSE);
    pop();

    this.thrusting = false;
  }

  update() {
    this.vel.add(this.acc);
    this.vel.mult(this.damping);
    this.vel.limit(this.topSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);

    this.ps.run();
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
