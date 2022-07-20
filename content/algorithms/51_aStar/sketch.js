

let grid = [];
let cols;
let rows;
let w = 20;

let openSet = [];
let closedSet = [];
let start;
let end;

let path = [];
let solved = false;

let params = {
  step: () => {
    noLoop()
    redraw()
  },
  continue: () => loop(),
  reset: () => {
    // Make a grid.
    grid = []
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        // grid[i] = [];
        // grid[i][j] = new Spot(i, j);
        grid.push(new Spot(i, j));
      }
    }

    grid.forEach(s => s.addNeighbors())

    start = grid[0];
    end = grid[index(cols - 1, rows - 1)]
    start.wall = false;
    end.wall = false;

    openSet = []
    openSet.push(start);
    closedSet = []
    // noLoop();
    path = []

    solved = false;

    loop()
  },
  density: 0.2
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

function setup() {
  createCanvasCustom();
  // createCanvas(400, 400);

  cols = floor(width / w)
  rows = floor(height / w);

  params.reset();

  var gui = new dat.GUI();
  gui.add(params, 'step')
  gui.add(params, 'continue')
  gui.add(params, 'reset')
  gui.add(params, 'density').min(0).max(1).step(0.01)
}

function draw() {

  if (solved) {
    noLoop();
    return;
  }

  let winner = null;
  if (openSet.length > 0) {
    let lowestIndex = 0;

    winner = openSet.reduce((w, s) => (s.f < w.f) ? s : w)

    if (winner === end) {
      path = [];
      let temp = winner;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous)
        temp = temp.previous
      }

      solved = true;
      noLoop();
      console.log('DONE');
    }

    removeFromArray(openSet, winner);
    closedSet.push(winner);

    // console.log("Winner :: ", winner)

    // For each neighbor
    winner.neighbors.forEach(n => {
      if (!closedSet.includes(n) && !n.wall) {
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
          n.h = heuristic(n, end);
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
    noLoop();
    return;
  }

  // Draw stuff!!
  background(0);

  grid.forEach(s => s.show(color(0)))

  closedSet.forEach(s => s.show(color(255, 0, 0, 150)))
  openSet.forEach(s => s.show(color(0, 255, 0, 150)))

  // if (winner) {
  //   winner.neighbors.forEach(n => n.show(color(0, 0, 255)))
  // }
  // winner.show(color(0))

  // Find the path
  path = [];
  let temp = winner;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous)
    temp = temp.previous
  }

  // path.forEach(s => s.show(color(0, 0, 255)))

  stroke(0, 0, 255);
  strokeWeight(4)
  noFill();
  beginShape();
  path.forEach(s => vertex(s.i * w + w / 2, s.j * w + w / 2))
  endShape();

}