let physics;

let blanket;
// let particles = [];

let pimg;

const w = 20;
const h = 20;

function preload() {
  pimg = loadImage(resolveUrl('/data/tex/l_8_f_14.jpg'),
    () => console.log("Image loaded"),
    () => console.log("Image load failed"))
}

// let res = 1;
// let cols, rows;

let params = {
  len: 30,
  strength: 0.125,
  wind: 0,
  generate: function () {
    physics.clear();
    blanket = new Blanket(params.len, params.strength);
  }
}

function setup() {
  var canvas = createCanvasCustom({ renderer: WEBGL });

  // Initialize the physics
  physics = new VerletPhysics2D();
  physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));

  // Set world's bounding box.
  physics.setWorldBounds(new Rect(0, 0, width, height));

  params.generate();

  var gui = new dat.GUI();
  gui.add(params, 'len').min(5).max(30).step(1);
  gui.add(params, 'strength').min(0.01).max(1).step(0.01);
  gui.add(params, 'wind').min(0).max(2).step(0.1);
  gui.add(params, 'generate');
}

function draw() {
  physics.update();

  stroke(255);
  fill(255);
  // sphere(20)

  translate(-width / 2, -height / 2, 0)

  background(51);

  blanket.display();
}
