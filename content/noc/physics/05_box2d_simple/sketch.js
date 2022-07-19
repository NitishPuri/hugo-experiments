// a reference to our box2d world
var world;

var boundaries = [];
let surface;
var windmill;
// A list of our boxes
let boxes = [];

// for mouse joint
let spring;

var params = {
  // wind: 0,
  // gravity: 0.1,
  mouseAction: 0,
  environment: 0,
  reset: function () {
    for (let i = 0; i < boxes.length; i++) {
      boxes[i].killBody();
    }
    boxes = [];
    boxes.push(new Box(width / 2, height / 2, 20, 20));
    spring = new Spring();
    // boundaries = []
    // boundaries = [];
    // systems = [];
    // systems.push(new ParticleSystem(width/2, height - 50, img));
  }
}

function setup() {
  var canvas = createCanvasCustom();

  // world = createWorld(new box2d.b2Vec2(0, 0));
  world = createWorld();

  // Add boundaries
  // boundaries.push(new Boundary(width/4, height-5, width/2 - 50, 10));
  // boundaries.push(new Boundary(3*width/4, height-50, width/2 - 50, 10));
  boundaries.push(new Boundary(width / 2, 5, width, 10));
  boundaries.push(new Boundary(width - 5, height / 2, 10, height));
  boundaries.push(new Boundary(5, height / 2, 10, height));

  surface = new Surface();

  // windmill = new Windmill(width/2, 300);

  params.reset();

  var gui = new dat.GUI();
  // gui.add(params, 'wind').min(-0.05).max(0.05).step(0.01);
  // gui.add(params, 'gravity').min(-0.05).max(0.05).step(0.01);
  gui.add(params, 'mouseAction', { Add: 0, Pull: 1, Attract: 2 });
  gui.add(params, 'environment', { Boundary: 0, Surface: 1 });
  gui.add(params, 'reset');
}

function draw() {
  background(255);

  var timeStep = 1.0 / 30;
  world.Step(timeStep, 10, 10);

  spring.update(mouseX, mouseY);

  if (mouseIsPressed) {
    if (params.mouseAction == 0) {
      // boxes.push(new Pair(mouseX, mouseY));

      let p = random(1);
      let t = 1 / 5;
      if (p < t) {

        let w = random([4, 8, 12]);
        let h = random([4, 8, 12]);
        boxes.push(new Box(mouseX, mouseY, w, h));
      }
      else if (p < 2 * t) {
        boxes.push(new Circle(mouseX, mouseY, random(8, 16)));
      }
      else if (p < 3 * t) {
        boxes.push(new CustomShape(mouseX, mouseY));
      }
      else if (p < 4 * t) {
        boxes.push(new Pair(mouseX, mouseY));
      }
      else {
        boxes.push(new Lollipop(mouseX, mouseY));
      }
    }
    else if (params.mouseAction == 2) {
      console.log("Attraction,.!!!")
      boxes.forEach(b => b.attract(mouseX, mouseY))
    }
  }

  boundaries.forEach(b => b.display());

  // var gravity = createVector(0,params.gravity);
  // var wind = createVector(params.wind, 0);
  for (let i = boxes.length - 1; i >= 0; i--) {
    boxes[i].display();
    if (boxes[i].done()) {
      boxes.splice(i, 1);
    }
  }

  spring.display();
  surface.display();

  // windmill.display();
}

function mouseReleased() {
  if (params.mouseAction === '1') {
    // console.log("destroy spring/..")
    spring.destroy()
  }
}

function mousePressed() {
  if (params.mouseAction == 1) {
    for (let box of boxes) {
      if (box instanceof Pair) {   // Special handling of Pair object
        if (box.p1.contains(mouseX, mouseY)) {
          spring.bind(mouseX, mouseY, box.p1.body);
          break;
        }
        else if (box.p2.contains(mouseX, mouseY)) {
          spring.bind(mouseX, mouseY, box.p2.body);
          break;
        }
      }
      else if (box.contains(mouseX, mouseY)) {
        spring.bind(mouseX, mouseY, box.body);
        break;
      }
    }
  }
}

function keyPressed() {
  if (key === ' ') {
    // windmill.toggleMotor();
  }
}
