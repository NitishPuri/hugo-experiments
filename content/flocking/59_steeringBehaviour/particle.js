class Particle {
  constructor(x, y) {
    x = x || random(width)
    y = y || random(height)
    // this.pos = createVector(x + random(-width/4, width/4), y + random(-height/2, height/2));
    this.pos = createVector(random(width), random(height));
    this.target = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 4
    this.maxForce = 0.3;
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

  behaviours() {
    // const seek = this.seek(this.target);
    // this.applyForce(seek);

    const arrive = this.arrive(this.target);
    this.applyForce(arrive);

    const mouse = createVector(mouseX, mouseY);
    const flee = this.flee(mouse)
    this.applyForce(flee.mult(3));
  }

  flee(t) {
    var desired = p5.Vector.sub(t, this.pos);
    var d = desired.mag();
    if (d < 100) {
      desired.setMag(this.maxSpeed);
      desired.mult(-1)

      const steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    return createVector(0, 0);
  }

  arrive(t) {
    var desired = p5.Vector.sub(t, this.pos);
    // desired.setMag(this.maxSpeed);
    var d = desired.magSq();
    if (d < 100) {
      const m = map(d, 0, 100, this.maxSpeed);
      desired.setMag(m)
    }
    else {
      desired.setMag(this.maxSpeed);
    }

    const steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    return steer;
  }

  // follow(flowField) {
  //   const x = floor(this.pos.x/params.scale);
  //   const y = floor(this.pos.y/params.scale);
  //   const index = x + y*cols
  //   const v = flowField[index];
  //   this.applyForce(v)
  // }

  // edges() {
  //   if(this.pos.x > width) this.pos.x = 0;
  //   if(this.pos.x < 0) this.pos.x = width;
  //   if(this.pos.y > height) this.pos.y = 0;
  //   if(this.pos.y < 0) this.pos.y = height;
  // }

  show() {
    // strokeWeight(params.strokeSize)
    strokeWeight(8)
    stroke(this.hue, 255, 255, 100);
    point(this.pos.x, this.pos.y)
    // line(this.pos.x, this.pos.y, this.prev.x, this.prev.y);
  }
}