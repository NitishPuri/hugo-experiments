

let w = 4;
let cols;
let rows;

let board, prevBoard;

// let colors = {
//   0: [255, 255, 255],
//   1: [0, 191, 255],
//   2: [255, 215, 0],
//   3: [176, 48, 96]
// }

let colors = {
  0: [255, 255, 0],
  1: [0, 185, 63],
  2: [0, 104, 255],
  3: [122, 0, 229],
  length: 4
}

let population = [];

function initBoard() {
  board = new Array(cols);
  prevBoard = new Array(cols);
  for (let i = 0; i < cols; i++) {
    board[i] = new Array(rows);
    prevBoard[i] = new Array(rows);
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = 0;
      prevBoard[i][j] = 1;
    }
  }
}

function drawBoard() {
  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      if (board[i][j] == prevBoard[i][j]) {
        continue;
      }
      let c;
      if (board[i][j] < colors.length) {
        c = colors[board[i][j]]
      } else {
        c = [255, 0, 0]
      }
      fill(c[0], c[1], c[2]);
      // fill(color(255, 10, 255));
      rect(i * w, j * w, w, w);

      prevBoard[i][j] = board[i][j];
    }
  }
}

function updateBoard() {
  let newBoard = new Array(cols);
  for (let i = 0; i < cols; ++i) {
    newBoard[i] = new Array(rows);
    for (let j = 0; j < rows; ++j) {
      let n = board[i][j];
      if (n < 4) {
        newBoard[i][j] = n;
      }
      else {
        newBoard[i][j] = n - 4;
      }
    }
  }

  for (let i = 0; i < cols; ++i) {
    for (let j = 0; j < rows; ++j) {
      let n = board[i][j];
      if (n >= 4) {
        // newBoard[i][j] += (n - 4);
        if (i + 1 < cols)
          newBoard[i + 1][j]++;
        if (i - 1 >= 0)
          newBoard[i - 1][j]++;
        if (j + 1 < rows)
          newBoard[i][j + 1]++;
        if (j - 1 > 0)
          newBoard[i][j - 1]++;
      }
    }
  }

  board = newBoard;
}

function setup() {
  createCanvasCustom()
  // colorMode(HSB);

  cols = floor(width / w);
  rows = floor(height / w);

  noStroke();

  initBoard();

  // drop a million sands into the center of the pile!  
  board[floor(cols / 2)][floor(rows / 2)] = 1000000000;
}

function draw() {

  // background(0);

  for (let i = 0; i < 1000; i++) {
    updateBoard();
  }

  drawBoard();
}