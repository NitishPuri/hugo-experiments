var world;

function setup() {
  createCanvasCustom();
  world = new World(20);
}

function draw() {
  background(175);
  world.run()
}

function mousePressed() {
  world.born(mouseX, mouseY)
}

function mouseDragged() {
  world.born(mouseX, mouseY)
}