class GOL {
  constructor(r) {
    this.w = 8
    this.cols = floor(width / this.w);
    this.rows = floor(height / this.w);
    this.board = new Array(this.cols);
    for (let i = 0; i < this.cols; i++) {
      this.board[i] = new Array(this.rows);
    }

    // this.ruleset = r;  

    this.init();
  }

  init() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.board[i][j] = Math.floor(random(2));
      }
    }
  }

  generate() {
    let nextGen = new Array(this.cols)
    for (let i = 0; i < this.cols; i++) {
      nextGen[i] = new Array(this.rows);
    }

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let neighbors = 0;

        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += this.board[(x + i + this.cols) % this.cols][(y + j + this.rows) % this.rows];
          }
        }
        neighbors -= this.board[x][y];

        // Rules of life!!
        if ((this.board[x][y] == 1) && (neighbors < 2)) nextGen[x][y] = 0;       // Loneliness
        else if ((this.board[x][y] == 1) && (neighbors > 3)) nextGen[x][y] = 0;  // Overpopulation
        else if ((this.board[x][y] == 0) && (neighbors == 3)) nextGen[x][y] = 1; // Birth
        else nextGen[x][y] = this.board[x][y];                                  // Stasis  
      }
    }

    this.board = nextGen;
  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.board[i][j] == 1) {
          fill(255);
          noStroke();
          rect(i * this.w, j * this.w, this.w, this.w, 2, 2, 2, 2);
        }
      }
    }
  }
}