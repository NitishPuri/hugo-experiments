class Rectangle {
  constructor(x, y, w, h) {
    this.x = x
    this.w = w
    this.y = y
    this.h = h
  }

  intersects(other) {
    let left = this.x
    let right = this.x + this.w
    let top = this.y
    let bottom = this.y + this.h

    let oleft = other.x
    let oright = other.x + other.w
    let otop = other.y
    let obottom = other.y + other.h


    return !(left > oright ||
      right < oleft ||
      top > obottom ||
      bottom < otop)
  }
}