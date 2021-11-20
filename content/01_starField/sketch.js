
var params = {
  speed: 10,
}

let stars = [];

function setup() {
  createCanvasCustom();
  // createCanvas(400, 400)

  for (let i = 0; i < 1000; i++) {
    stars[i] = new Star();
  }

  const gui = new dat.GUI();
  gui.add(params, 'speed').min(1).max(100);
  console.log(gui)
     
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

function mousePressed() {  
  if (mouseX > 0 && mouseX < 100 && mouseY > 0 && mouseY < 100) {
    let fs = fullscreen();
    fullscreen(!fs);
  }
}