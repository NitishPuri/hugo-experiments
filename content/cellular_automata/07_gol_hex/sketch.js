// Rules based on this blog.
// https://www.gamedev.net/blogs/entry/2261919-is-there-a-hexagonal-analog-of-conways-game-of-life/

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
  // gol.debug();
  if ((params.pause == false) && (frameCount % 10 == 0)) {
    gol.generate();
  }
}