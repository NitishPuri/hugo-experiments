var population;
var info;

function setup() {
  // createCanvasCustom();
  createCanvas(800, 124)
  colorMode(RGB, 1.0, 1.0, 1.0, 1.0)
  var popmax = 10
  var mutationRate = 0.05;
  population = new Population(mutationRate, popmax);

  createDiv('<br>')

  var button = createButton("evolve new generation")
  button.mousePressed(nextGen);
  // button.position(10, 140);
  info = createDiv('')
  // info.position(10, 75)
}

function draw() {
  background(1);
  population.display()
  population.rollover(mouseX, mouseY);
  info.html("Generation #: " + population.getGenerations());
}

function nextGen() {
  population.selection();
  population.reproduction();
}
