class Particle {
  constructor(x, y, rad, fixed, options) {
    options = {
      friction: 0.2,
      restitution: 0.9,
      isStatic: fixed
    }
    this.rad = rad;

    this.body = Bodies.circle(x, y, rad, options);
    World.add(world, this.body);
  }

  show() {
    const pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    ellipse(0, 0, this.rad * 2);
    pop();
  }

  isOffScreen() {
    return (this.body.position.y > (height + 100));
  }
}