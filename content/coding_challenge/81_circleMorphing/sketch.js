
let circPath = []
let triPath = []

let spacing = 10

let morAmt = 0
let morInc = 0.1

function polarToCartesian(r, a) {
  return createVector(r * cos(a), r * sin(a))
}

function setup() {
  createCanvasCustom()

  angleMode(DEGREES)

  let radius = 100;
  let startA = 0
  let endA = 120
  let start = polarToCartesian(radius, startA)
  let end = polarToCartesian(radius, endA)
  for (let angle = 0; angle < 360; angle += spacing) {
    let cv = polarToCartesian(radius, angle)

    circPath.push(cv)

    let amt = (angle - startA) / (endA - startA)
    let tv = p5.Vector.lerp(start, end, amt)
    triPath.push(tv)

    if (angle % 120 === 0 && angle > 0) {
      startA += 120
      endA += 120
      start = polarToCartesian(radius, startA)
      end = polarToCartesian(radius, endA)
    }
  }
}

function draw() {
  background(255)

  translate(width / 2, height / 2)
  rotate(30)
  stroke(0)
  strokeWeight(2)
  noFill()

  beginShape()
  for (let i = 0; i < circPath.length; i++) {
    let cv = circPath[i]
    let tv = triPath[i]

    let x = lerp(cv.x, tv.x, morAmt)
    let y = lerp(cv.y, tv.y, morAmt)

    vertex(x, y)
  }
  endShape(CLOSE)

  morAmt += morInc
  if (morAmt >= 1 || morAmt <= 0) {
    morInc *= -1
  }
}

