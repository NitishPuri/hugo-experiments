let created_shapes = [];
let counter;
let frame_counter;
let initial_area;

const shapes = {
  selected_shape: 3,
  current_shape: undefined,
  names: {
    Circle: 0,
    Square: 1,
    Rectangle: 2,
    'Rectangle Tilted': 3,
    'Eq.Triangle': 4,
    'Eq.Triangle Inverted': 5,
  },
  classes: [
    circle,
    (a) => rectangle(a),
    (a) => rectangle(a, random(0.75, 1.3)),
    (a) => rectangle(a, 1, PI / 4),
    (a) => triangle(a, false),
    (a) => triangle(a, random(1) > 0.5),
  ]
}

const params = {
  filling: 2,
  fillingTypes: {
    Random: 0,
    Statistical: 2
  },
  chanceOfBlock: 0.5,
  chanceOfAccent: 0.2,
  speed: 1,
  minSize: 20,
  maxSize: 500,
  c: 1.25,
  margin: 2,
  play: true,
  background_color: [255, 255, 255],
  block_color: [0, 0, 0],
  accent_color: [255, 0, 0],
  interactive: false,
  rainbow: true,
  reset() {
    created_shapes = []
    counter = 2
    frame_counter = 0
    shapes.current_shape = shapes.classes[shapes.selected_shape]
    noStroke()
    if (params.rainbow) {
      colorMode(HSB, 100, 100, 100, 100)
      background(0, 0, 100)
    }
    else {
      colorMode(RGB, 255, 255, 255, 255)
      background(params.background_color)
      fill(params.block_color)
    }
    calcIntialArea()
  }
}

function setup() {
  createCanvasCustom();

  let gui = new dat.GUI();
  gui.add(params, 'filling', params.fillingTypes)
  gui.add(shapes, 'selected_shape', shapes.names).name('shape')
  gui.add(params, 'speed').min(1).max(100).step(1)
  gui.add(params, 'minSize').min(10).max(100).step(5)
  gui.add(params, 'maxSize').min(100).max(600).step(5)
  gui.add(params, 'margin').min(0).max(10).step(1)
  gui.add(params, 'c').min(1).max(2).step(0.01)
  gui.add(params, 'interactive')
  gui.add(params, 'rainbow')
  const cf = gui.addFolder("Colors")
  cf.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  cf.add(params, 'chanceOfAccent').min(0).max(1).step(0.05)
  cf.addColor(params, 'background_color')
  cf.addColor(params, 'block_color')
  cf.addColor(params, 'accent_color')
  gui.add(params, 'reset')

  frameRate(10);

  params.reset();
}

function calcIntialArea() {
  const total_area = width * height;

  let zeta = 0;
  for (let i = counter; i <= 1000; i++) {
    zeta += pow(i, -params.c);
  }

  // console.log(`zeta = ${zeta}`)

  initial_area = total_area / zeta;
  // console.log(`Initial Area :: ${initial_area} , Initial Size :: ${sqrt(initial_area)}`)
}

function draw() {
  for (let i = 0; i < params.speed; i++) { createShape(); }
}

function mousePressed() {

  if (!params.interactive)
    return

  let index_to_remove = -1;
  for (let i = 0; i < created_shapes.length; i++) {
    let shape = created_shapes[i];
    if (shape.contains(mouseX, mouseY)) {
      created_shapes.splice(i, 1);
      shape.clear()
      break;
    }
  }
}