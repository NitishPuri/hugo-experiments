class ParticleSystem {
  constructor(num, v) {
    this.particles = []
    this.origin = v.copy();

    this.addParticles(num);
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      if (p.done()) {
        this.particles.splice(i, 1);
      }
      else {
        p.display();
      }
    }
  }

  addParticles(n) {
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(this.origin.x, this.origin.y, 0.2));
    }
  }

  destroy() {
    this.particles.forEach(p => p.killBody());
  }
}