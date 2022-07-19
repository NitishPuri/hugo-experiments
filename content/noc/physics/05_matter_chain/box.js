class Box {
  constructor(x, y, w, h, rad, options) {
    this.w = w;
    this.h = h;
    this.rad = rad;

    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);
  }

  show() {
    const pos = this.body.position;
    const angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h, this.rad, this.rad, this.rad, this.rad);
    pop();
  }
}