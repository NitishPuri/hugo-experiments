
// var params = {
//   n1: 1,
//   n2: 1,
//   n3: 1,
//   m: 0,
//   a: 1,
//   b: 1,
//   radius: 100,
//   numPoints: 100,
//   iterations: 1
// }

const total = 50;
let globe = [];

function setup() {
  createCanvasCustom({ renderer: WEBGL });

  for (let i = 0; i < total + 1; i++) {
    globe[i] = [];
  }
  // background(0);
  // angleMode(DEGREES)
  colorMode(HSB)

  // const gui = new dat.GUI();
  // gui.add(params, 'n1').min(0).max(100).step(0.1);
  // gui.add(params, 'n2').min(0).max(100).step(0.1);
  // gui.add(params, 'n3').min(0).max(100).step(0.1);
  // gui.add(params, 'm').min(0).max(100).step(1);
  // gui.add(params, 'a').min(1).max(10).step(1);
  // gui.add(params, 'b').min(1).max(10).step(1);
  // gui.add(params, 'numPoints').min(10).max(500).step(1);
  // gui.add(params, 'radius').min(10).max(500).step(1);
  // gui.add(params, 'iterations').min(1).max(3).step(1);
  // gui.add(params, 'colorMode', params.colorModes);
  // gui.add(params, 'reset');
  d = (height / 2) / (tan(PI / 6))
  cam = createVector(0, 0, d);

  showStats()
}

let cam;
let d;
let msx = 0, msy = 0;
function mousePressed() {
  msx = mouseX;
  msy = mouseY;
}

function mouseDragged() {
  cam.x += (msx - mouseX) * 0.05;
  cam.y += (msy - mouseY) * 0.05;
  cam.setMag(d);
  // return false;
}

function mouseWheel(ev) {
  d += (ev.delta * 0.1);
  cam.setMag(d);
  return false;
}

function superShape(theta, m, n1, n2, n3) {
  const a = 1;
  const b = 1;
  const t1 = pow(abs((1 / a) * cos(m * theta / 4)), n2)
  const t2 = pow(abs((1 / b) * sin(m * theta / 4)), n3)
  return pow(t1 + t2, -1 / n1);
}

let mchange = 0;

function draw() {
  background(0)

  const m = map(sin(mchange), -1, 1, 0, 10);
  mchange += 0.02

  camera(cam.x, cam.y, cam.z, 0, 0, 0, 0, 1, 0)

  const r = 200;
  // sphere(r)

  for (let i = 0; i < total + 1; i++) {
    const lat = map(i, 0, total, -HALF_PI, HALF_PI);
    // const long = map(i, 0, total, -PI, PI);
    const r2 = superShape(lat, m, 0.2, 1.7, 1.7);
    for (let j = 0; j < total + 1; j++) {
      const long = map(j, 0, total, -PI, PI);
      // const lat = map(j, 0, total, -HALF_PI, HALF_PI);
      const r1 = superShape(long, m, 0.2, 1.7, 1.7);
      const x = r * r1 * cos(long) * r2 * cos(lat);
      const y = r * r1 * sin(long) * r2 * cos(lat);
      const z = r * r2 * sin(lat);
      globe[i][j] = createVector(x, y, z);
    }
  }


  // stroke(255);
  // strokeWeight(1);
  noStroke();
  // noFill();
  // fill(255, 0.5)
  for (let i = 0; i < total; i++) {
    fill(map(i, 0, total, 0, 255 * 6) % 255, 255, 255);
    beginShape(TRIANGLE_STRIP)
    for (let j = 0; j < total + 1; j++) {
      const v1 = globe[i][j];
      const v2 = globe[i + 1][j];
      vertex(v1.x, v1.y, v1.z);
      vertex(v2.x, v2.y, v2.z);
    }
    endShape()
  }
}
