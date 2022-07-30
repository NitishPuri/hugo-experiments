
let grid;
let x;
let y;
let dir;

let ANTDIR = {
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3
}

function setup() {
  createCanvasCustom()

  grid = make2DArray(width, height)

  x = floor(width / 2)
  y = floor(height / 2)

  console.log(x, y)

  dir = ANTDIR.UP
}

function turnRight() {
  dir++;

  if (dir > ANTDIR.LEFT) {
    dir = ANTDIR.UP
  }
}

function turnLeft() {
  dir--;
  if (dir < ANTDIR.UP) {
    dir = ANTDIR.LEFT
  }
}

function moveForward() {
  switch (dir) {
    case ANTDIR.UP:
      y--;
      break;
    case ANTDIR.RIGHT:
      x++;
      break;
    case ANTDIR.DOWN:
      y++;
      break;
    case ANTDIR.LEFT:
      x--;
      break;
    default:
      console.log("Unknown dir!!")
  }

  // wrap around!
  if (x > width - 1) {
    x = 0
  }
  else if (x < 0) {
    x = width - 1
  }
  if (y > height - 1) {
    y = 0
  }
  else if (y < 0) {
    y = height - 1
  }
}



function draw() {
  strokeWeight(4)

  for (let n = 0; n < 100; n++) {
    let state = grid[x][y]
    if (state == 0) {
      turnRight()
      grid[x][y] = 1
    }
    else if (state == 1) {
      turnLeft()
      grid[x][y] = 0
    }

    stroke(255)
    if (grid[x][y] == 1) {
      stroke(0)
    }
    point(x, y)
    moveForward()
  }
}

function make2DArray(cols, rows) {
  let arr = new Array(cols)
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows)
    for (let j = 0; j < arr[i].length; j++) {
      arr[i][j] = 0
    }
  }

  return arr;
}

