// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

// create an engine
var engine;
var world;
var boxes = [];
var circles = []

var boundaries = [];

function setup() {
  var canvas = createCanvasCustom();
  engine = Engine.create();
  world = engine.world;

  var options = {
    isStatic: true,
    angle: PI / 8
  }
  boundaries.push(new Box(width / 4, height - 200, width / 2, 20, 5, options))
  options.angle = -PI / 8;
  boundaries.push(new Box(width * 0.65, height - 300, width / 2, 20, 5, options))

  // Engine.run(engine);
}

function draw() {

  Engine.update(engine);

  const options = {
    friction: 0.2,
    restitution: 0.8
  }
  circles.push(new Circle(width - 250, 50, random(5, 10), options));

  background(51);
  boxes.forEach(b => b.show());
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i];
    c.show();
    if (c.isOffScreen()) {
      World.remove(world, c.body);
      circles.splice(i--, 1);
    }
  }
  boundaries.forEach(b => b.show());


}

function mouseDragged() {
  const options = {
    friction: 0.2,
    restitution: 0.8
  }

  boxes.push(new Box(mouseX, mouseY, random(20, 40), random(20, 40), 10, options));
}