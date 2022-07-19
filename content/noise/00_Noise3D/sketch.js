
var params = {
  increment: 0.01,
  scale: 20,
  zOff: 0.0,
  zIncrement: 0.02,
  lod: 8,
  falloff: 0.65,
  noise: true
}

function setup() {
  createCanvasCustom();

  var gui = new dat.GUI();
  gui.add(params, 'noise');
  gui.add(params, 'scale').min(1).max(30).step(1);
  gui.add(params, 'increment').min(0.01).max(1);
  gui.add(params, 'zIncrement').min(0.01).max(1);
  gui.add(params, 'lod').min(0).max(20);
  gui.add(params, 'falloff').min(0.01).max(1);

  // frameRate(2);

}

function draw() {
  background(0);

  noiseDetail(params.lod, params.falloff)

  const cols = floor(width / params.scale);
  const rows = floor(height / params.scale);

  var xOff = 0.0;
  for (var x = 0; x < cols; x++) {
    xOff += params.increment;
    var yOff = 0.0;
    for (var y = 0; y < rows; y++) {
      yOff += params.increment;

      let bright;
      if (params.noise) {
        // console.log("Noise!!")
        bright = noise(xOff, yOff, params.zOff) * 255;
      } else {
        bright = random(0, 255);
      }

      fill(bright);
      rect(x * params.scale, y * params.scale, params.scale, params.scale);

    }
  }

  params.zOff += params.zIncrement;
}
