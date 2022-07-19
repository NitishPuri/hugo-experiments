class DNA {
  constructor(num) {

    this.genes = []
    if (num instanceof Array) { // Genes are passed
      this.genes = num
    }
    else {
      for (var i = 0; i < num; i++) {
        this.genes[i] = p5.Vector.random2D()
      }
    }
  }

  crossover(partner) {
    var child = []
    var midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child[i] = this.genes[i];
      else child[i] = partner.genes[i]
    }
    return new DNA(child);
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = p5.Vector.random2D()
      }
    }
  }

  drawDebug() {
    const cols = floor(width / gridscale)
    const rows = floor(height / gridscale)

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.drawVector(this.genes[i + j * cols], i * gridscale, j * gridscale, gridscale - 2);
      }
    }
  }

  drawVector(v, x, y, scayl) {
    push();
    translate(x + gridscale / 2, y);
    stroke(100);
    rotate(v.heading())
    var len = v.mag() * scayl;
    line(-len / 2, 0, len / 2, 0);
    pop()
  }
}