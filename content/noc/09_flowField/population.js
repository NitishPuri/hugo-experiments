class Population {
  constructor(m, num) {
    this.mutationRate = m;
    this.population = new Array(num);
    this.matingPool = [];
    this.generations = 0;
    for (let i = 0; i < num; i++) {
      this.population[i] = new Rocket(start.position, new DNA(dnasize));
    }

    this.order = 1;

  }

  live(os) {
    var record = 100000;
    var closest;

    this.population.forEach(p => {
      if (p.finished()) {
        p.setFinish(this.order);
        this.order++;
      }
      p.run(os);
      if (p.recordDist < record) {
        record = p.recordDist
        closest = p
      }
    })

    closest.highlight()
    if (debug) {
      closest.dna.drawDebug();
    }
  }

  targetReached() {
    this.population.forEach(p => {
      if (p.finished()) return true;
    })

    return false;
  }

  calcFitness() {
    this.population.forEach(p => p.calcFitness())
    this.order = 1;
  }

  selection() {
    this.matingPool = [];

    let totalFitness = this.getTotalFitness();
    let avgFitness = totalFitness / this.population.length;

    this.population.forEach(p => {
      const fitnessNormal = p.getFitness() / totalFitness;

      var n = floor(fitnessNormal * 50000);
      for (let i = 0; i < n; i++) {
        this.matingPool.push(p)
      }
    })
  }

  reproduction() {
    for (let i = 0; i < this.population.length; i++) {
      const momGenes = random(this.matingPool).getDNA();
      const dadGenes = random(this.matingPool).getDNA();

      const child = momGenes.crossover(dadGenes);
      child.mutate(this.mutationRate);

      this.population[i] = new Rocket(start.position, child);
    }

    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  getTotalFitness() {
    let total = 0;
    this.population.forEach(p => total += p.getFitness())
    return total;
    // return this.population.reduce((m, p) => (m + p.getFitness()), 0);
  }
}