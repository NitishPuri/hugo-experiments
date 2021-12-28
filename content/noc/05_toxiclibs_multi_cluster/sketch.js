let physics;

let clusters = [];

let params = {
  showPhysics: true,
  showParticles: true,
  newGraph: function () {
    if (!this.showParticles && !this.showPhysics) {
      this.showParticles = true;
    }
    physics.clear();
    clusters = [];
    for (let i = 0; i < 8; i++) {
      const center = new Vec2D(width / 2, height / 2);
      clusters.push(new Cluster(floor(random(3, 10)),
        random(30, 200), center));

    }

    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        clusters[i].connect(clusters[j]);
      }
    }
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // Initialize the physics
  physics = new VerletPhysics2D();
  // physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  params.newGraph();

  var gui = new dat.GUI();
  gui.add(params, 'showPhysics');
  gui.add(params, 'showParticles');
  gui.add(params, 'newGraph');
}

function draw() {
  physics.update();

  background(51);

  if (params.showParticles) {
    clusters.forEach(c => c.display());
  }

  let i = 0;
  if (params.showPhysics) {
    for (let i = 0; i < clusters.length; i++) {
      clusters[i].showConnections();
      for (let j = i + 1; j < clusters.length; j++) {
        clusters[i].showConnectionsWith(clusters[j]);
      }
    }
  }
}
