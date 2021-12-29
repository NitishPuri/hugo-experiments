class SquareTiles {
  constructor(inc) {
    this.polys = []
    this.inc = inc
  }

  buildGrid() {
    this.polys = []
    for (let x = 0; x < width; x += this.inc) {
      for (let y = 0; y < height; y += this.inc) {
        let poly = new Polygon(4)

        poly.addVertex(x, y)
        poly.addVertex(x + this.inc, y)
        poly.addVertex(x + this.inc, y + this.inc)
        poly.addVertex(x, y + this.inc)
        poly.close()

        this.polys.push(poly)
      }
    }
  }
}