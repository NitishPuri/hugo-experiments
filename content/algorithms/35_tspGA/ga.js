function calcFitness() {
  population.forEach((p, i) => {
    let currentRecord = Infinity
    const d = calcDistance(cities, p)
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = p
      console.log(recordDistance, frameCount)
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = p
    }
    fitness[i] = (1 / (d + 1))
  })
}

function normalizeFitness() {
  let sum = fitness.reduce((p, c) => p + c)
  fitness.forEach((f, i) => fitness[i] = f / sum);
}

function nextGeneration() {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    let orderA = pickOne(population, fitness)
    let orderB = pickOne(population, fitness)
    let order = crossover(orderA, orderB)
    mutate(order, 0.01)
    newPopulation.push(order);
  }
  population = newPopulation
}

function pickOne(list, prob) {
  // console.log(list.length, prob.length)
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - prob[index]
    index++
  }
  index--
  return list[index].slice();
}

function mutate(order, mutationRate) {
  for (let i = 0; i < total; i++) {
    if (random(1) < mutationRate) {
      var indexA = floor(random(order.length));
      var indexB = (indexA + 1) % total
      swap(order, indexA, indexB)
    }
  }
}

function crossover(a, b) {
  let start = floor(random(a.length));
  let end = floor(random(start + 1, a.length));
  let newOrder = a.slice(start, end);
  b.forEach(c => {
    if (!newOrder.includes(c)) {
      newOrder.push(c);
    }
  })

  return newOrder;
}