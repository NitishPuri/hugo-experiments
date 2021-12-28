class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-2, -0.5));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255;
    this.mass = (random(1, 3));
  }

  run() {
    this.update();
    this.display();
  }

  applyForce(force) {
    var f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  display() {
    stroke(0, this.lifespan);
    strokeWeight(2);
    fill(127, this.lifespan)
    ellipse(this.position.x, this.position.y, this.mass * 12);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
  }

  isDead() {
    return (this.lifespan <= 0.0);
  }
}

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  display() {
    rectMode(CENTER);
    fill(127, this.lifespan);
    stroke(0, this.lifespan);
    strokeWeight(2);
    push();
    translate(this.position.x, this.position.y);
    var theta = map(this.position.x, 0, width, 0, TWO_PI * 2);
    rotate(theta);
    rect(0, 0, 12, 12);
    pop();
  }
}

class Repeller {
  constructor(x, y) {
    this.G = 100;
    this.position = createVector(x, y);
    var r = 10;
  }

  display() {
    stroke(0);
    strokeWeight(2);
    fill(175);
    ellipse(this.position.x, this.position.y, 48);
  }

  repel(p) {
    var dir = p5.Vector.sub(this.position, p.position);
    var d = dir.mag();
    dir.normalize();
    if (d < 50) {
      d = constrain(d, 5, 50);
      var force = -1 * this.G / (d * d);
      dir.mult(force);
    }
    else {
      dir.mult(0);
    }
    return dir;
  }

}