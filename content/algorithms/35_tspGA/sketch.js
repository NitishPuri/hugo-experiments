let cities = []
let total = 15;

let recordDistance = Infinity;
let bestEver;
let currentBest;

let population = []
let fitness = []
let popCount = 500;

function setup() {
  createCanvasCustom({
    statsFunc: () =>
      "FPS : " + floor(frameRate()) + " Cost : " + floor(recordDistance)
  });

  let order = []
  for (let i = 0; i < total; i++) {
    cities.push(createVector(random(width), random(height)))
    order.push(i);
  }

  for (let i = 0; i < popCount; i++) {
    population[i] = shuffle(order)
  }

  // frameRate(5)
}

function draw() {
  background(0);

  // GA
  calcFitness()
  normalizeFitness()
  nextGeneration()


  fill(255);
  cities.forEach(c => ellipse(c.x, c.y, 8, 8))

  stroke(255, 0, 255, 200);
  strokeWeight(4);
  noFill()
  beginShape()
  bestEver.forEach(o => vertex(cities[o].x, cities[o].y));
  endShape(CLOSE)

  stroke(255);
  strokeWeight(2);
  noFill()
  beginShape()
  currentBest.forEach(o => vertex(cities[o].x, cities[o].y));
  endShape(CLOSE)

  // translate(0, height / 2)
}

function swap(a, i, j) {
  let temp = a[i];
  a[i] = a[j]
  a[j] = temp
}

function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length; i++) {
    const pA = points[order[i]]
    const pB = points[order[(i + 1) % order.length]]
    sum += dist(pA.x, pA.y, pB.x, pB.y)
  }
  return sum
}
