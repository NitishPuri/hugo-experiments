class Connection extends VerletSpring2D {
  constructor(p1, p2, length, strength) {
    super(p1, p2, length, strength);
  }

  display() {
    stroke(200);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}