
let frog;
let lanes = [];

let laneType = {
  SAFETY: 0,
  CAR: 1,
  LOG: 2
}

let gridSize = 50

function resetGame() {
  frog = new Frog(width / 2 - gridSize / 2, height - gridSize - (height % gridSize), gridSize)
  frog.attach(null)
}

function setup() {
  createCanvasCustom()

  resetGame()

  let totalLanes = floor(height / gridSize) // ???

  let index = 0
  lanes.push(new Lane(index++, color(100)))
  lanes.push(new Lane(index++, laneType.LOG, 3, 1, 150, 3))
  lanes.push(new Lane(index++, laneType.LOG, 2, 3, 350, -2.5))
  lanes.push(new Lane(index++, laneType.LOG, 4, 1, 200, 1))
  lanes.push(new Lane(index++, laneType.LOG, 3, 2, 250, -1.7))
  lanes.push(new Lane(index++, color(100)))
  lanes.push(new Lane(index++, laneType.CAR, 3, 1, 150, 2.4))
  lanes.push(new Lane(index++, laneType.CAR, 2, 2, 150, -3.6))
  lanes.push(new Lane(index++, laneType.CAR, 1, 3, 150, 2.3))
  lanes.push(new Lane(index++, laneType.CAR, 4, 1, 150, -1))
  while (lanes.length < totalLanes) {
    lanes.push(new Lane(index++, color(100)))
  }
}

function draw() {
  background(0)

  lanes.forEach(l => l.run())

  let laneIndex = floor(frog.y / gridSize)
  lanes[laneIndex].check(frog)

  frog.update()
  frog.show()
}

function keyPressed() {
  switch (keyCode) {
    case UP_ARROW:
      frog.move(0, -1)
      break;
    case DOWN_ARROW:
      frog.move(0, 1)
      break;
    case LEFT_ARROW:
      frog.move(-1, 0)
      break;
    case RIGHT_ARROW:
      frog.move(1, 0)
      break;
    default:
      return true
    // break;
  }
  return false
}
