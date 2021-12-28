let physics;

let chain;

function setup() {
  var canvas = createCanvasCustom();

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  chain = new Chain(180, 20, 16, 0.2);
}

function draw() {
  physics.update();

  background(51);

  chain.updateTail(mouseX, mouseY);
  chain.display();
}

function mousePressed() {
  chain.contains(mouseX, mouseY);
}

function mouseReleased() {
  chain.release();
}