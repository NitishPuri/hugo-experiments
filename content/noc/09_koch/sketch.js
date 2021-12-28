
var t = 0;
var k;

var params = {
  lines: function () {
    k = new KochFractal();
    k.points.push(createVector(0, height - 20))
    k.points.push(createVector(width, height - 20))
    k.restart();
  },
  snowflake: function () {
    k = new KochFractal();
    const r = 0.3;
    const h = height / 3
    k.points.push(createVector(width * r, h))
    k.points.push(createVector(width * (1 - r), h))
    k.points.push(createVector(width / 2, h + width * (1 - 2 * r) * cos(radians(30))))
    k.points.push(createVector(width * r, h))
    k.restart();
  }
}

function setup() {
  createCanvasCustom();
  colorMode(HSB)
  frameRate(1)
  // params.lines();
  params.snowflake();
  // k = new KochFractal();

  var gui = new dat.GUI();
  gui.add(params, 'lines');
  gui.add(params, 'snowflake');
}


function draw() {
  background(51);
  k.render();
  k.nextLevel();
  // console.log(k.getCount())
  if (k.getCount() > 5) {
    k.restart();
  }
}
