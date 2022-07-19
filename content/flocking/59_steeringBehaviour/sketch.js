
var font;

var particles = [];

function preload() {
  // font = new p5.Font('Georgia');
  font = loadFont('AvenirNextLTPro-Demi.otf')
}


function setup() {
  createCanvasCustom();
  colorMode(HSB);

  textFont(font);
  background(51);

  stroke(255, 255, 255);
  strokeWeight(6);
  var points = font.textToPoints('rainbow', 100, 300, 192)
  points.forEach(p => {
    particles.push(new Particle(p.x, p.y));
  })
}

function draw() {
  background(0);
  particles.forEach(p => {
    p.behaviours();
    p.update();
    p.show();
  })
}

// function mouseDragged() {
//   particles.push(new Particle(mouseX, mouseY));
// }
