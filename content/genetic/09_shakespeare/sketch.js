var target;
var popmax;
var mutationRate;
var population;

var bestPhrase;
var allPhrases;
var stats;

var params = {
  popmax: 300,
  mutationRate: 0.01,
  target: "To be or not to be.",
  reset: function () {
    population = new Population(this.target, this.mutationRate, this.popmax)
    loop();
  }
}

function setup() {
  noCanvas();
  bestPhrase = createP("Best Phrase : ")
  bestPhrase.class("best");

  allPhrases = createP("All Phrases :")
  allPhrases.class("all");

  stats = createP("Stats")
  stats.class('stats');

  var gui = new dat.GUI()
  gui.add(params, 'popmax').min(10).max(10000)
  gui.add(params, 'mutationRate').min(0).max(1)
  gui.add(params, 'target')
  gui.add(params, 'reset')

  params.reset();
}

function draw() {
  population.naturalSelection()
  population.generate();
  population.calcFitness();

  population.evaluate();
  if (population.isFinished()) {
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  var answer = population.getBest();
  bestPhrase.html("Best Phrase : <br>" + answer);

  var statstext = "total generations :    " + population.getGenerations() + "<br>"
  statstext += "average fitness :      " + nf(population.getAverageFitness()) + "<br>"
  statstext += "total population :     " + params.popmax + "<br>"
  statstext += "mutation rate :        " + floor(params.mutationRate * 100) + "%"

  stats.html(statstext);

  allPhrases.html("All phrases:<br>" + population.allPhrases())
}