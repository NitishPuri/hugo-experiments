var grid;
var next;

let dA = 1
let dB = 0.5
let feed = 0.055
let k = 0.062

let w = 10
let cols;
let rows;

let params = {
  dA: 1,
  dB: 0.5,
  feed: 0.055,
  k: 0.062,
  w: w,
  drawBackground: false,
  colorMode: 0,
  reset: function () {
    if (params.colorMode == 0) {
      colorMode(RGB)
    }
    else {
      colorMode(HSB)
    }
    w = params.w
    cols = floor(width / params.w)
    rows = floor(height / params.w)
    grid = [];
    next = [];

    for (let i = 0; i < cols; i++) {
      grid[i] = []
      next[i] = []
      for (let j = 0; j < rows; j++) {
        grid[i][j] = { a: 1, b: 0 }
        next[i][j] = { a: 1, b: 0 }
      }
    }

    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++) {
    //     grid[floor(cols / 2) + i][floor(rows / 2) + j].b = 1
    //   }
    // }

  }
}

function setup() {
  createCanvasCustom();

  params.reset();

  var gui = new dat.GUI();
  gui.add(params, 'dA')
  gui.add(params, 'dB')
  gui.add(params, 'k')
  gui.add(params, 'feed')
  gui.add(params, 'w').min(2).max(10).step(2)
  gui.add(params, 'drawBackground')
  gui.add(params, 'reset')
  gui.add(params, 'colorMode', { RGB: 0, HSB: 1 })
}

function draw() {
  if (params.drawBackground) {
    background(255, 255, 255, 100);
  }


  for (let x = 1; x < cols - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let a = grid[x][y].a
      let b = grid[x][y].b
      next[x][y].a = a + (params.dA * laplaceA(x, y)) - (a * b * b) + (params.feed * (1 - a))
      next[x][y].b = b + (params.dB * laplaceB(x, y)) + (a * b * b) - ((params.k + params.feed) * b)
    }
  }

  noStroke()
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      let a = next[x][y].a
      let b = next[x][y].b
      let c = floor((a - b) * 255)
      c = constrain(c, 0, 255)
      if (c < 255) {
        if (params.colorMode == 0) {
          fill(c, c, c, 255)
        }
        else {
          fill(c, 255, 255, 255)
        }
        rect(x * w, y * w, w, w)
      }
    }
  }

  swap();
}


function swap() {
  var temp = grid;
  grid = next;
  next = temp;
}

function laplaceA(x, y) {
  let sumA = 0;

  sumA += grid[x][y].a * -1
  sumA += grid[x - 1][y].a * 0.2
  sumA += grid[x + 1][y].a * 0.2
  sumA += grid[x][y - 1].a * 0.2
  sumA += grid[x][y + 1].a * 0.2
  sumA += grid[x - 1][y - 1].a * 0.05
  sumA += grid[x - 1][y + 1].a * 0.05
  sumA += grid[x + 1][y - 1].a * 0.05
  sumA += grid[x + 1][y + 1].a * 0.05

  return sumA
}

function laplaceB(x, y) {
  let sumA = 0;

  sumA += grid[x][y].b * -1
  sumA += grid[x - 1][y].b * 0.2
  sumA += grid[x + 1][y].b * 0.2
  sumA += grid[x][y - 1].b * 0.2
  sumA += grid[x][y + 1].b * 0.2
  sumA += grid[x - 1][y - 1].b * 0.05
  sumA += grid[x - 1][y + 1].b * 0.05
  sumA += grid[x + 1][y - 1].b * 0.05
  sumA += grid[x + 1][y + 1].b * 0.05

  return sumA
}

function mousePressed() {
  // console.log(mouseX, mouseY)
  const x = floor(mouseX / w)
  const y = floor(mouseY / w)
  if (x < 0 || x >= cols || y < 0 || y >= rows) return
  else grid[x][y].b = 1
}
