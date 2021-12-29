class Boundary {
  constructor(x, y, w, h) {
    var options = {
      friction : 0.2,
      restitution : 0.9,
      isStatic: true
    }
    this.w = w;
    this.h = h;

    this.body = Bodies.rectangle(x, y, w, h, options);
    World.add(world, this.body);

    this.body.label = 'boundary';
  }

  show() {
    const pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    fill(200);
    stroke(0);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}