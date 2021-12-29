class Edge {
  constructor(a, b, sides) {
    this.a = a
    this.b = b
    this.h1
    this.h2
    this.sidesOfParent = sides
  }

  show() {
    if (params.showGrid) {
      stroke(255, 50)
      line(this.a.x, this.a.y, this.b.x, this.b.y)
    }

    this.h1.show()
    this.h2.show()
  }

  hankin(interiorAngle) {
    let midpoint = p5.Vector.add(this.a, this.b)
    midpoint.mult(0.5)
    let v1 = p5.Vector.sub(this.a, midpoint)
    let v2 = p5.Vector.sub(this.b, midpoint)

    // Edge length
    let elen = v1.mag();

    let off1, off2
    if (delta === 0) {
      off1 = midpoint
      off2 = midpoint
    }
    else {
      v1.setMag(delta)
      v2.setMag(delta)

      off1 = p5.Vector.add(midpoint, v2)
      off2 = p5.Vector.add(midpoint, v1)
    }
    v1.normalize()
    v2.normalize()

    let ra = radians(angle)
    v1.rotate(ra)
    v2.rotate(-ra)
    // v1.normalize()
    // v2.normalize()

    // Law of sines!
    // let sides = 4
    // let interior = (sides - 2) * PI / sides;
    let alpha = interiorAngle * 0.5
    let beta = PI - ra - alpha
    let hlen = ((elen + delta) * sin(alpha)) / sin(beta)

    // level
    // let theta = (PI / this.sidesOfParent) * params.level
    // let re = elen / sin(PI / this.sidesOfParent)
    // let len2 = sin(theta) * (re - (hlen * sin(ra) / sin(alpha))) / sin(beta + theta)
    // hlen += len2

    v1.setMag(hlen)
    v2.setMag(hlen)

    this.h1 = new Hankin(off1, v1)
    this.h2 = new Hankin(off2, v2)
  }
}