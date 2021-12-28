class Cell {
  constructor(x_, y_, w_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.xOff = this.w / 2;
    this.yOff = sin(radians(60)) * this.w;
    const s = floor(random(3));
    this.state = s
    // this.colors = []
    // this.colors.push(color(gray, [alpha]))
    // this.state = 0;
    this.nextState = s
  }

  display() {
    push();
    // fill(this.state*255);

    // if(this.state != this.nextState) {
    // this.state = this.nextState
    // }

    if (this.state == 0) {
      fill(0)
    }
    else if (this.state == 1) {
      fill(255, 255, 0)
    }
    else {
      fill(255, 0, 0)
    }
    noStroke()
    translate(this.x, this.y);
    beginShape();
    vertex(0, this.yOff);
    vertex(this.xOff, 0);
    vertex(this.xOff + this.w, 0);
    vertex(2 * this.w, this.yOff);
    vertex(this.xOff + this.w, 2 * this.yOff);
    vertex(this.xOff, 2 * this.yOff);
    vertex(0, this.yOff);
    endShape();
    pop();
  }
}