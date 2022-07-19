
// const BLOCK_SIZE = 360;
const PIXEL_SIZE = 50;
const GRID_SIZE = 5;
const HALF_GRID = Math.ceil(GRID_SIZE / 2);
const MARGIN = 20;
// let chanceOfBlock = 0.5

let params = {
  chanceOfBlock: 0.5,
  chanceOfRed: 0.2,
}

let invaders = [];
let invader;

function setup() {
  createCanvasCustom();
  stroke(0);
  fill(0);

  let gui = new dat.GUI();
  gui.add(params, 'chanceOfBlock').min(0).max(1).step(0.05)
  gui.add(params, 'chanceOfRed').min(0).max(1).step(0.05)

  let block = PIXEL_SIZE * GRID_SIZE + 2 * MARGIN;
  let width_offset = (width % block) / 2;
  let height_offset = (height % block) / 2;
  let x_count = floor(width / block);
  let y_count = floor(height / block);

  for (let i = 0; i < x_count; i++) {
    for (let j = 0; j < y_count; j++) {
      invaders.push(new Invader(width_offset + i * block, height_offset + j * block, PIXEL_SIZE))
    }
  }

  frameRate(1)
}


function draw() {
  background(0);

  invaders.forEach((invader) => {
    invader.randomize()
    invader.draw()
  })
}

