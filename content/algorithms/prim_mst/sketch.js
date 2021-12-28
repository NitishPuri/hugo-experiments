let vertices = [];
let edges = []

let reached = [];
let unreached = [];

const params = {
  numPoints : 100,
  reset() {
    vertices = [];
    edges = []

    reached = [];
    unreached = [];

    this.numPoints = parseInt(this.numPoints)
    vertices = Array(params.numPoints).fill().map(() => 
      createVector(random(width), random(height)))

    unreached = Array(params.numPoints).fill().map((u, i) => i);

    reached.push(0);
    unreached.splice(0, 1);
  }
}

function setup() {
  createCanvasCustom()

  var gui = new dat.GUI();
  gui.add(params, 'numPoints').min(50).max(1000);
  gui.add(params, 'reset');

  params.reset();

  frameRate(10);
}


function calcMST() {
    let record = 100000;
    let rIndex;
    let uIndex;

    // find a closest pair of points connecting the different groups
    for (let j = 0; j < unreached.length; j++) {
      for (let i = 0; i < reached.length; i++) {
        const v1 = vertices[reached[i]];
        const v2 = vertices[unreached[j]];
        const d = dist(v1.x, v1.y, v2.x, v2.y);
        if (d < record) {
          record = d;
          rIndex = i;
          uIndex = j;
        }
      }
    }

    edges.push(createVector(reached[rIndex], unreached[uIndex]));

    reached.push(unreached[uIndex])
    unreached.splice(uIndex, 1);
}

function draw() {
  background(51)

  // Calculate MST one edge per frame.
  calcMST();


  // Draw vertices
  if(unreached.length == 0) {
    fill(255, 0, 0)
    stroke(255, 0, 0)
  }
  else {
    fill(255)
    stroke(255)
  }

  const sz = map(params.numPoints, 50, 1000, 16, 8);
  vertices.forEach(v => 
    ellipse(v.x, v.y, sz)
  )

  // Draw edges
  strokeWeight(2);
  edges.forEach(edge => 
    line(vertices[edge.x].x, vertices[edge.x].y, vertices[edge.y].x, vertices[edge.y].y)
  )
}