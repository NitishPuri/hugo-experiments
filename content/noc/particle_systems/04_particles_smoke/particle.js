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
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(img, this.position.x, this.position.y, this.mass * 12, this.mass * 12);
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