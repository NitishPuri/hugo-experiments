class DNA {
  constructor(newGenes) {
    this.maxForce = 0.1;

    this.genes = []
    if (newGenes) {
      this.genes = newGenes
    }
    else {
      for (var i = 0; i < 1; i++) {
        this.genes[i] = random(0, 1)
      }
    }
  }

  copy() {
    var newGenes = [];
    this.genes.forEach(g => newGenes.push(g))
    return new DNA(newGenes)
  }

  mutate(m) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
        this.genes[i] = random(0, 1);
      }
    }
  }
}