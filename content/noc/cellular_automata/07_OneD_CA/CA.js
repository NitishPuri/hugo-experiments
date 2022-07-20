class CA {
  constructor(r) {
    this.w = 10
    this.cols = floor(width / this.w);
    this.rows = floor(height / this.w);
    this.matrix = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.matrix[i] = new Array(this.rows);
    }

    this.ruleset = r;

    this.restart();
  }

  restart() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j] = 0;
      }
    }

    this.matrix[floor(this.cols / 2)][0] = 1;
    this.generation = 0;
  }

  randomize() {
    for (let i = 0; i < 8; i++) {
      this.ruleset[i] = Math.floor(random(2));
    }
    // console.log(this.ruleset)
  }

  generate() {
    // let nextGen = new Array(this.cells.length)
    // for(let i = 0; i < this.cells.length; i++) {
    //   nextGen[i] = 0
    // }

    // console.log(this.cells)

    for (let i = 0; i < this.cols; i++) {
      const left = this.matrix[(i + this.cols - 1) % this.cols][this.generation % this.rows];
      const me = this.matrix[i][this.generation % this.rows];
      const right = this.matrix[(i + 1) % this.cols][this.generation % this.rows];

      // const left  = this.cells[i-1]
      // const me    = this.cells[i]
      // const right = this.cells[i+1]
      this.matrix[i][(this.generation + 1) % this.rows] = this.rules(left, me, right);
    }
    this.generation++;
  }

  display() {
    const offset = this.generation % this.rows;
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        var y = j - offset;
        if (y <= 0) y = this.rows + y;
        if (this.matrix[i][j] == 1) {
          fill(255);
          noStroke();
          rect(i * this.w, (y - 1) * this.w, this.w, this.w);
        }
      }
    }
  }

  rules(l, m, r) {
    const i = 7 - (l * 4 + m * 2 + r);
    return this.ruleset[i];
  }
}