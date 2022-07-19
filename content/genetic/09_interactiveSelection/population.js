class Population {
  constructor(m, num) {
    this.mutationRate = m;
    this.population = []
    this.matingPool = [];
    this.generations = 0;
    for (let i = 0; i < num; i++) {
      this.population[i] = new Face(new DNA(), 50 + i * 75, 60);
    }
  }

  display() {
    this.population.forEach(p => p.display());
  }

  rollover(mx, my) {
    this.population.forEach(p => p.rollover(mx, my));
  }

  selection() {
    this.matingPool = [];

    let maxFitness = this.getMaxFitness();

    this.population.forEach(p => {
      const fitnessNormal = map(p.getFitness(), 0, maxFitness, 0, 1);
      var n = floor(fitnessNormal * 100);
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

      const position = createVector(width / 2, height + 20);
      this.population[i] = new Face(child, 50 + i * 75, 60);
    }

    this.generations++;
  }

  getGenerations() {
    return this.generations;
  }

  getMaxFitness() {
    var record = this.population.reduce((m, p) => max(m, p.getFitness()), 0);
    return record;
  }
}