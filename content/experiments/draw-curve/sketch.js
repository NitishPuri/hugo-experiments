
let vertices = []

let startY;
let len = 50
let radii = 5;   // radii of control points
let drawGuides = true;

let params = {
  drawGuides: true,
  reset: () => {
    startY = height / 2
    let num_vertices = floor(width / len) - 2
    vertices = Array(num_vertices).fill(0).map((v, i) => ({
      x: len + i * len,
      y: height / 2 + random(20),
      c1_x: len + i * len + random(20),
      c1_y: height / 2 + random(20),
      c2_x: len + i * len + random(20),
      c2_y: height / 2 + random(20),
      isCurve: random(1) > 0
    }))
  
    vertices[0].isCurve = false  
  },
  randomize: () => {
    startY = height / 2
    let num_vertices = floor(width / len) - 2
    vertices = Array(num_vertices).fill(0).map((v, i) => ({
      x: len + i * len,
      y: height / 2 + random(-300, 300),
      c1_x: len + i * len + random(-50, 50),
      c1_y: height / 2 + random(-400, 400),
      c2_x: len + i * len + random(-50, 50),
      c2_y: height / 2 + random(-400, 400),
      isCurve: random(1) > 0
    }))
  
    vertices[0].isCurve = false  
  }
}

let cnv;

function setup() {
  // put setup code here
  cnv = createCanvasCustom();
  // cnv.doubleClicked(doubleClickedHandler)
  params.reset()

  let gui = new dat.GUI()
  gui.add(params, 'drawGuides')
  gui.add(params, 'reset')
  gui.add(params, 'randomize')
}

function draw() {
  background(0);

  smooth();
  noFill();
  stroke(255)
  strokeWeight(4)

  // Draw the curve
  beginShape();
  vertex(0, startY)
  vertices.forEach(v => v.isCurve ? bezierVertex(v.c1_x, v.c1_y, v.c2_x, v.c2_y, v.x, v.y) : vertex(v.x, v.y))
  vertex(width, startY)
  endShape();

  if (params.drawGuides) {
    // Draw the control point guides.
    strokeWeight(2)
    stroke(150)
    for (let i = 0; i < vertices.length; i++) {
      if (vertices[i].isCurve) {
        line(vertices[i - 1].x, vertices[i - 1].y, vertices[i].c1_x, vertices[i].c1_y)
        line(vertices[i].x, vertices[i].y, vertices[i].c2_x, vertices[i].c2_y)
      }
    }

    // Draw the control points.
    strokeWeight(2)
    fill(255, 0, 0)
    vertices.forEach(v => v.isCurve ? ellipse(v.c1_x, v.c1_y, radii * 2) : point(v.c1_x, v.c1_y))

    fill(0, 255, 0)
    vertices.forEach(v => ellipse(v.x, v.y, radii * 2))

    fill(0, 0, 255)
    vertices.forEach(v => v.isCurve ? ellipse(v.c2_x, v.c2_y, radii * 2) : point(v.c2_x, v.c2_y))
  }
}

function distSq(x1, y1, x2, y2) {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)
}

let selectedVertex = undefined;

let VertexTypes = {
  VERTEX: 0,
  CONTROL_POINT_1: 1,
  CONTROL_POINT_2: 3,
  UNDEFINED: undefined
}
let selectedVertexType = VertexTypes.UNDEFINED;

function mousePressed() {
  for (let v_id = 0; v_id < vertices.length; v_id++) {
    let v = vertices[v_id]
    if (distSq(v.x, v.y, mouseX, mouseY) < radii * radii) {
      selectedVertex = v_id
      selectedVertexType = VertexTypes.VERTEX
      // console.log(v, v_id)
      break
    } else if (v.isCurve) {
      if (distSq(v.c1_x, v.c1_y, mouseX, mouseY) < radii * radii) {
        selectedVertex = v_id
        selectedVertexType = VertexTypes.CONTROL_POINT_1
        // console.log(v, v_id)
        break
      } else if (distSq(v.c2_x, v.c2_y, mouseX, mouseY) < radii * radii) {
        selectedVertex = v_id
        selectedVertexType = VertexTypes.CONTROL_POINT_2
        // console.log(v, v_id)
        break
      }
    }
  }
}

function mouseReleased() {
  if (selectedVertex != undefined) {
    // console.log("Released :: ", selectedVertex)
    selectedVertex = undefined
    selectedVertexType = VertexTypes.UNDEFINED
  }
}

function mouseDragged() {
  if (selectedVertex != undefined) {
    // console.log("Dragged :: ", selectedVertex)
    switch (selectedVertexType) {
      case VertexTypes.VERTEX:
        vertices[selectedVertex].x = mouseX
        vertices[selectedVertex].y = mouseY
        break
      case VertexTypes.CONTROL_POINT_1:
        vertices[selectedVertex].c1_x = mouseX
        vertices[selectedVertex].c1_y = mouseY
        break
      case VertexTypes.CONTROL_POINT_2:
        vertices[selectedVertex].c2_x = mouseX
        vertices[selectedVertex].c2_y = mouseY
        break
    }
  }
}
