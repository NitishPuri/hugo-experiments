class Liquid {
  constructor(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.drag = c;
  }

  contains(m) {
    var l = m.pos;
    return (l.x > this.x && l.x < this.x + this.w &&
      l.y > this.y && l.y < this.y + this.h);
  }

  // Calculate the drag force
  calculateDrag(m) {
    var f = m.vel.copy();
    f.normalize();
    f.mult(-1 * this.drag * m.vel.magSq());
    return f;
  }

  render() {
    noStroke();
    fill(50);
    rect(this.x, this.y, this.w, this.h);
  }
}