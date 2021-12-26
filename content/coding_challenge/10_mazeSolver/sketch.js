
let w = 20;
let cols;
let rows;

let grid = [];

let current;
let stack = []

let cellHue;
let backgroundHue;

// solver variables
let searchStart;
let searchTarget;

let openSet = [];
let closedSet = [];

let path = [];
let solved = false;

function hueShift(h, s) {
  h += s;
  while (h >= 360) h -= 360
  while (h < 0) h += 360
  return h
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
  // return i + j * cols;
  return i + j * cols;
}

function removeFromArray(arr, elt) {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  return dist(a.i, a.j, b.i, b.j);
  // return abs(a.i - b.i) + abs(a.j - b.j)
}


let params = {
  currentState: 0,
  states: {
    NONE: -1,
    GENERATE_MAZE: 0,
    SOLVE_MAZE: 1
  },
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

    params.currentState = params.states.GENERATE_MAZE
  }
}

function setup() {
  createCanvasCustom();
  // createCanvasCustom({ w: 400, h: 300 });

  colorMode(HSB)

  cols = floor(width / w)
  rows = floor(height / w);

  params.reset()

  // frameRate(20)


  let gui = new dat.GUI()
  gui.add(params, 'reset')
}

function solverSetup() {
  // searchStart = random(grid)
  // searchTarget = random(grid)
  searchStart = grid[0];
  searchTarget = grid[index(cols - 1, rows - 1)]

  openSet = []
  openSet.push(searchStart);
  closedSet = []
  // noLoop();
  path = []

  solved = false;

  params.currentState = params.states.SOLVE_MAZE

}

function generateMaze() {
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
    // setTimeout(params.reset, 1000);
    params.currentState = params.states.NONE
    console.log("Generated!!")
    setTimeout(solverSetup, 1000);
  }

  // grid.forEach(cell => cell.show());
  current.highlight();

}

function drawPath(c) {
  stroke(c);
  strokeWeight(4)
  noFill();
  beginShape();
  path.forEach(s => vertex(s.i * w + w / 2, s.j * w + w / 2))
  endShape();
}

function solveMaze() {

  background(backgroundHue, 0.005);

  // searchStart.fill(color(0, 0, 0))
  // searchTarget.fill(color(0, 255, 255))

  if (solved) {
    drawPath(color(0, 0, 0, 0.5));
    // noLoop();
    return;
  }

  let winner = null;
  if (openSet.length > 0) {
    let lowestIndex = 0;

    winner = openSet.reduce((w, s) => (s.f < w.f) ? s : w)

    if (winner === searchTarget) {
      path = [];
      let temp = winner;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
      }

      solved = true;
      setTimeout(params.reset, 2000);
      // noLoop();
      console.log('DONE');
    }

    removeFromArray(openSet, winner);
    closedSet.push(winner);

    // console.log("Winner :: ", winner)

    // For each neighbor
    winner.getNeighbors().forEach(n => {
      if (!closedSet.includes(n)) {
        const tempG = winner.g + 1

        let newPath = false;
        if (openSet.includes(n)) {
          if (tempG < n.g) {
            n.g = tempG
            newPath = true;
          }
        }
        else {
          n.g = tempG
          openSet.push(n);
          newPath = true;
        }

        if (newPath) {
          n.h = heuristic(n, searchTarget);
          n.f = n.g + n.h
          n.previous = winner;
        }
      }
    })
  }
  else {
    // nothing left to do.
    console.log("No solution!")
    solved = true

    setTimeout(params.reset, 2000)
    noLoop();
    return;
  }

  closedSet.forEach(s => s.fill(color(backgroundHue, 150, 255, 0.01)))
  openSet.forEach(s => s.fill(color(backgroundHue, 50, 255, 0.01)))


  path = [];
  let temp = winner;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
  }

  // path.forEach(s => s.show(color(0, 0, 255)))

  drawPath(color(0, 0, 255, 0.05))
}

function draw() {

  if (params.currentState == params.states.GENERATE_MAZE) {
    generateMaze()
  }
  else if (params.currentState == params.states.SOLVE_MAZE) {
    solveMaze()
  }
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