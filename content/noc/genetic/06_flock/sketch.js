// http://www.red3d.com/cwr/steer/

let flock;

var gui;

var params = {
  separate: 1.0,
  align: 1.0,
  cohesion: 1.0,
  reset() {
    flock = new Flock();

    for (let i = 0; i < 60; i++) {
      const b = new Boid(random(width), random(height));
      flock.addBoid(b);
    }
  }
}

function setupGUI() {
  gui = new dat.GUI();
  gui.add(params, 'reset');
  gui.add(params, 'separate').min(0).max(10).step(0.1);
  gui.add(params, 'align').min(0).max(10).step(0.1);
  gui.add(params, 'cohesion').min(0).max(10).step(0.1);
}

function setup() {
  createCanvasCustom();
  params.reset();
  setupGUI();
}

function draw() {
  background(51);
  flock.run();
}

function mouseDragged() {
  flock.addBoid(new Boid(mouseX, mouseY));
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    params.reset();
  }
}