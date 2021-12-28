class Boid {
  constructor(x, y) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = 10.0;
    this.maxSpeed = 3;
    this.maxForce = 0.05;
  }

  run(boids) {
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  flock(boids) {
    const sep = this.separate(boids);   // Separation
    const ali = this.align(boids);      // Alignment
    const coh = this.cohesion(boids)    // Cohesion

    sep.mult(params.separate);
    ali.mult(params.align);
    coh.mult(params.cohesion);

    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.normalize();
    desired.mult(this.maxSpeed);
    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  render() {
    const theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  // Check for nearby boids and steer away.
  separate(boids) {
    const desiredSeparation = 25.0;
    const steer = createVector(0, 0);
    let count = 0;
    // console.log("Here");
    boids.forEach(b => {
      const d = p5.Vector.dist(this.position, b.position);
      if ((d > 0) && (d < desiredSeparation)) {
        const diff = p5.Vector.sub(this.position, b);
        diff.normalize();
        // diff.div(d);
        steer.add(diff);
        count++;
      }
    })

    if (count > 0) {
      steer.div(count);
    }

    if (steer.magSq() > 0) {
      steer.normalize();
      steer.mult(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }

    return steer;
  }

  // For every nearby boid, calculate the average velocity
  align(boids) {
    const neighbourDist = 50;
    const sum = createVector(0, 0);
    let count = 0;
    boids.forEach(b => {
      const d = p5.Vector.dist(this.position, b.position);
      if ((d > 0) && (d < neighbourDist)) {
        sum.add(b.velocity);
        count++;
      }
    })

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      const steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }
    else {
      return createVector(0, 0);
    }
  }

  cohesion(boids) {
    const neighbourDist = 50;
    const sum = createVector(0, 0);
    let count = 0;
    boids.forEach(b => {
      const d = p5.Vector.dist(this.position, b.position);
      if ((d > 0) && (d < neighbourDist)) {
        sum.add(b.position)
        count++;
      }
    })

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    }

    return createVector(0, 0);
  }
}