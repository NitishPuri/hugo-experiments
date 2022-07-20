const createInvader = () => {

  frame_counter++;
  if (frame_counter > 1000) {
    frame_counter = 0;
    counter++;
  }

  let size = 0;
  let invader_to_add = undefined;

  if (params.filling == params.fillingTypes.Random) {
    size = floor(random(params.minInvaderSize, params.maxInvaderSize))
  }
  else if (params.filling == params.fillingTypes.Statistical) {
    let area_new = initial_area * pow(counter, -params.c);
    size = sqrt(area_new);
  }

  // console.log(`Size::${size}`)
  let attempts = 0;

  while (attempts++ < 1000) {
    let x = random(width);
    let y = random(height);

    let new_invader = new Invader(x, y, size)

    if (x + size > width || y + size > height) {
      continue;
    }

    let intersects = false;
    for (invader of invaders) {
      if (invader.intersect(new_invader)) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      invader_to_add = new_invader
      break;
    }
  }

  if (invader_to_add) {
    invader_to_add.randomize();
    if (!params.interactive) {
      invader_to_add.draw();
    }
    invaders.push(invader_to_add)
    counter++;
    frame_counter--;
  }
}

class Invader {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size

    this.blockSize = (this.size - 2 * params.margin) / grid_size
  }

  intersect(invader) {
    if (this.x > invader.x + invader.size || invader.x > this.x + this.size)
      return false;

    if (this.y > invader.y + invader.size || invader.y > this.y + this.size)
      return false;

    return true;
  }

  randomize() {
    this.cells = Array(grid_size * half_grid).fill().map(() => {
      if (random(1) < params.chanceOfBlock) {
        if (random(1) < params.chanceOfAccent) {
          return 2;
        }
        return 1;
      }
      return 0;
    });
  }
  draw() {
    push()
    translate(this.x + params.margin, this.y + params.margin)
    for (let j = 0; j < grid_size; j++) {
      for (let i = 0; i < grid_size; i++) {
        let index = ((i > half_grid - 1) ? (grid_size - 1 - i) : i) + j * half_grid;
        if (this.cells[index] > 0) {
          fill(params.block_color)
          if (this.cells[index] > 1)
            fill(params.accent_color)
          rect(i * this.blockSize, j * this.blockSize, this.blockSize, this.blockSize);
        }
      }
    }
    pop()
  }
}
