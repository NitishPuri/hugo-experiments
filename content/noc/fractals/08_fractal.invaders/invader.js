const createInvader = (x, y, w, h) => {

  if (w < params.minDivisionSize || h < params.minDivisionSize) {
    return
  }

  let n_x = floor(random(w));
  let n_y = floor(random(h));
  let n_size = floor(random(min(params.maxInvaderSize, w - n_x, h - n_y)))

  let tries = 0;
  while (n_size < params.minInvaderSize && tries < params.maxTries) {
    n_x = floor(random(w));
    n_y = floor(random(h));
    n_size = floor(random(min(params.maxInvaderSize, w - n_x, h - n_y)))
    tries++
  }

  if (tries >= params.maxTries) {
    return
  }

  let new_invader = new Invader(x, y, w, h, n_x, n_y, n_size)
  new_invader.randomize()

  invaders.push(new_invader)
  new_invaders.push(new_invader)
}

class Invader {
  constructor(x, y, w, h, pos_x, pos_y, size) {
    this.x = x + pos_x;
    this.y = y + pos_y;
    this.size = size

    this.blockSize = (this.size - 2 * params.margin) / grid_size

    this.createChildren = () => {
      createInvader(x, y, pos_x + this.size, pos_y)
      createInvader(x, this.y, pos_x, h - pos_y)
      createInvader(this.x, this.y + this.size, w - pos_x, h - pos_y - this.size)
      createInvader(this.x + this.size, y, w - pos_x - this.size, pos_y + this.size)
    }
  }
  randomize() {
    this.cells = Array(grid_size * half_grid).fill().map(() => {
      if (random(1) < params.chanceOfBlock) {
        if (random(1) < params.chanceOfRed) {
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
