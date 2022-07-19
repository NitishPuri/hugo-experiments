let physics;

let blanket;


let params = {
  len: 10,
  strength: 0.125,
  generate: function () {
    physics.clear();
    blanket = new Blanket(params.len, params.strength);
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  params.generate();

  var gui = new dat.GUI();
  gui.add(params, 'len').min(5).max(30).step(1);
  gui.add(params, 'strength').min(0.01).max(1).step(0.01);
  gui.add(params, 'generate');
}

function draw() {
  physics.update();

  background(51);

  blanket.display();
}
