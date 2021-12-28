class DNA {
  constructor(newGenes) {
    this.maxForce = 0.1;

    this.genes = []
    if (newGenes) {
      this.genes = newGenes
    }
    else {
      for (var i = 0; i < lifetime; i++) {
        var angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(this.maxForce));
      }
    }

    this.genes[0].normalize();
  }

  crossover(partner) {
    var child = new Array(this.genes.length)
    var midpoint = floor(random(this.genes.length));
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child[i] = this.genes[i];
      else child[i] = partner.genes[i]
    }

    const newGene = new DNA(child);
    return newGene;
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        var angle = random(TWO_PI);
        this.genes[i] = createVector(cos(angle), sin(angle));
        this.genes[i].mult(random(this.maxForce));
        if (i == 0) this.genes[i].normalize();
      }
    }
  }


}