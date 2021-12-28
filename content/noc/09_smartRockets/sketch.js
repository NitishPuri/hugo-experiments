var lifetime;
var population;

var lifecycle;
var recordTime;

var target;
var obstacles = [];

function setup() {
  createCanvasCustom();
  lifetime = 300;
  lifecycle = 0;
  recordTime = lifetime;

  target = new Obstacle(width / 2 - 12, 24, 24, 24);

  var mutationRate = 0.01;
  population = new Population(mutationRate, 50);

  obstacles = [];
  obstacles.push(new Obstacle(width / 2 - 100, height / 2, 200, 10));
}

function draw() {
  background(127);
  target.display();

  if (lifecycle < lifetime) {
    population.live(target, obstacles);
    if ((population.targetReached()) && (lifecycle < recordTime)) {
      recordTime = lifecycle;
    }
    lifecycle++;
  }
  else {
    lifecycle = 0;
    population.fitness();
    population.selection();
    population.reproduction();
  }

  obstacles.forEach(o => o.display());

  fill(0);
  noStroke();
  text("Generation # " + population.getGenerations(), 10, 10)
  text("Cycles left: " + (lifetime - lifecycle), 10, 36)
  text("Record cycles : " + recordTime, 10, 54)

}

function mousePressed() {
  target.position.x = mouseX;
  target.position.y = mouseY;
  recordTime = lifetime;
}