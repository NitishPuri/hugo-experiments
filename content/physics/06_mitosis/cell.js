class Cell {
  constructor(pos, r, h, s, b) {
    this.pos = pos || createVector(random(width), random(height));
    this.r = r || 60;
    this.v =  p5.Vector.random2D();

    this.cellHue = h || random(cellHue - 40, cellHue + 40)
    this.cellSat = s || random(100 , 255)
    this.cellVal = b || random(200, 255)
    this.color = color(this.cellHue , this.cellSat, this.cellVal, 100)
    this.dead = false
  }

  move(velocityMultiplier, vibrationMultiplier) {
    if(this.pos.x > width || this.pos.x < 0) this.v.x *= -1
    if(this.pos.y > height || this.pos.y < 0) this.v.y *= -1    
    this.pos.add([this.v.x * velocityMultiplier, this.v.y * velocityMultiplier]);    
    let vibrations = p5.Vector.random2D()
    vibrations.mult(vibrationMultiplier)
    this.pos.add(vibrations);
  }

  show() {
    noStroke();
    fill(this.color)
    ellipse(this.pos.x, this.pos.y, this.r)
  }

  clicked(mx, my) {
    const d = dist(this.pos.x, this.pos.y, mx, my)
    return (d < this.r)
  }

  mitosis(probMitosis) {
    if (random(100) <[probMitosis] && this.r > 1) {
      let offset = p5.Vector.random2D();
      offset.setMag(this.r);
      let cell = new Cell(this.pos.copy().add(offset), this.r * 0.8, this.cellHue, this.cellSat, this.cellVal)
      this.r /= 2;
      return cell;
    }
  }

  grow(probGrow) {
    if (random(100) < probGrow) {
      this.r += random(0.1, 2)
    }
    if (this.r < 0.01) {
      this.dead = true
    }
  }
}