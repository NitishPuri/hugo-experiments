class DNA {
  constructor(newGenes) {
    var len = 20;

    this.genes = []
    if (newGenes) {
      this.genes = newGenes
    }
    else {
      for (var i = 0; i < len; i++) {
        this.genes[i] = random(0, 1)
      }
    }
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
        this.genes[i] = random(0, 1)
      }
    }
  }
}