
var params = {
  speed: 10,
  background_opacity: 30
}

let stars = [];

function setup() {
  createCanvasCustom();
  // createCanvas(400, 400)

  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }

  const gui = new dat.GUI();
  gui.add(params, 'speed').min(5).max(50);
  gui.add(params, 'background_opacity').min(10).max(50);
     
  colorMode(HSB, 100, 100, 100, 100)
}

function draw() {
  background(0, 0, 0, params.background_opacity)

  translate(width / 2, height / 2)

  stars.forEach(s => {
    s.update();
    s.show();
  })

}

function mousePressed() {  
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}