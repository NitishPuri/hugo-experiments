
var params = {
  increment: 0.01,
  scale: 20,
  flowMag: 1,
  dynamicField: true,
  drawField: false,
  drawBackground: true,
  zOff: 0.0,
  zIncrement: 0.02,
  lod: 8,
  falloff: 0.65,
  cMode: 1,
  alpha: 150,
  strokeSize: 2,
  reset: function () {
    particles = []
    for (let i = 0; i < 500; i++) {
      particles[i] = new Particle()
    }
    background(0);
  },
  changeColorMode: function () {
    if (this.cMode == 0) {
      colorMode(HSB, 360, 255, 255, 255)
      this.cMode = 1
    }
    else {
      colorMode(RGB, 255, 255, 255, 255)
      this.cMode = 0
    }
  }
}

var cols, rows;
var particles = [];

var flowField = [];

function setup() {
  createCanvasCustom({
    statsFunc: () =>
      "Frame Rate(" + floor(frameRate()) + ") , Particles( " + particles.length + ")"
  });


  var gui = new dat.GUI();
  gui.add(params, 'drawField')
  gui.add(params, 'dynamicField')
  gui.add(params, 'drawBackground')
  gui.add(params, 'reset')
  gui.add(params, 'changeColorMode')
  gui.add(params, 'alpha').min(10).max(255)
  gui.add(params, 'scale').min(10).max(30).step(1);
  gui.add(params, 'strokeSize').min(1).max(10).step(1);
  gui.add(params, 'flowMag').min(0.01).max(5);
  gui.add(params, 'increment').min(0.01).max(1);
  gui.add(params, 'zIncrement').min(0.001).max(0.1);
  gui.add(params, 'lod').min(0).max(20);
  gui.add(params, 'falloff').min(0.01).max(1);

  params.reset();
  // params.changeColorMode();

  // background(255)
}

function draw() {
  // translate(-width/2, -height/2)

  if (params.drawBackground) {
    background(0, 1);
    // background(0, 255);  
  }

  // fill(255, 0, 255, 255);
  // // strokeWeight(5)
  // rect(10, 10, 100, 120)
  // // line(10, 10, 0, 100, 100, 0);
  // stroke(255, 255)
  // line(100, 120, 500, 500);

  noiseDetail(params.lod, params.falloff)

  cols = floor(width / params.scale);
  rows = floor(height / params.scale);

  flowField = [];
  // loadPixels();

  // randomSeed(42)
  let xOff = 0.0;
  for (let x = 0; x < cols; x++) {
    let yOff = 0.0;
    for (let y = 0; y < rows; y++) {

      const index = x + y * cols;

      var r = noise(xOff, yOff, params.zOff);
      // var r = random(1);

      var v = p5.Vector.fromAngle(r * TWO_PI);
      v.mult(params.flowMag);

      flowField[index] = v;

      if (params.drawField) {
        stroke(0, 255, 255, 255);
        strokeWeight(2);
        push();
        translate(x * params.scale, y * params.scale);
        rotate(v.heading())
        line(0, 0, params.scale, 0);
        pop();
      }

      yOff += params.increment;
    }
    xOff += params.increment;
  }


  particles.forEach(p => {
    p.follow(flowField)
    // p.applyForce();
    p.update();
    p.show();
    p.edges();
  })

  // updatePixels();
  if (params.dynamicField) {
    params.zOff += params.zIncrement;
  }
}

function mouseDragged() {
  particles.push(new Particle(mouseX, mouseY));
}
