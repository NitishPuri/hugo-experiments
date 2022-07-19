// a reference to our box2d world
var world;

var bridge;
let particles = [];

var params = {
  // wind: 0,
  // gravity: 0.1,
  // attachToMouse : false,
  reset: function () {
    particles.forEach(p => p.killBody());
    particles = [];
    // boundaries = [];
    // systems = [];
    // systems.push(new ParticleSystem(width/2, height - 50, img));
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // world = createWorld(new box2d.b2Vec2(0, 0));
  world = createWorld();

  bridge = new Bridge(width, width / 10);

  params.reset();

  const gui = new dat.GUI();
  // gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'attachToMouse');
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  if (mouseIsPressed) {
    particles.push(new Particle(mouseX, mouseY, random(4, 8)));
  }


  // var gravity = createVector(0,params.gravity);
  // var wind = createVector(params.wind, 0);
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.display();
    if (p.done()) {
      particles.splice(i, 1);
    }
  }

  bridge.display();

}
