let systems = [];
let img;

var params = {
  wind: 0,
  gravity: 0.1,
  attachToMouse: false,
  reset: function () {
    systems = [];
    systems.push(new ParticleSystem(width / 2, height - 50));
  }
}

function preload() {
  img = loadImage('texture.png');
}

function setup() {
  var canvas = createCanvasCustom();

  params.reset();

  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  gui.add(params, 'attachToMouse');
  gui.add(params, 'reset');
}

function draw() {
  background(0);

  // var gravity = createVector(0,params.gravity);
  var wind = createVector(params.wind, 0);
  for (var ps of systems) {
    ps.addParticle();
    // ps.applyForce(gravity);
    ps.applyForce(wind);
    ps.run();
  }

  if (params.attachToMouse) {
    systems[0].origin.x = mouseX;
    systems[0].origin.y = mouseY;
  }
}
