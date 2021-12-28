class Particle extends VerletParticle2D {
  constructor(pos) {
    super(pos);
    this.radius = 4;
  }
  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x, this.y, this.radius * 2);
  }
}