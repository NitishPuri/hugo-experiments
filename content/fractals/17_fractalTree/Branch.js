class Branch {
  constructor(parent, p, dir) {
    this.position = p
    this.parent = parent
    this.direction = dir;
    this.len = 5;

    this.origDir = this.direction.copy();

    this.count = 0;
  }

  reset() {
    this.direction = this.origDir.copy();
    this.count = 0;
  }

  next() {
    var nextDirection = p5.Vector.mult(this.direction, this.len);
    var nextPosition = p5.Vector.add(this.position, nextDirection);
    var nextBranch = new Branch(this, nextPosition, this.direction.copy());

    return nextBranch;
  }

  show(sw) {
    if (this.parent != null) {
      // noStroke();
      // fill(255, 0, 0);
      // ellipse(this.position.x, this.position.y, 5, 4)
      stroke(255);
      strokeWeight(sw);
      line(this.position.x, this.position.y, this.parent.position.x, this.parent.position.y);
    }
  }
}