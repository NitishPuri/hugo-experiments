
let cells = [];

var params  = {
  initialPopulation: 30,
  probGrow: 5,
  probMitosis: 0.3,
  reset: function () {
    cells = []
    for (let i = 0; i < this.initialPopulation; i++) {
      cells[i] = new Cell()
    }
    background(0);
  },
}

function setup() {
  createCanvasCustom();

  const gui = new dat.GUI();
  gui.add(params, 'initialPopulation').min(5).max(50);
  gui.add(params, 'probGrow').min(1).max(10);
  gui.add(params, 'probMitosis').min(0.1).max(1);
  gui.add(params, 'reset')
  
  params.reset();
}

function draw() {
  background(0);

  let newCells = []
  cells.forEach(cell => {
    if(!cell.dead) {
      cell.move();
      let child = cell.mitosis(params.probMitosis)
      if(child) 
        newCells.push(child);
      cell.grow(params.probGrow);
      cell.show();
    }
  })

  cells = cells.concat(newCells);

  if(cells.length > 100000) {
    console.log("Simulation Overload")
    params.reset()
  }
}