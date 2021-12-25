
var rain = [];

function setup() {
  createCanvasCustom();
  for (let i = 0; i < 500; i++) {
    rain[i] = new Drop();
  }
}

function draw() {
  background(230, 230, 250);

  rain.forEach(d => {
    d.fall();
    d.show()
  })

}
