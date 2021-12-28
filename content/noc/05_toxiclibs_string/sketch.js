let physics;

let p1;
let p2;

function setup() {
  var canvas = createCanvasCustom();

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  // Make two particles
  p1 = new Particle(new Vec2D(width / 2, 20));
  p2 = new Particle(new Vec2D(width / 2 + 160, 20));

  // Lock one in place.
  p1.lock();

  // Make a spring connecting both particles.
  var spring = new VerletSpring2D(p1, p2, 160, 0.01);

  // Anything we make, we have to add into the physics world.
  physics.addParticle(p1);
  physics.addParticle(p2);
  physics.addSpring(spring);
}

function draw() {
  physics.update();

  background(51);

  stroke(200);
  strokeWeight(2);
  fill(255);
  line(p1.x, p1.y, p2.x, p2.y);

  p1.display();
  p2.display();

  if (mouseIsPressed) {
    p2.lock();
    p2.x = mouseX;
    p2.y = mouseY;
    p2.unlock();
  }


}