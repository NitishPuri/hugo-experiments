// Series of connected springs.
class Chain {
  constructor(l, n, r, s) {
    // super(pos);    
    // This is redundant since we can ask for physics.particles,
    // but in case we have many of these, it's conveninent to 
    // keep track of your own list.
    this.particles = [];

    // Chain properties
    this.totalLength = l;
    this.numPoints = n;
    this.radius = r;
    this.strength = s;

    const len = this.totalLength / this.numPoints;

    // Here is the real work, go through and add particles to the chain itself.
    for (let i = 0; i < this.numPoints; i++) {
      // Make a new particle with an initial string location.
      const particle = new Particle(width / 2, i * len);

      // Redundancy, we put the particles both in physics and in our own list.
      physics.addParticle(particle);
      this.particles.push(particle);

      // Connect the particles with a Spring
      if (i != 0) {
        const previous = this.particles[i - 1];
        const spring = new VerletSpring2D(particle, previous, len, this.strength);
        physics.addSpring(spring);
      }
    }

    // Keep the top fixed.
    this.particles[0].lock();

    // Explicit reference to the tail.
    this.tail = this.particles[this.numPoints - 1];
    this.tail.radius = this.radius;

    // Some variables for mouse dragging.
    this.offset = createVector();
    this.dragged = false;
  }

  contains(x, y) {
    const d = dist(x, y, this.tail.x, this.tail.y);
    if (d < this.radius) {
      this.offset.x = this.tail.x - x;
      this.offset.y = this.tail.y - y;
      this.tail.lock();
      this.dragged = true;
    }
  }

  release() {
    this.tail.unlock();
    this.dragged = false;
  }

  updateTail(x, y) {
    if (this.dragged) {
      this.tail.set(x + this.offset.x, y + this.offset.y);
    }
  }

  display() {

    beginShape();
    noFill();
    stroke(200);
    strokeWeight(2);
    this.particles.forEach(p => vertex(p.x, p.y));
    ellipse(this.x, this.y, 32, 32);
    endShape();

    this.tail.display();
  }
}