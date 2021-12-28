class Population {
  constructor(m, num) {
    this.mutationRate = m;
    this.population = new Array(num);
    this.matingPool = [];
    this.generations = 0;
    for (let i = 0; i < num; i++) {
      const position = createVector(width / 2, height + 20);
      this.population[i] = new Rocket(position, new DNA(), this.population.length);
    }
  }

  live(t, os) {
    this.population.forEach(p => {
      p.checkTarget(t);
      p.run(os);
    })
  }

  targetReached() {
    this.population.forEach(p => {
      if (p.hitTarget) return true;
    })

    return false;
  }

  fitness() {
    this.population.forEach(p => p.calcFitness())
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
      var m = floor(random(this.matingPool.length));
      var d = floor(random(this.matingPool.length));

      const mom = this.matingPool[m];
      const dad = this.matingPool[d];

      const momGenes = mom.getDNA();
      const dadGenes = dad.getDNA();

      const child = momGenes.crossover(dadGenes);
      child.mutate(this.mutationRate);

      const position = createVector(width / 2, height + 20);
      this.population[i] = new Rocket(position, child);
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