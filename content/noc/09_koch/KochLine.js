class KochLine {
  constructor(a, b) {
    this.start = a.copy();
    this.end = b.copy();
  }

  display() {
    stroke(255);
    line(this.start.x, this.start.y, this.end.x, this.end.y);
  }

  kochA() {
    return this.start.copy()
  }

  kochB() {
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    v.add(this.start);
    return v;
  }

  kochC() {
    var a = this.start.copy();
    var v = p5.Vector.sub(this.end, this.start);
    v.div(3);
    a.add(v);
    v.rotate(-PI / 3);
    a.add(v);
    return a;
  }

  kochD() {
    var v = p5.Vector.sub(this.end, this.start);
    v.mult(2 / 3.0);
    v.add(this.start);
    return v;
  }

  kochE() {
    return this.end.copy();
  }
}