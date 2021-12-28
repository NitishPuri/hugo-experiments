// http://www.red3d.com/cwr/steer/

let vehicles = [];

let behaviourFunctions = [
  seekBehaviour,
  arriveBehaviour,
  boundBehaviour,
  flowBehaviour,
  pathBehviour,
  separateBehaviour,
  alignmentBehaviour,
  customBehaviour
]

// Flow field
let flowField;

let path;

var gui;

var params = {
  behaviour: 1,
  behaviours: {
    Seek: 0,
    Arrive: 1,
    Bounds: 2,
    FlowField: 3,
    PathFollowing: 4,
    Separate: 5,
    Align: 5,
    Custom: 6
  },
  count: 50,
  reset() {
    vehicles = [];
    for (let i = 0; i < this.count; i++) {
      const x = random(width);
      const y = random(height);
      const ms = random(2, 5);
      const mf = random(0.1, 0.5);
      vehicles.push(new Vehicle(x, y, ms, mf));
    }
  },
  arrive: {
    arriveThreshold: 50,
    weight: 0
  },
  bound: {
    boundary: 25,
    weight: 0
  },
  flowField: {
    flowFieldResolution: 50,
    flowFieldDynamic: 0,
    flowFieldShow: false,
    weight: 0,
    resetFlow() { flowField = new Flowfield(this.flowFieldResolution) }
  },
  pathFollowing: {
    showPathTarget: false,
    weight: 0,
    resetPath() {
      path = new Path();
      path.addPoint(-20, height / 2);
      path.addPoint(random(0, width / 2), random(0, height));
      path.addPoint(random(width / 2, width), random(0, height));
      path.addPoint(width + 20, height / 2);
    },
  },
  separation: {
    desiredSeparationFactor: 2,
    weight: 0
  },
  alignment: {
    desiredAlignmentFactor: 2,
    weight: 0
  }
}

let behaviourFunction = behaviourFunctions[params.behaviour];

function init() {
  params.reset();
  params.flowField.resetFlow();
  params.pathFollowing.resetPath();
}

function seekBehaviour() {
  var mouse = createVector(mouseX, mouseY);
  vehicles.forEach(v => {
    v.applyForce(v.seek(mouse));
    v.borders();
  });
  drawMouse();
}

function arriveBehaviour() {
  var mouse = createVector(mouseX, mouseY);
  vehicles.forEach(v => {
    v.applyForce(v.arrive(mouse, params.arrive.arriveThreshold))
    v.borders();
  });
  drawMouse();
}

function boundBehaviour() {
  vehicles.forEach(v => {
    v.applyForce(v.bound(params.bound.boundary))
    v.borders();
  });
  drawBounds();
}

function flowBehaviour() {
  if ((params.flowField.flowFieldDynamic != 0)
    && (frameCount % params.flowField.flowFieldDynamic == 0)) {
    flowField.update();
  }
  vehicles.forEach(v => {
    v.applyForce(v.followFlow(flowField))
    v.borders()
  })
  if (params.flowField.flowFieldShow) {
    flowField.display();
  }
}

function pathBehviour() {
  path.display();
  vehicles.forEach(v => {
    v.applyForce(v.followPath(path))
    v.bordersPath(path)
  });
}

function separateBehaviour() {
  vehicles.forEach(v => {
    v.applyForce(v.separate(vehicles, params.separation.desiredSeparationFactor))
    v.borders();
  })
}

function alignmentBehaviour() {
  vehicles.forEach(v => {
    v.applyForce(v.align(vehicles, params.desiredAlignmentFactor))
    v.borders()
  })
}

function customBehaviour() {
  const mouse = createVector(mouseX, mouseY);
  if (params.arrive.weight > 0) {
    drawMouse();
  }
  if (params.bound.weight > 0) {
    drawBounds();
  }
  if (params.flowField.weight > 0) {
    if ((params.flowField.flowFieldDynamic != 0)
      && (frameCount % params.flowField.flowFieldDynamic == 0)) {
      flowField.update();
    }
    if (params.flowField.flowFieldShow) {
      flowField.display();
    }
  }
  if (params.pathFollowing.weight > 0) {
    path.display();
  }
  vehicles.forEach(v => {
    v.borders();
    if (params.arrive.weight > 0) {
      const f = v.arrive(mouse, params.arrive.arriveThreshold)
      f.mult(params.arrive.weight);
      v.applyForce(f);
    }
    if (params.bound.weight > 0) {
      const f = v.bound(params.bound.boundary);
      f.mult(params.bound.weight);
      v.applyForce(f);
    }
    if (params.flowField.weight > 0) {
      const f = v.followFlow(flowField);
      f.mult(params.flowField.weight);
      v.applyForce(f);
    }
    if (params.pathFollowing.weight > 0) {
      const f = v.followPath(path);
      f.mult(params.pathFollowing.weight);
      v.applyForce(f);
      v.bordersPath();
    }
    if (params.separation.weight > 0) {
      const f = v.separate(vehicles, params.separation.desiredSeparationFactor)
      f.mult(params.separation.weight);
      v.applyForce(f);
    }
    if (params.alignment.weight > 0) {
      const f = v.align(vehicles, params.alignment.desiredAlignmentFactor)
      f.mult(params.alignment.weight)
      v.applyForce();
    }
  })
}

function setupGUI() {
  gui = new dat.GUI();

  const gf = gui.addFolder('General');
  gf.add(params, 'behaviour', params.behaviours)
    .onFinishChange(value => behaviourFunction = behaviourFunctions[value])
    .name('Behaviour');
  gf.add(params, 'count').min(5).max(200).step(5).name('Vehicle Count');
  gf.add(params, 'reset').name('Reset Vehicles(r)');

  const af = gui.addFolder('Arrive');
  af.add(params.arrive, 'arriveThreshold')
    .min(0).max(100).step(10).name('Arrive Threshold');

  const bf = gui.addFolder('Bounds');
  bf.add(params.bound, 'boundary').min(10).max(150).step(10);

  const ff = gui.addFolder('Flow Field');
  ff.add(params.flowField, 'resetFlow').name('Reset Flow Field(f)');
  ff.add(params.flowField, 'flowFieldShow').name('Show(d)');
  ff.add(params.flowField, 'flowFieldResolution', [10, 20, 50, 100]).name('Resolution');
  ff.add(params.flowField, 'flowFieldDynamic', [0, 30, 60]).name('Dynamic(0 = static)');

  const pf = gui.addFolder('Path Following');
  pf.add(params.pathFollowing, 'resetPath').name('Reset Path(p)');
  pf.add(params.pathFollowing, 'showPathTarget').name('Show(d)');

  const sf = gui.addFolder('Separation');
  sf.add(params.separation, 'desiredSeparationFactor')
    .min(2).max(20).step(2).name('Factor');

  const alf = gui.addFolder('Alignment');
  alf.add(params.alignment, 'desiredAlignmentFactor')
    .min(2).max(20).step(2).name('Factor');


  const cf = gui.addFolder('Custom Weights');
  cf.add(params.arrive, 'weight').min(0).max(2).step(0.01).name('Arrive');
  cf.add(params.bound, 'weight').min(0).max(2).step(0.01).name('Bound');
  cf.add(params.flowField, 'weight').min(0).max(2).step(0.01).name('Flow');
  cf.add(params.pathFollowing, 'weight').min(0).max(2).step(0.01).name('Path');
  cf.add(params.separation, 'weight').min(0).max(2).step(0.01).name('Separate');
  cf.add(params.alignment, 'weight').min(0).max(2).step(0.01).name('Align');
}

function setup() {
  createCanvasCustom();
  init();
  setupGUI();
}

function drawMouse() {
  // Draw mouse
  fill(127);
  stroke(200);
  strokeWeight(2);
  ellipse(mouseX, mouseY, 48, 48);
}

function drawBounds() {
  // Draw bounds
  stroke(175);
  noFill();
  rectMode(CENTER);
  rect(width / 2, height / 2,
    width - params.bound.boundary * 2, height - params.bound.boundary * 2);
}

function draw() {
  background(51);

  behaviourFunction();

  vehicles.forEach(v => {
    v.update();
    v.display();
  })
}

function keyPressed() {
  if (key == 'r' || key == 'R') {
    params.reset();
  }
  else if (key == 'd' || key === 'D') {
    if (params.behaviour == params.behaviours.FlowField ||
      params.behaviour == params.behaviours.Custom) {
      params.flowField.flowFieldShow = !params.flowField.flowFieldShow
      gui.__folders['Flow Field'].__controllers
        .filter(c => c.property == 'flowFieldShow')[0]
        .updateDisplay()
    }
    if (params.behaviour == params.behaviours.PathFollowing ||
      params.behaviour == params.behaviours.Custom) {
      console.log("heree");
      params.pathFollowing.showPathTarget = !params.pathFollowing.showPathTarget
      gui.__folders['Path Following'].__controllers
        .filter(c => c.property == 'showPathTarget')[0]
        .updateDisplay()
    }
  }
  else if (key == 'f' || key == 'F') {
    if (params.behaviour == params.behaviours.FlowField ||
      params.behaviour == params.behaviours.Custom) {
      params.flowField.resetFlow();
    }
  }
  else if (key == 'p' || key == 'P') {
    if (params.behaviour == params.behaviours.PathFollowing ||
      params.behaviour == params.behaviours.Custom) {
      params.pathFollowing.resetPath();
    }
  }
}