// a reference to our box2d world
var world;

let car;
let surface;

let params = {
  reset() {
    car.destroy();
    car = new Car(width / 2, 120);
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // world = createWorld(new box2d.b2Vec2(0, 0));
  world = createWorld();

  surface = new Surface();
  car = new Car(width / 2, 120);

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

  surface.display();
  car.display();

  // noLoop();
}
