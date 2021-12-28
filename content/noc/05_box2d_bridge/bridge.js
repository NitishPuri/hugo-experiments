class Bridge {
  constructor(l, n) {
    this.totalLength = l;
    this.numPoints = floor(n);
    this.particles = [];

    const len = l / n;

    console.log(n);
    for (let i = 0; i < this.numPoints + 1; i++) {
      let p;
      if (i == 0 || i == this.numPoints) p = new Particle(i * len, height / 4, 4, true);
      else p = new Particle(i * len, height / 4, 4, false);

      this.particles.push(p);

      if (i > 0) {
        const djd = new box2d.b2DistanceJointDef();
        const prev = this.particles[i - 1];
        djd.bodyA = prev.body;
        djd.bodyB = p.body;
        djd.length = scaleToWorld(len);
        djd.frequencyHz = 0;
        djd.dampingRatio = 0;

        const dj = world.CreateJoint(djd);
      }
    }
  }

  // Draw the boundary.
  display() {
    this.particles.forEach(p => p.display());
  }
}