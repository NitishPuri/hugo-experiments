class Blanket {
  constructor(len, strength) {
    this.particles = [];
    this.springs = [];
    this.zoff = 0;

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

    this.particles[0].lock();
    this.particles[4].lock();
    this.particles[9].lock();
    this.particles[14].lock();
    this.particles[19].lock();
  }

  display() {
    // this.springs.forEach(c => c.display());

    // translate(x, y, [z])

    stroke(255)
    noFill()
    // noStroke()
    // textureMode(NORMAL)
    // let y = 0
    let yoff = 0;
    for (let y = 0; y < h - 1; y++) {
      beginShape(TRIANGLE_STRIP)
      texture(pimg)
      for (let x = 0; x < w; x++) {
        let xoff = 0;

        let windx = map(noise(xoff, yoff, this.zoff), 0, 1, -3, 3);
        let windy = map(noise(xoff + 5000, yoff + 5000, this.zoff), 0, 1, -0.5, 0.5);
        let wind = createVector(windx, windy)

        wind.setMag(params.wind)

        let p1 = this.particles[x + y * w];
        let p2 = this.particles[x + (y + 1) * w];

        p1.addForce(wind)

        let u = map(x, 0, w - 1, 0, 1)
        let v1 = map(y, 0, h - 1, 0, 1)
        let v2 = map(y + 1, 0, h - 1, 0, 1)

        let z = 0

        vertex(p1.x, p1.y, z, u, v1)
        vertex(p2.x, p2.y, z, u, v2)
        xoff += 0.1
      }
      endShape()
      yoff += 0.1
    }
    this.zoff += 0.01
  }
}