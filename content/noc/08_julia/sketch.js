
// var xMin = -1;
// var yMin = -1;
// var w = 4;
// var h = 2;

var params = {
  xMin: -2.5,
  yMin: -1,
  w: 4,
  h: 2,
  maxIterations: 50,
  resolution: 10,
  drawMandelbrot: function () {
    redraw();
  }
}

function setup() {
  // createCanvas(400, 400);
  createCanvasCustom();

  var gui = new dat.GUI();
  gui.add(params, 'xMin').onChange(redraw)
  gui.add(params, 'yMin').onChange(redraw)
  gui.add(params, 'w').onChange(redraw)
  gui.add(params, 'h').onChange(redraw)
  gui.add(params, 'resolution').min(2).max(10).step(2).onChange(redraw)
  gui.add(params, 'maxIterations').min(50).max(200).step(2)
  gui.add(params, 'drawMandelbrot');

  colorMode(HSB)

}


function draw() {
  background(0)
  // loadPixels();
  // var maxIterations = 200;

  let cols = floor(width / params.resolution)
  let rows = floor(height / params.resolution)

  // let cx = -0.70176
  // let cy = -0.38421
  let cx = map(mouseX, 0, width, -1, 1)
  let cy = map(mouseY, 0, height, -1, 1)

  var xMax = params.xMin + params.w;
  var yMax = params.yMin + params.h;

  var dx = (xMax - params.xMin) / cols;
  var dy = (yMax - params.yMin) / rows;

  var y = params.yMin;
  for (let j = 0; j < rows; j++) {
    var x = params.xMin;
    for (let i = 0; i < cols; i++) {
      var a = x;
      var b = y;
      var n = 0;
      while (n < params.maxIterations) {
        var aa = a * a;
        var bb = b * b;
        var twoab = 2.0 * a * b;

        a = aa - bb + cx;
        b = twoab + cy;
        // infinity in our finite world..
        if (aa + bb > 16.0) {
          break; // Bail...
        }
        n++;
      }
      // if (n == maxIterations) set(i, j, color(0));
      // else set(i, j, color(n * 16 % 255));

      if (n == params.maxIterations) {
        // fill()
      }
      else {
        fill(map(sqrt(n / params.maxIterations), 0, 1, 0, 255), 255, 255)
        // fill(map(sqrt(n / params.maxIterations), 0, 1, 0, 255))
        // fill(n * 16 % 255)
        noStroke();
        rect(i * params.resolution, j * params.resolution, params.resolution, params.resolution);
      }

      x += dx;
    }
    y += dy;
  }

  // updatePixels();
  // noLoop();
}
