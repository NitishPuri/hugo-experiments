class Particle {
  constructor(x, y, rad, fixed) {
    this.hue = random(360);
    var options = {
      friction: 0.2,
      restitution: random(0.5, 0.9),
      isStatic: fixed,
      density: 1
    }
    this.rad = rad;
    this.fixed = fixed


    if (!fixed) {
      x += random(-50, 50);
    }

    this.body = Bodies.circle(x, y, rad, options);
    World.add(world, this.body);

    if (fixed) {
      this.body.label = 'plinko';
    }
    else {
      this.body.label = 'particle';
    }

  }

  show() {
    const pos = this.body.position;
    push();
    translate(pos.x, pos.y);
    fill(this.hue, 255, 255);
    if (this.fixed) fill(0, 255, 0);
    stroke(this.hue, 0, 0);
    ellipse(0, 0, this.rad * 2);
    pop();
  }

  isOffScreen() {
    const p = this.body.position;
    const buffer = 50;
    return (p.x > (width + buffer) || p.x < -buffer || p.y > height + buffer);
  }
}