class GOL {
  constructor(r) {
    this.w = 10
    this.h = sin(radians(60)) * this.w;
    this.cols = floor(width / this.w * 3);
    this.rows = floor(height / this.h);
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
        if (j % 2 == 0) this.board[i][j] = new Cell(i * this.w * 3, j * this.h, this.w);
        else this.board[i][j] = new Cell(i * this.w * 3 + this.w + this.h / 2, j * this.h, this.w);
      }
    }
  }

  generate() {

    // console.log("Tick!!")

    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        let neighbors = this.getNeighbors(x, y);

        // Rules of life!!
        // if((this.board[x][y].state == 1) && (neighbors < 2)) nextGen[x][y].state = 0;       // Loneliness
        // else if((this.board[x][y].state == 1) && (neighbors > 4)) nextGen[x][y].state = 0;  // Overpopulation
        // else if((this.board[x][y].state == 0) && (neighbors == 3)) nextGen[x][y].state = 1; // Birth
        // // else if((this.board[x][y].state == 0) && (neighbors == 4)) nextGen[x][y].state = 1; // Birth
        // else    nextGen[x][y].state = this.board[x][y].state;                                  // Stasis  


        // Rules of Hex Life
        if ((this.board[x][y].state == 0) && (neighbors == 4)) {
          this.board[x][y].nextState = 1;
        }
        else if ((this.board[x][y].state == 1) && (neighbors >= 1) && (neighbors <= 4)) {
          this.board[x][y].nextState = 2;
        }
        else if ((this.board[x][y].state == 1) && (neighbors == 6)) {
          this.board[x][y].nextState = 2;
        }
        else if ((this.board[x][y].state == 2) && (neighbors == 1)) {
          this.board[x][y].nextState = 2;
        }
        else if ((this.board[x][y].state == 2) && (neighbors == 2)) {
          this.board[x][y].nextState = 2;
        }
        else if ((this.board[x][y].state == 2) && (neighbors == 4)) {
          this.board[x][y].nextState = 1;
        }
        else {
          this.board[x][y].nextState = 0;
        }
      }
    }

    this.board.forEach(br => br.forEach(c => c.state = c.nextState));
  }

  getNeighbors(x, y) {
    let sum = 0;
    (y - 1 + this.rows) % this.rows
    if (y % 2 == 1) {
      sum += this.board[x][(y + 1 + this.rows) % this.rows].state
      sum += this.board[x][(y - 1 + this.rows) % this.rows].state

      sum += this.board[x][(y + 2 + this.rows) % this.rows].state
      sum += this.board[x][(y - 2 + this.rows) % this.rows].state

      sum += this.board[(x + 1 + this.cols) % this.cols][(y - 1 + this.rows) % this.rows].state
      sum += this.board[(x + 1 + this.cols) % this.cols][(y + 1 + this.rows) % this.rows].state
    }
    else {
      sum += this.board[x][(y + 1 + this.rows) % this.rows].state
      sum += this.board[x][(y - 1 + this.rows) % this.rows].state

      sum += this.board[(x + 1 + this.cols) % this.cols][(y + 2 + this.rows) % this.rows].state
      sum += this.board[(x + 1 + this.cols) % this.cols][(y - 2 + this.rows) % this.rows].state

      sum += this.board[(x + 1 + this.cols) % this.cols][(y - 1 + this.rows) % this.rows].state
      sum += this.board[(x + 1 + this.cols) % this.cols][(y + 1 + this.rows) % this.rows].state
    }

    return sum;


  }

  debug() {
    let x = 11;
    let y = 14;
    // this.board[x][y].state = 3;

    if (y % 2 == 1) {
      this.board[x][y + 1].state = 1
      this.board[x][y - 1].state = 1

      this.board[x][y + 2].state = 1
      this.board[x][y - 2].state = 1

      this.board[x + 1][y - 1].state = 1
      this.board[x + 1][y + 1].state = 1
    }
    else {
      this.board[x][y + 1].state = 1
      this.board[x][y - 1].state = 1

      this.board[x + 1][y + 2].state = 1
      this.board[x + 1][y - 2].state = 1

      this.board[x + 1][y - 1].state = 1
      this.board[x + 1][y + 1].state = 1
    }


    // for(let i = -1; i <= 1; i++) {
    //   for(let j = -1; j <= 1; j++) {
    //     neighbors += this.board[(x+i+this.cols)%this.cols][(y+j+this.rows)%this.rows];
    //   }
    // }

  }

  display() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        // this.board[i][j].display();
        if (this.board[i][j].state > 0) {
          this.board[i][j].display();
        }
      }
    }
  }
}