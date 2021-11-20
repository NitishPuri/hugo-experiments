
var params = {
  speed: 10,
}

let stars = [];

function setup() {
  createCanvasCustom();

  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }

  const gui = new dat.GUI();
  gui.add(params, 'speed').min(-50).max(50);

  colorMode(HSB, 100, 100, 100, 100)
}

function draw() {
  background(0)

  translate(width / 2, height / 2)

  stars.forEach(s => {
    s.update();
    s.show();
  })

}