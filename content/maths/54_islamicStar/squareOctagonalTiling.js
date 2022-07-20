class SquareOctagonTiling {
  constructor(r) {
    this.polys = []
    this.r = r
  }

  buildOctCell(x, y) {
    let sides = 8
    let p = new Polygon(sides)

    let inc = TWO_PI / sides
    for (let i = 0; i < sides; i++) {
      let ang = (i * inc) - inc / 2
      let vX = x + this.r * Math.cos(ang)
      let vY = y + this.r * Math.sin(ang)
      p.addVertex(vX, vY)
    }
    p.close()
    this.polys.push(p)
  }

  buildSquareCell(x, y) {
    let sides = 4
    let p = new Polygon(sides)
    let inc = TWO_PI / sides
    let rr = 2 * this.r * sin(PI / 8) * cos(PI / 4)
    for (let i = 0; i < sides; i++) {
      let ang = (i * inc) - inc / 2
      let vX = x + rr * Math.cos(ang)
      let vY = y + rr * Math.sin(ang)
      p.addVertex(vX, vY)
    }
    p.close()
    this.polys.push(p)
  }

  buildGrid() {
    let h = this.r * 2
    let wo = this.r * cos(PI / 8)
    let ws = 2 * this.r * sin(PI / 8)

    let hInc = h
    let row = 0
    for (let y = h / 2; y < height; y += (wo + ws / 2)) {
      let startX = wo;
      let col = (row % 2 == 0) ? 0 : 1
      for (let x = startX; x < width; x += (wo + ws / 2)) {
        ((col % 2) == 0) ? this.buildOctCell(x, y) : this.buildSquareCell(x, y)
        col++
      }
      row++
    }
  }
}