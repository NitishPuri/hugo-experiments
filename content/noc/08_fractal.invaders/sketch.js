
let grid_size = 5;
let half_grid = Math.ceil(grid_size / 2)

let params = {
  chanceOfBlock: 0.5,
  chanceOfRed: 0.2,
  minDivisionSize: 40,
  maxTries: 50,
  minInvaderSize: 20,
  maxInvaderSize: 500,
  margin: 2,
  play: true,
  background_color: [255, 255, 255],
  block_color: [0, 0, 0],
  accent_color: [255, 0, 0],
  reset() {
    invaders = []
    new_invaders = []
    createInvader(0, 0, width, height)
  }
}

// let invader;
let invaders = []
let new_invaders = []

let counter = 0;

function setup() {
  createCanvasCustom();
  stroke(0);
  fill(0);

  let gui = new dat.GUI();
  gui.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  gui.add(params, 'chanceOfRed').min(0).max(1).step(0.05)
  gui.add(params, 'minDivisionSize').min(10).max(100).step(5)
  gui.add(params, 'maxTries').min(10).max(100).step(5)
  gui.add(params, 'minInvaderSize').min(10).max(100).step(5)
  gui.add(params, 'maxInvaderSize').min(200).max(600).step(5)
  const cf = gui.addFolder("Colors")
  cf.addColor(params, 'background_color')
  cf.addColor(params, 'block_color')
  cf.addColor(params, 'accent_color')
  gui.add(params, 'play')
  gui.add(params, 'reset')

  params.reset();

  frameRate(1)
}


function draw() {
  background(params.background_color)

  invaders.forEach(invader => invader.draw());

  if (params.play && frameCount % 1 == 0) {
    invaders.forEach(invader => invader.randomize());
  }

  if (new_invaders.length > 0) {
    let new_invader = new_invaders.shift();
    new_invader.createChildren();
  }
}

