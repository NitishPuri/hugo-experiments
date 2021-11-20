// window.addEventListener('load', setup)

// let width = window.innerWidth
// let height = window.innerHeight
let width = 512
let height = 512

var params = {
  speed: 10,
}

var gui;

let app = new PIXI.Application({
  width: width,
  height: height,
  antialias: true
})

let stars = [];

function setup() {
  document.getElementById('sketch-holder').appendChild(app.view)
  // document.body.appendChild(app.view)
  console.log("Here")

  let cont = new PIXI.Container()
  app.stage.addChild(cont)
  cont.x = width / 2
  cont.y = height / 2

  // cont.addChild(star.graphic)

  for (let i = 0; i < 100; i++) {
    stars[i] = new Star();
    cont.addChild(stars[i].graphic)
  }

  if (gui === undefined) {
    gui = new dat.GUI();
    gui.add(params, 'speed').min(-50).max(50);
  }

  let drawStuff = () => {
    stars.forEach(s => {
      s.update();
      s.show();
    })
  }

  app.ticker.add(drawStuff)
}

console.log("Before load,..")