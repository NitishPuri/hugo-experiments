let physics;

let cluster;

let params = {
  showPhysics: true,
  showParticles: true,
  newGraph: function () {
    if (!this.showParticles && !this.showPhysics) {
      this.showParticles = true;
    }
    physics.clear();
    cluster = new Cluster(floor(random(2, 20)), random(10, height - 100),
      new Vec2D(width / 2, height / 2));
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // Initialize the physics
  physics = new VerletPhysics2D();
  // physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  cluster = new Cluster(8, 100, new Vec2D(width / 2, height / 2));

  var gui = new dat.GUI();
  gui.add(params, 'showPhysics');
  gui.add(params, 'showParticles');
  gui.add(params, 'newGraph');
}

function draw() {
  physics.update();

  background(51);

  if (params.showParticles) {
    cluster.display();
  }

  if (params.showPhysics) {
    cluster.showConnections();
  }
}
