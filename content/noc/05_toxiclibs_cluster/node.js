class Node extends VerletParticle2D {
  constructor(pos) {
    super(pos);
  }

  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x, this.y, 16);
  }
}