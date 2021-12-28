class Path {
  constructor() {
    this.radius = 20;
    this.points = [];
    this.start = createVector(0, height / 3);
    this.end = createVector(width, 2 * height / 3);
  }

  addPoint(x, y) { this.points.push(createVector(x, y)) }
  getStart() { return this.points[0] }
  getEnd() { return this.points[this.points.length - 1] }

  display() {
    stroke(99);
    strokeWeight(this.radius * 2);
    // stroke(200, 100);
    noFill();
    beginShape();
    this.points.forEach(p => vertex(p.x, p.y))
    endShape();

    strokeWeight(1);
    stroke(255);
    beginShape();
    this.points.forEach(p => vertex(p.x, p.y))
    endShape();
  }
}