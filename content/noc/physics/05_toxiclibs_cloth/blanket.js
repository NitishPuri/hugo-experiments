class Connection extends VerletSpring2D {
  constructor(p1, p2, length, strength) {
    super(p1, p2, length, strength);
  }

  display() {
    stroke(200);
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }
}

class Particle extends VerletParticle2D {
  constructor(pos) {
    super(pos);
  }

  display() {
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(this.x, this.y, 16);
  }
}

class Blanket {
  constructor(len, strength) {
    this.particles = [];
    this.springs = [];

    const w = 20;
    const h = 20;

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const p = new Particle(new Vec2D(width / 2 + x * len - w * len / 2, 100 + y * len));
        physics.addParticle(p);
        this.particles.push(p);

        if (x > 0) {
          const prev = this.particles[this.particles.length - 2];
          const c = new Connection(p, prev, len, strength);
          this.springs.push(c);
          physics.addSpring(c);
        }

        if (y > 0) {
          const above = this.particles[this.particles.length - w - 1];
          const c = new Connection(p, above, len, strength);
          this.springs.push(c);
          physics.addSpring(c);
        }
      }
    }

    const topLeft = this.particles[0];
    topLeft.lock();

    const topRight = this.particles[w - 1];
    topRight.lock();
  }

  display() {
    this.springs.forEach(c => c.display());
  }
}