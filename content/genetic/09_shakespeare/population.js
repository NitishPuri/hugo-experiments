// A class to describe the virtual population of organisms.
class Population {
  constructor(p, m, num) {
    this.population = [];     // the current population
    this.matingPool = [];     // The mating pool.
    this.generations = 0;     // Number of generations
    this.finished = false;    // Are we finished evolving.
    this.target = p;          // Target phrase.
    this.mutationRate = m;    // Mutation rate
    this.perfectScore = 1;

    this.best = '';

    for (var i = 0; i < num; i++) {
      this.population[i] = new DNA(this.target.length);
    }

    this.calcFitness();
  }

  calcFitness() {
    this.population.forEach(p => p.calcFitness(this.target))
  }

  naturalSelection() {
    this.matingPool = [];
    var maxFitness = 0;

    this.population.forEach(p => maxFitness = Math.max(maxFitness, p.fitness))

    this.population.forEach(p => {
      var f = map(p.fitness, 0, maxFitness, 0, 1);
      var n = floor(f * 100);
      for (var j = 0; j < n; j++) {
        this.matingPool.push(p);
      }
    })
  }

  generate() {
    // console.log(this.matingPool.length)
    for (let i = 0; i < this.population.length; i++) {
      var a = floor(random(this.matingPool.length));
      var b = floor(random(this.matingPool.length));
      var partnerA = this.matingPool[a];
      var partnerB = this.matingPool[b];
      var child = partnerA.crossover(partnerB);
      this.population[i] = child;
    }
    this.generations++;
  }

  getBest() {
    return this.best;
  }

  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord == this.perfectScore) {
      this.finished = true;
    }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations
  }

  getAverageFitness() {
    var total = this.population.reduce((sum, p) => sum + p.fitness, 0);
    return total / this.population.length;
  }

  allPhrases() {
    var everything = '';
    var displayLimit = min(this.population.length, 50);
    for (var i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + '<br>';
    }

    return everything;
  }
}