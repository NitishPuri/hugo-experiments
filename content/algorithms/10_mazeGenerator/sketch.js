
let w = 20;
let cols;
let rows;

let grid = [];

let current;
let stack = []

let cellHue;
let backgroundHue;

function hueShift(h, s) {
  h += s;
  while (h >= 360) h -= 360
  while (h < 0) h += 360
  return h
}

let params = {
  reset() {
    backgroundHue = floor(random(255))
    background(backgroundHue, 255, 255)

    cellHue = hueShift(backgroundHue, 180)

    grid = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        grid.push(new Cell(i, j))
      }
    }

    current = random(grid);
    stack = []

    current.highlight()
  }
}

function setup() {
  createCanvasCustom();

  colorMode(HSB)

  cols = floor(width / w)
  rows = floor(height / w);

  params.reset()

  // frameRate(20)


  let gui = new dat.GUI()
  gui.add(params, 'reset')
}

function draw() {
  background(backgroundHue, 0.005);

  current.visited = true;

  // STEP 1
  var next = current.checkNeighbors()
  if (next) {
    next.visited = true;

    // STEP 2
    stack.push(current);

    // STEP 3
    removeWalls(current, next);

    // STEP 4
    current = next;
  }
  else if (stack.length > 0) {
    current.highlight() // !!!!
    current = stack.pop();
  }
  else {
    setTimeout(params.reset, 1000);
  }

  // grid.forEach(cell => cell.show());
  current.highlight();
}


function removeWalls(a, b) {
  const x = a.i * w;
  const y = a.j * w;

  var i = a.i - b.i;

  stroke(cellHue, 255, 255, 0.8);
  if (i === 1) {
    a.walls.Left = false;
    b.walls.Right = false;

    line(x, y + w, x, y);
  }
  else if (i === -1) {
    a.walls.Right = false;
    b.walls.Left = false;

    line(x + w, y, x + w, y + w);
  }

  var j = a.j - b.j;
  if (j === 1) {
    a.walls.Top = false;
    b.walls.Bottom = false;

    line(x, y, x + w, y);
  }
  else if (j === -1) {
    a.walls.Bottom = false;
    b.walls.Top = false;

    line(x + w, y + w, x, y + w);
  }
}