
function setup() {
  createCanvasCustom({ renderer: WEBGL });

  rectMode(CENTER);
}

var angle = 0;

function draw() {
  background(175);

  const camX = map(mouseX, 0, width, -200, 200);
  const camY = map(mouseY, 0, height, -200, 200);
  // // orbit
  camera(camX, camY, (height / 2) / (tan(PI / 6)), 0, 0, 0, 0, 1, 0)
  // // pan
  // // camera(camX, camY, (height / 2) / (tan(PI / 6)), camX, camY, 0, 0, 1, 0)

  // const fov = PI / 3;
  // const cameraZ = (height / 2.0) / tan(fov / 2.0);
  // perspective(fov, width / height, cameraZ / 10.0, cameraZ * 10.0)

  ambientLight(255, 0, 0);
  let v = createVector(mouseX - width / 2, mouseY - height / 2, 0)
  v.normalize()
  directionalLight(0, 0, 255, v)

  // fill(255, 0, 255);
  // normalMaterial();
  noStroke()

  push()
  fill(0)
  translate(0, 300, 0)
  rotateX(HALF_PI)
  plane(1000, 500);
  pop()

  translate(-width / 2, -height / 2, 0)

  ambientMaterial(255, 250, 255);


  translate(width / 4, height / 4, 0)
  push()
  rotateX(angle);
  rotateY(angle * 0.3)
  rotateZ(angle * 0.1)
  box(100, 10, 200);
  pop()

  translate(width / 4, 0, 0)
  push()
  rotateY(angle);
  rotateZ(angle * 0.3)
  rotateX(angle * 0.1)
  cylinder(70, 70)
  pop()

  translate(width / 4, 0, 0)
  push()
  rotateX(angle);
  rotateZ(angle * 0.3)
  rotateY(angle * 0.1)
  cone(70, 70)
  pop()

  translate(0, height / 2, 0)
  push()
  rotateX(angle);
  rotateZ(angle * 0.3)
  rotateY(angle * 0.1)
  torus(70, 20)
  pop()

  translate(-width / 2, 0, 0)
  push()
  rotateX(angle);
  rotateZ(angle * 0.3)
  rotateY(angle * 0.1)
  sphere(100)
  pop()

  angle += 0.01;
}