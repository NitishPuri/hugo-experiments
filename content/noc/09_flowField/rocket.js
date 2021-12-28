class Rocket {
  constructor(pos, dna) {
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos.copy();
    this.r = 2;
    this.dna = dna;

    this.stopped = false;
    this.dead = false;
    this.finish = 100000;

    this.recordDist = width;
    this.fitness = 0;
    this.maxspeed = 6.0
    this.maxforce = 1.0;
  }

  calcFitness() {
    if (this.recordDist < diam / 2) this.recordDist = 1;

    this.fitness = (1 / pow(this.finish, 1.5)) * (1 / pow(this.recordDist, 6));

    // if(this.hitObstacle) this.fitness *= 0.1;
    // if(this.hitObstacle) this.fitness *= 2;
  }

  setFinish() {
    this.finish = f;
  }

  run(os) {
    if (!this.stopped) {
      this.update();
      if (this.borders() || this.obstacles(os)) {
        this.stopped = true;
        this.dead = true;
      }
    }

    this.display()
  }

  borders() {
    return ((this.position.x < 0) || (this.position.y < 0) ||
      (this.position.x > width) || (this.position.y > height))
  }

  finished() {
    var d = p5.Vector.dist(this.position, target.position)
    if (d < this.recordDist) {
      this.recordDist = d;
    }
    if (target.contains(this.position)) {
      this.stopped = true;
      return true;
    }

    return false;
  }

  obstacles(os) {
    for (let i = 0; i < os.length; i++) {
      const obs = os[i];
      if (obs.contains(this.position)) {
        return true;
      }
    }
    return false;
  }

  update() {
    if (!this.finished()) {
      var x = floor(this.position.x / gridscale);
      var y = floor(this.position.y / gridscale);

      x = constrain(x, 0, floor(width / gridscale - 1));
      y = constrain(y, 0, floor(height / gridscale - 1));

      var desired = this.dna.genes[x + y * floor(width / gridscale)].copy()
      desired.mult(this.maxspeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
      this.acceleration.limit(this.maxforce);

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxspeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  }

  display() {
    // var theta = this.velocity.heading() + PI/2;
    fill(200, 100);
    if (!this.velocity.x) fill(255, 0, 0);
    stroke(0);
    strokeWeight(0.5);
    ellipse(this.position.x, this.position.y, this.r * 2)
    // push();
    // translate(this.position.x, this.position.y);
    // rotate(theta);

    // // Thrusters
    // rectMode(CENTER);
    // fill(0);
    // rect(-this.r/2, this.r*2, this.r/2, this.r);
    // rect(this.r/2, this.r*2, this.r/2, this.r);

    // // Rocket body
    // fill(175);
    // beginShape(TRIANGLES)
    // vertex(0, -this.r*2)
    // vertex(-this.r, this.r*2)
    // vertex(this.r, this.r*2)
    // endShape()

    // pop();
  }

  highlight() {
    stroke(0);
    line(this.position.x, this.position.y, target.position.x, target.position.y);
    fill(255, 0, 0, 100);
    ellipse(this.position.x, this.position.y, 16);
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  isStopped() {
    return this.stopped
  }
}