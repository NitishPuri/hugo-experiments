class Flock {
  constructor() { this.boids = [] }
  run() { this.boids.forEach(b => b.run(this.boids)) }
  addBoid(b) { this.boids.push(b) }
}