
let cells = [];

var params  = {
  initialPopulation: 30,
  probGrow: 5,
  probMitosis: 0.3,
  backgroundAlpha: 0.1,
  vibrations: 1,
  velocityMultiplier: 1,
  reset: function () {
    backgroundHue = floor(random(255))
    cellHue = hueShift(backgroundHue, 180)
    cells = []
    for (let i = 0; i < this.initialPopulation; i++) {
      cells[i] = new Cell()
    }
    background(backgroundHue, 255, 255);
  },
}

function hueShift(h, s) {
  h += s;
  while (h >= 360) h -= 360
  while (h < 0) h += 360
  return h
}


let backgroundHue;
let cellHue;


function setup() {
  createCanvasCustom();

  colorMode(HSB)

  const gui = new dat.GUI();
  gui.add(params, 'initialPopulation').min(5).max(50);
  gui.add(params, 'vibrations').min(0).max(5);
  gui.add(params, 'velocityMultiplier').min(0).max(5);
  gui.add(params, 'probGrow').min(1).max(10);
  gui.add(params, 'probMitosis').min(0.1).max(1);
  gui.add(params, 'backgroundAlpha').min(0.005).max(0.4);
  gui.add(params, 'reset')
  
  params.reset();
}



function draw() {
  background(backgroundHue, 20, 50, params.backgroundAlpha);

  let newCells = []
  cells.forEach(cell => {
    if(!cell.dead) {
      cell.move(params.velocityMultiplier, params.vibrations);
      let child = cell.mitosis(params.probMitosis)
      if(child) 
        newCells.push(child);
      cell.grow(params.probGrow);
      cell.show();
      newCells.push(cell)
    }
  })

  cells = newCells;

  if(cells.length > 10000) {
    console.log("Simulation Overload")
    params.reset()
  }
}