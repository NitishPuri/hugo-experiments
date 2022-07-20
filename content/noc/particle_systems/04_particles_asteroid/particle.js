class Particle {
  constructor(x, y, f, img_) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(), random());
    // this.velocity = random2D();
    this.acceleration = f.copy();
    this.lifespan = 255;
    this.mass = (random(1, 3));

    // console.log("Particle created at : " + x + " " + y);

    this.img = img_;
  }

  run() {
    this.update();
    this.display();
  }

  display() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(this.img, this.position.x, this.position.y, this.mass * 12, this.mass * 12);

    // noStroke();
    // fill(127, this.lifespan);
    // ellipse(this.position.x, this.position.y, this.mass*12);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 5.0;
  }

  isDead() {
    return (this.lifespan <= 0.0);
  }
}