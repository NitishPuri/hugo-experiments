class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);
    this.pz = this.z;

    this.c = map(this.z, 0, width, 0, 100);
    //this.c = map(this.x, 0, width, 0, 100);
  }

  update() {
    this.z -= params.speed;
    if (this.z < 1) {
      this.reset();
    }
  }

  show() {
    // fill(255);

    fill(this.c, 100, 100, 100);
    noStroke();
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);


    const r = map(this.z, 0, width, 16, 0)
    ellipse(sx, sy, r)

    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);

    stroke(this.c, 100, 100, 100);
    // stroke(255);
    line(px, py, sx, sy);

    this.pz = this.z;
  }
}