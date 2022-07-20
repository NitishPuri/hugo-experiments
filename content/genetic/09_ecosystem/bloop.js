class Bloop {
  constructor(pos, dna) {
    this.position = pos.copy();
    this.health = 200
    this.xoff = random(1000);
    this.yoff = random(1000)
    this.dna = dna;

    this.maxspeed = map(this.dna.genes[0], 0, 1, 15, 0)
    this.r = map(this.dna.genes[0], 0, 1, 0, 50);
  }

  run() {
    this.update();
    this.borders();
    this.display();
  }

  eat(f) {
    var food = f.getFood();
    for (let i = food.length - 1; i >= 0; i--) {
      var foodLocation = food[i];
      const d = p5.Vector.dist(this.position, foodLocation);
      if (d < this.r / 2) {
        this.health += 100;
        food.splice(i, 1);
      }
    }
  }

  reproduce() {
    if (random(1) < 0.0005) {
      var childDNA = this.dna.copy();
      childDNA.mutate(0.01);
      return new Bloop(this.position, childDNA);
    }
    else {
      return null;
    }
  }

  update() {
    var vx = map(noise(this.xoff), 0, 1, -this.maxspeed, this.maxspeed)
    var vy = map(noise(this.yoff), 0, 1, -this.maxspeed, this.maxspeed)
    var velocity = createVector(vx, vy)

    this.xoff += 0.01;
    this.yoff += 0.01;

    this.position.add(velocity)
    this.health -= 0.2;
  }

  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > this.width + this.r) this.position.x = -this.r;
    if (this.position.y > this.height + this.r) this.position.y = -this.r;
  }

  display() {
    ellipseMode(CENTER);
    stroke(0, this.health);
    fill(0, this.health);
    ellipse(this.position.x, this.position.y, this.r, this.r);
  }

  dead() {
    return this.health < 0.0
  }
}