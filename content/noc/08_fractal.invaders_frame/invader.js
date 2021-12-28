class Invader {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size
    this.randomize()
    // setInterval(this.randomize(), 2000)
  }
  randomize() {
    this.cells = Array(GRID_SIZE * HALF_GRID).fill().map(() => {
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
    translate(this.x + MARGIN, this.y + MARGIN)
    for (let j = 0; j < GRID_SIZE; j++) {
      for (let i = 0; i < GRID_SIZE; i++) {
        let index = ((i > HALF_GRID - 1) ? (GRID_SIZE - 1 - i) : i) + j * HALF_GRID;
        if (this.cells[index] > 0) {
          fill(0, 255, 0)
          if (this.cells[index] > 1)
            fill(255, 0, 0)
          rect(i * this.size, j * this.size, this.size, this.size);
        }
      }
    }
    pop()
  }
}
