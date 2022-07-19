// Force directed graph!!
class Cluster {
  constructor(n, d, center) {
    this.nodes = [];
    this.diameter = d;

    // Create nodes
    for (let i = 0; i < n; i++) {
      this.nodes.push(new Node(center.add(Vec2D.randomVector())));
    }

    // Connect the nodes with a spring.
    for (let i = 0; i < n - 1; i++) {
      for (let j = i + 1; j < n; j++) {
        physics.addSpring(new VerletSpring2D(this.nodes[i], this.nodes[j],
          this.diameter, 0.01));
      }
    }
  }

  display() {
    this.nodes.forEach(n => n.display());
  }

  showConnections() {
    stroke(255, 150);
    strokeWeight(2);
    const n = this.nodes.length;
    for (let i = 0; i < n - 1; i++) {
      const n1 = this.nodes[i];
      for (let j = i + 1; j < n; j++) {
        const n2 = this.nodes[j];
        line(n1.x, n1.y, n2.x, n2.y);
      }
    }
  }

}