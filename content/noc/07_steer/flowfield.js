class Flowfield {
  constructor(r) {
    this.resolution = r;
    this.cols = width / this.resolution;
    this.rows = height / this.resolution;
    this.zoff = 0;

    this.field = this.make2Darray(this.cols);
    this.init();
  }

  make2Darray(n) {
    var array = [];
    for (let i = 0; i < n; i++) {
      array[i] = [];
    }
    return array;
  }

  init() {
    noiseSeed(Math.floor(random(10000)));
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let theta = map(noise(xoff, yoff, this.zoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  update() {
    // noiseSeed(Math.floor(random(10000)));
    this.zoff += 0.1;
    let xoff = 0;
    for (let i = 0; i < this.cols; i++) {
      let yoff = 0;
      for (let j = 0; j < this.rows; j++) {
        let theta = map(noise(xoff, yoff, this.zoff), 0, 1, 0, TWO_PI);
        this.field[i][j] = createVector(cos(theta), sin(theta));
        yoff += 0.1;
      }
      xoff += 0.1;
    }
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        const r = this.resolution;
        this.drawVector(this.field[i][j], i * r, j * r, r - 2);
      }
    }
  }

  lookup(lookup) {
    const r = this.resolution;
    const column = Math.floor(constrain(lookup.x / r, 0, this.cols - 1));
    const row = Math.floor(constrain(lookup.y / r, 0, this.rows - 1));
    return this.field[column][row].copy();
  }

  drawVector(v, x, y, s) {
    push();
    const arrowSize = 4;
    translate(x, y);
    stroke(200, 100);
    rotate(v.heading());
    const len = v.mag() * s;
    line(0, 0, len, 0);
    line(len, 0, len - arrowSize, arrowSize / 2);
    line(len, 0, len - arrowSize, -arrowSize / 2);
    pop();
  }
}