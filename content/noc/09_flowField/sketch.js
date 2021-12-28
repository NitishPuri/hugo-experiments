var gridscale = 30;
var dnasize;

var lifetime;

var population;
var lifecycle;
var recordTime;

var target;
var start;
var diam = 24;
var obstacles = [];

var debug = false;
var newObstacle = null;

function setup() {
  createCanvasCustom();
  // info = createP('')
  dnasize = floor(width / gridscale) * floor(height / gridscale);
  lifetime = width / 3
  lifetime = 300;
  lifecycle = 0;
  recordTime = lifetime;

  target = new Obstacle(width - diam - diam / 2, height / 2 - diam / 2, diam, diam);
  start = new Obstacle(diam / 2, height / 2 - diam / 2, diam, diam);

  var popmax = 500;
  var mutationRate = 0.02;
  population = new Population(mutationRate, popmax);

  obstacles = [];
  // obstacles.push(new Obstacle(width/2 - 100, height/2, 200, 10));
}

function draw() {
  background(210);
  target.display();
  obstacles.forEach(o => o.display());

  if (lifecycle < lifetime) {
    population.live(obstacles);
    if ((population.targetReached()) && (lifecycle < recordTime)) {
      recordTime = lifecycle;
    }
    lifecycle++;
  }
  else {
    lifecycle = 0;
    population.calcFitness();
    population.selection();
    population.reproduction();
  }

  if (newObstacle != null) {
    newObstacle.display();
  }


  fill(0);
  noStroke();
  text("Generation # " + population.getGenerations(), 10, 10)
  text("Cycles left: " + (lifetime - lifecycle), 10, 36)
  text("Record cycles : " + recordTime, 10, 54)

}

function keyPressed() {
  if (key === 'd' || key === 'D') {
    debug = !debug;
  }
}

function mousePressed() {
  newObstacle = new Obstacle(mouseX, mouseY, 0, 0);
}

function mouseDragged() {
  newObstacle.w = mouseX - newObstacle.position.x;
  newObstacle.h = mouseY - newObstacle.position.y;
}

function mouseReleased() {
  obstacles.push(newObstacle);
  newObstacle = null;
}

