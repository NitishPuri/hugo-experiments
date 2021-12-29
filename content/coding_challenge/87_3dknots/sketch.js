
let angle = 0;
let vectors = [];

let beta = 0;

function setup() {
  createCanvasCustom({ renderer: WEBGL })

  // for (; beta < TWO_PI; beta += 0.01) {
  //   let r = 100 * (0.8 + 1.6 * sin(6 * beta))
  //   let theta = 2 * beta;
  //   let phi = 0.6 * PI * sin(12 * beta)
  //   let x = r * cos(phi) * cos(theta)
  //   let y = r * cos(phi) * sin(theta)
  //   let z = r * sin(phi)
  //   stroke(255, r, 255)

  //   vectors.push(createVector(x, y, z))

  //   // beta += 0.01
  // }

}

function draw() {
  background(0)
  // translate(width / 2, height / 2, 0)
  rotateY(angle)
  angle += 0.03

  let r = 100 * (0.8 + 1.6 * sin(6 * beta))
  let theta = 2 * beta;
  let phi = 0.6 * PI * sin(12 * beta)
  let x = r * cos(phi) * cos(theta)
  let y = r * cos(phi) * sin(theta)
  let z = r * sin(phi)
  stroke(255, r, 255)

  vectors.push(createVector(x, y, z))

  beta += 0.01

  noFill()
  // stroke(255)
  strokeWeight(8)
  beginShape()
  vectors.forEach(v => vertex(v.x, v.y, v.z))
  endShape()
}

