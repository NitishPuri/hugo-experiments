class Particle {
  constructor(x, y) {
    x = x || random(width)
    y = y || random(height)
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.acc = createVector(0, 0);
    this.maxSpeed = 4
    this.prev = createVector(this.pos.x, this.pos.y);

    // color
    this.hue = random(360)

    // hsvtor

  }

  update() {
    this.prev = this.pos.copy();
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  applyForce(f) {
    this.acc.add(f)
  }

  follow(flowField) {
    const x = floor(this.pos.x / params.scale);
    const y = floor(this.pos.y / params.scale);
    const index = x + y * cols
    const v = flowField[index];
    this.applyForce(v)
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    strokeWeight(params.strokeSize)
    // strokeWeight(2)
    // stroke(this.hue, 255, 255, 0.4);
    stroke(this.hue, 255, 255, params.alpha);
    // stroke(0, 0, 0, 10);
    // strokeWeight(1)
    // point(this.pos.x, this.pos.y)
    line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }
} 