class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = {
      Top: true, Right: true, Bottom: true, Left: true
    }
    this.visited = false;
  }

  show() {

    if (!this.visited) return

    const x = this.i * w;
    const y = this.j * w;


    stroke(255)
    noFill();
    // rect(x, y, w, w);
    if (this.walls.Top) line(x, y, x + w, y);
    if (this.walls.Right) line(x + w, y, x + w, y + w);
    if (this.walls.Bottom) line(x + w, y + w, x, y + w);
    if (this.walls.Left) line(x, y + w, x, y);

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 150)
      rect(x, y, w, w)
    }
  }


  checkNeighbors() {
    let neighbors = [];

    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      return random(neighbors)
    }

    return undefined

  }
  highlight() {
    const x = this.i * w;
    const y = this.j * w;
    noStroke();
    // fill(255, 0, 255, 150);
    fill(cellHue, 255, 255, 0.6);
    rect(x + 1, y + 1, w - 1, w - 1)

    // stroke(0, 0, 0, 0.3)
    // if (this.walls.Top) line(x, y, x + w, y);
    // if (this.walls.Right) line(x + w, y, x + w, y + w);
    // if (this.walls.Bottom) line(x + w, y + w, x, y + w);
    // if (this.walls.Left) line(x, y + w, x, y);
  }

}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;

  return i + j * cols;
}
