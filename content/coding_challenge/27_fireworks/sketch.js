let fireworks = [];
let gravity;

let pCount = 0;

function setup() {
  createCanvasCustom({
    statsFunc: () => "FPS : " + floor(frameRate()) + " , Particles : " + pCount
  });

  gravity = createVector(0, 0.2)
  fireworks.push(new Firework());

  colorMode(HSB)

}

function draw() {
  background(0, 0.05);

  if (random(1) < 0.1) {
    fireworks.push(new Firework());
  }

  for (let i = fireworks.length - 1; i >= 0; i--) {
    let f = fireworks[i];
    if (f.done()) {
      fireworks.splice(i, 1)
    }
    f.update();
    f.show();
  }

  // remove dead particles.
}
