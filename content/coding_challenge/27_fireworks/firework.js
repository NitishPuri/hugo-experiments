class Firework {
  constructor() {
    this.hue = random(255);
    this.firework = new Particle(random(width), height, this.hue, true)
    this.exploded = false;
    this.particles = []
  }
  update() {
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        // console.log("Explode!!")
        // this.firework = null;
        this.exploded = true;
        this.explode()
      }
    }
    else {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i]
        p.applyForce(gravity)
        p.update()
        if (p.done()) {
          pCount--
          this.particles.splice(i, 1)
        }
      }
    }

  }
  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    else {
      this.particles.forEach(p => p.show())
    }
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hue)
      this.particles.push(p);
    }
  }
  done() {
    return (this.exploded && (this.particles.length == 0))
  }
}