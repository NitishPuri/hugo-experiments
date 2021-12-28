
let grid_size = 5;
let half_grid = Math.ceil(grid_size / 2)

let params = {
  filling: 2,
  fillingTypes: {
    Random: 0,
    Statistical: 2
  },
  chanceOfBlock: 0.5,
  chanceOfAccent: 0.2,
  speed: 1,
  minInvaderSize: 20,
  maxInvaderSize: 500,
  c: 1.25,
  margin: 2,
  play: true,
  background_color: [255, 255, 255],
  block_color: [0, 0, 0],
  accent_color: [255, 0, 0],
  interactive: true,
  reset() {
    invaders = []
    counter = 1
    frame_counter = 0
    background(params.background_color)
    stroke(params.accent_color)
    calcIntialArea()
  }
}

let invaders = []
let counter = 1
let frame_counter = 0

let initial_area = 0;

function setup() {
  createCanvasCustom();

  let gui = new dat.GUI();
  gui.add(params, 'filling', params.fillingTypes)
  gui.add(params, 'speed').min(1).max(100).step(1)
  gui.add(params, 'minInvaderSize').min(10).max(100).step(5)
  gui.add(params, 'maxInvaderSize').min(100).max(600).step(5)
  gui.add(params, 'margin').min(0).max(10).step(1)
  gui.add(params, 'c').min(1).max(2).step(0.01)
  gui.add(params, 'interactive')
  const cf = gui.addFolder("Colors")
  cf.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  cf.add(params, 'chanceOfAccent').min(0).max(1).step(0.05)
  cf.addColor(params, 'background_color')
  cf.addColor(params, 'block_color')
  cf.addColor(params, 'accent_color')
  gui.add(params, 'play')
  gui.add(params, 'reset')

  calcIntialArea();

  frameRate(10)
}

function calcIntialArea() {
  let total_area = width * height;

  let zeta = 0;
  for (let i = 1; i <= 1000; i++) {
    zeta += pow(i, -params.c);
  }

  console.log(`zeta = ${zeta}`)

  initial_area = total_area / zeta;
  console.log(`Initial Area :: ${initial_area} , Initial Size :: ${sqrt(initial_area)}`)
}


function draw() {

  for (let i = 0; i < params.speed; i++) {
    createInvader();
  }

  if (params.interactive) {
    background(params.background_color)
    invaders.forEach(invader => invader.draw());
    if (params.play && frameCount % 10 == 0) {
      invaders.forEach(invader => invader.randomize());
    }
  }
}

