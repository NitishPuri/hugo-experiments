class Polygon {
  constructor(sides) {
    this.interiorAngle = ((sides - 2) * PI) / sides
    this.vertices = []
    this.edges = []
    this.sides = sides
  }
  addVertex(x, y) {
    let a = createVector(x, y)
    let total = this.vertices.length
    if (total > 0) {
      let previous = this.vertices[total - 1]
      // let edge = new Edge(previous, a, this.sides)
      let edge = new Edge(a, previous, this.sides)
      this.edges.push(edge)
    }
    this.vertices.push(a)
  }

  hankin() {
    this.edges.forEach(e => e.hankin(this.interiorAngle))
  }

  close() {
    let total = this.vertices.length
    let first = this.vertices[0]
    let last = this.vertices[total - 1]
    let edge = new Edge(first, last)
    this.edges.push(edge)
  }

  show() {
    this.edges.forEach(e => e.show())
  }
}

