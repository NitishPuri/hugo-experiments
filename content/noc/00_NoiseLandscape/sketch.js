let landscape;
var theta = 0;

var params = {
  speed: 1,
  scale: 120
}

function setup() {
  createCanvasCustom({ renderer: WEBGL });

  landscape = new Landscape(20, 1000, 1500);

  var gui = new dat.GUI();
  gui.add(params, 'speed').min(0.1).max(10).step(0.1)
  gui.add(params, 'scale').min(50).max(500).step(10).listen()
}

function draw() {

  // const angleX = map(mouseY, 0, height, 0, TWO_PI);
  // const angleZ = map(mouseX, 0, width, 0, TWO_PI);
  background(255);

  // push();
  // translate(width/2, height/2, 0);
  // rotateX(angleX);
  rotateX(PI / 2);
  // rotateZ(theta);  
  translate(-width / 2 - 200, -height - 2000, -landscape.w / 2);
  // translate(-landscape.w/2, -landscape.h/2, 0)
  // rotateZ(angleZ);
  landscape.render();
  // pop();

  landscape.calculate(params);

  params.scale += random(-5, 5);
  params.scale = min(max(params.scale, 50), 500)

  theta += 0.0025;
}