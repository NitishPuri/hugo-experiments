class Lane extends Rectangle {
  // 1 :: (index, c)
  // 2 :: (index, t, n, len, spacing, speed)
  constructor() {
    let index = arguments[0]
    super(0, index * gridSize, width, gridSize)

    if (arguments.length == 2) {
      let c = arguments[1]

      this.type = laneType.SAFETY
      this.obstacles = []
      this.col = c
    }
    else {
      let t = arguments[1]
      let n = arguments[2]
      let len = arguments[3]
      let spacing = arguments[4]
      let speed = arguments[5]

      this.type = t
      let offset = random(0, 200)
      this.obstacles = Array(n).fill()
        .map((o, i) => new Obstacle(offset + spacing * i, index * gridSize, gridSize * len, gridSize, speed))

      this.col = color(0)
    }
  }

  check(frog) {
    if (this.type == laneType.CAR) {
      for (let o of this.obstacles) {
        if (frog.intersects(o)) {
          resetGame()
        }
      }
    }
    else if (this.type == laneType.LOG) {
      let ok = false
      for (let o of this.obstacles) {
        if (frog.intersects(o)) {
          ok = true;
          frog.attach(o)
        }
      }
      if (!ok) {
        resetGame()
      }
    }
  }

  run() {
    fill(this.col)
    rect(this.x, this.y, this.w, this.h)
    for (let o of this.obstacles) {
      o.show()
      o.update()
    }
  }
}