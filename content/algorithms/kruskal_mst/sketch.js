let vertices = [];
let edges = []

// let reached = [];
// let unreached = [];

let components = [];

const edge = (u, v, w) => ({ u, v, w });

// let size = [];

let numComp;

const queue = new PriorityQueue((a, b) => a.w < b.w);

const params = {
  numPoints: 100,
  reset() {

    queue.clear();

    vertices = [];
    edges = []

    // reached = [];
    // unreached = [];

    components = [];
    size = [];

    this.numPoints = parseInt(this.numPoints)
    vertices = Array(this.numPoints).fill().map(() =>
      createVector(random(width), random(height)))

    // unreached = Array(params.numPoints).fill().map((u, i) => i);
    components = Array(params.numPoints).fill(1).map((s, i) => ({ s, i }));

    for (let i = 0; i < params.numPoints; i++) {
      for (let j = i + 1; j < params.numPoints; j++) {
        if (i == j) continue;
        queue.push(edge(i, j, dist(vertices[i].x, vertices[i].y, vertices[j].x, vertices[j].y)))
      }
    }

    numComp = params.numPoints

    console.log("Heap created!!")

    // reached.push(0);
    // unreached.splice(0, 1);
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

function getComponent(components, i) {
  while (components[i].i != i) {
    i = components[i].i;
  }
  return i;
}


function calcMST() {
  if (queue.isEmpty() || numComp == 1) {
    return;
  }

  let record = 100000;
  let rIndex;
  let uIndex;


  let found = false;
  while (!found) {

    const e = queue.pop();
    // Find which components the two vertices belong to.
    const u = getComponent(components, e.u);
    const v = getComponent(components, e.v);
    // If they belong to same component, 
    if (u == v) {
      console.log(e.u, e.v, u);
      continue;
    }

    // else
    if (components[u].s < components[v].s) {
      components[v].s += components[u].s
      components[u].i = v;
    } else {
      components[u].s += components[v].s
      components[v].i = u;
    }

    numComp--;

    edges.push(createVector(e.u, e.v));

    found = true;
  }

}

function draw() {
  background(51)

  // Calculate MST one edge per frame.
  calcMST();


  // Draw vertices
  if (numComp == 1) {
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