class Spot {
  constructor(i, j) {
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.i = i;
    this.j = j;

    this.neighbors = []

    this.previous = undefined

    this.wall = (random(1) < params.density)
  }

  show(col) {
    // fill(col)

    if (this.wall) {
      fill(255)
      noStroke();
      ellipse(this.i * w + w / 2, this.j * w + w / 2, w * 0.7);

      stroke(255);
      strokeWeight(10);
      this.neighbors.forEach(n => {
        if (n.wall && (this.i === n.i || this.j === n.j)) {
          line(this.i * w + w / 2, this.j * w + w / 2, n.i * w + w / 2, n.j * w + w / 2)
        }
      })
    }
    else {
      noStroke();
      fill(col);
      ellipse(this.i * w + w / 2, this.j * w + w / 2, w * 0.8);
    }

    // rect(this.x * w, this.y * w, w, w);
    // rect(this.i * w, this.j * w, w - 1, w - 1);
    // ellipse(this.i * w, this.j * w, w * 0.8);
    // ellipse(this.i * w + w / 2, this.j * w + w / 2, w * 0.8);

  }

  addNeighbors() {
    const i = this.i
    const j = this.j
    let pushToNeighbors = (a) => { if (a) this.neighbors.push(a) };
    pushToNeighbors(grid[index(i + 1, j)])
    pushToNeighbors(grid[index(i - 1, j)])
    pushToNeighbors(grid[index(i, j + 1)])
    pushToNeighbors(grid[index(i, j - 1)])
    // Diagonals
    pushToNeighbors(grid[index(i - 1, j - 1)])
    pushToNeighbors(grid[index(i + 1, j - 1)])
    pushToNeighbors(grid[index(i - 1, j + 1)])
    pushToNeighbors(grid[index(i + 1, j + 1)])
  }
}