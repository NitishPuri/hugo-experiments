class Frog extends Rectangle {
  constructor(x, y, w) {
    super(x, y, w, w)
    this.attached = undefined

    this.attach = (log) => this.attached = log
  }

  show() {
    fill(0, 255, 0, 200)
    rect(this.x, this.y, this.w, this.h)
  }

  update() {
    if (this.attached) {
      this.x += this.attached.speed
    }

    this.x = constrain(this.x, 0, width - this.w)
    this.y = constrain(this.y, 0, height - this.h)
  }

  move(xDir, yDir) {
    this.x += xDir * gridSize
    this.y += yDir * gridSize
    this.attach(null)
  }
}