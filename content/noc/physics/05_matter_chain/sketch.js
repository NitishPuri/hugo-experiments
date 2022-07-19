// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Constraint = Matter.Constraint,
  MouseConstraint = Matter.MouseConstraint,
  Mouse = Matter.Mouse,
  Bodies = Matter.Bodies;

// create an engine
var engine;
var world;
var circles = []
var constraints = [];
var mConstraint;

var boundaries = [];

function setup() {
  var canvas = createCanvasCustom();
  engine = Engine.create();
  world = engine.world;

  let options = {
    isStatic: true,
  }
  boundaries.push(new Box(width / 2, height - 20, width, 20, 5, options))

  var prev = null;
  for (let x = 20; x < 600; x += 30) {
    var fixed = false;
    if (!prev) {
      fixed = true;
    }
    p = new Particle(width / 2 + x, 50, 10, fixed);
    circles.push(p);
    if (prev) {
      let options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 20,
        stiffness: 0.5
      }
      var c = Constraint.create(options);
      constraints.push(c);
      World.add(world, c);

    }
    prev = p
  }

  var cMouse = Mouse.create(canvas.elt);
  cMouse.pixelRatio = pixelDensity();
  options = {
    mouse: cMouse
  }
  mConstraint = new MouseConstraint.create(engine, options);
  World.add(world, mConstraint);

  Engine.run(engine);
}

function draw() {

  // Engine.update(engine);

  background(51);
  constraints.forEach(c => {
    stroke(200);
    strokeWeight(2)
    line(c.bodyA.position.x, c.bodyA.position.y,
      c.bodyB.position.x, c.bodyB.position.y, )
  })

  circles.forEach(b => b.show());
  boundaries.forEach(b => b.show());

  if (mConstraint.body) {
    const m = mConstraint.mouse.position;
    const p = mConstraint.body.position;
    const o = mConstraint.constraint.pointB;
    stroke(0, 255, 0);
    line(m.x, m.y, p.x + o.x, p.y + o.y);
  }


  // line(circles[0].x)
}

// function mouseDragged() {
//   const options = {
//     friction : 0.2,
//     restitution : 0.8
//   }

//   boxes.push(new Box(mouseX, mouseY, random(20, 40), random(20, 40), 10, options));
// }