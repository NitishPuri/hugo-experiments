var params = {
  restart: function () {
    gol.init();
  },
  pause: false
}

var gol;

function setup() {
  createCanvasCustom();
  gol = new GOL();

  var gui = new dat.GUI();
  gui.add(params, 'restart');
  gui.add(params, 'pause');
}

function draw() {
  background(51);
  gol.display();
  if ((params.pause == false) && (frameCount % 5 == 0)) {
    gol.generate();
  }
}