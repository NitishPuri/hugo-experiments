class Leaf {
  constructor() {
    this.position = createVector(random(width), random(height - 200))
    this.reached = false;
  }

  show() {
    fill(255);
    noStroke();
    ellipse(this.position.x, this.position.y, 10);
  }
}