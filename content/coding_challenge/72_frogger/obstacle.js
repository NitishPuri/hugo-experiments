class Obstacle extends Rectangle {
  constructor(x, y, w, h, speed) {
    super(x, y, w, h)
    this.speed = speed
  }

  update() {
    this.x += this.speed

    if (this.speed > 0) {
      if (this.x > width + gridSize) {
        this.x = -this.w - gridSize
      }
    }
    else {
      if (this.x < -this.w - gridSize) {
        this.x = width + gridSize
      }
    }
  }

  show() {
    fill(200)
    rect(this.x, this.y, this.w, this.h)
  }
}