
var params = {
  reset: function () {
    tree = new Tree();
  }
}

var tree;
var max_dist = 200;
var min_dist = 10;

function setup() {
  createCanvasCustom();

  params.reset();

  var gui = new dat.GUI()
  gui.add(params, 'reset')
}

function draw() {
  background(51);

  tree.show();
  tree.grow();
}

