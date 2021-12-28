class Rocket {
  constructor(pos, dna) {
    this.acceleration = createVector();
    this.velocity = createVector();
    this.position = pos.copy();
    this.r = 4;
    this.dna = dna;

    this.finishTime = 0;
    this.recordDist = 100000;

    this.fitness = 0;
    this.geneCounter = 0;
    this.hitObstacle = false;
    this.hitTarget = false;
  }

  calcFitness() {
    if (this.recordDist < 1) this.recordDist = 1;

    this.fitness = (1 / (this.finishTime * this.recordDist));

    this.fitness = pow(this.fitness, 4);

    if (this.hitObstacle) this.fitness *= 0.1;
    if (this.hitObstacle) this.fitness *= 2;
  }

  run(os) {
    if (!this.hitObstacle && !this.hitTarget) {
      this.applyForce(this.dna.genes[this.geneCounter]);
      this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
      this.update();
      this.obstacles(os);
    }

    if (!this.hitObstacle) {
      this.display()
    }
  }

  checkTarget(target) {
    var d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
    if (d < this.recordDist) this.recordDist = d;

    if (target.contains(this.position) && !this.hitTarget) {
      this.hitTarget = true;
    }
    else if (!this.hitTarget) {
      this.finishTime++;
    }
  }

  obstacles(os) {
    os.forEach(obs => {
      if (obs.contains(this.position)) {
        this.hitObstacle = true;
      }
    })
  }

  applyForce(f) {
    this.acceleration.add(f)
  }

  update() {
    this.velocity.add(this.acceleration);
    this.acceleration.mult(0);
    this.position.add(this.velocity);
  }

  display() {
    var theta = this.velocity.heading() + PI / 2;
    fill(200);
    stroke(0);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);

    // Thrusters
    rectMode(CENTER);
    fill(0);
    rect(-this.r / 2, this.r * 2, this.r / 2, this.r);
    rect(this.r / 2, this.r * 2, this.r / 2, this.r);

    // Rocket body
    fill(175);
    beginShape(TRIANGLES)
    vertex(0, -this.r * 2)
    vertex(-this.r, this.r * 2)
    vertex(this.r, this.r * 2)
    endShape()

    pop();
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  stopped() {
    return this.hitObstacle
  }
}