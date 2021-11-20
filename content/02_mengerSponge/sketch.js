
var params = {
  reset: () => {
    sponge = []
    const b = new Box(0, 0, 0, 200);
    sponge.push(b)
  },
  generate: () => {
    let next = [];
    sponge.forEach(b => {
      const newBoxes = b.generate();
      next = next.concat(newBoxes)
    })
    sponge = next;
  }
}

let angle = 0;
let sponge = [];

function setup() {
  createCanvasCustom({ renderer: WEBGL });

  params.reset();

  const gui = new dat.GUI();
  gui.add(params, 'reset')
  gui.add(params, 'generate')
}



function draw() {
  background(0)

  ambientLight(255, 0, 0);
  let v = createVector(mouseX - width / 2, mouseY - height / 2, 0)
  v.normalize()
  directionalLight(0, 0, 255, v)

  const camX = map(mouseX, 0, width, -200, 200);
  const camY = map(mouseY, 0, height, -200, 200);
  // // orbit
  camera(camX, camY, (height / 2) / (tan(PI / 6)), 0, 0, 0, 0, 1, 0)

  // translate(-width / 2, -height / 2)

  stroke(255, 0, 255, 150);
  ambientMaterial(255, 250, 255);
  // noStroke();
  // noFill();
  // fill(255, 100)
  rotateX(angle);
  rotateY(angle * 0.3)
  rotateZ(angle * 0.1)
  sponge.forEach(b => b.show())

  angle += 0.01;
}
