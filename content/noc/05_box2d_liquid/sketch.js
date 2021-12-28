// a reference to our box2d world
var world;

var boundaries = [];
var systems = [];

var params = {
  // wind: 0,
  // gravity: 0.1,
  // mouseAction : 0,
  // environment : 0,
  reset: function () {
    systems.forEach(ps => ps.destroy());
    systems = [];
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // world = createWorld(new box2d.b2Vec2(0, 0));
  world = createWorld();
  // world.SetGravity(-20);

  // Add boundaries
  boundaries.push(new Boundary(width / 3, 2 * height / 4, width / 2, 5, -3.0));
  boundaries.push(new Boundary(2 * width / 3, height / 4, width / 3, 5, -0.5));


  var gui = new dat.GUI();
  // gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'mouseAction', {Add : 0, Push : 1});
  // gui.add(params, 'environment', {Boundary : 0, Surface : 1});
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  systems.forEach(ps => {
    ps.run();
    const n = floor(random(0, 3));
    ps.addParticles(n);
  });

  boundaries.forEach(b => b.display());
}

function mousePressed() {
  systems.push(new ParticleSystem(0, createVector(mouseX, mouseY)));
}
