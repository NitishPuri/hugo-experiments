let spaceship;
let movers = [];
let imgs = [];

var liquid;

var params = {
  wind: 0,
  moverCount: 5,
  mouseControl: false,
  reset: function () {
    spaceship = new Spaceship();
    movers = [];
    for (let i = 0; i < params.moverCount; i++) {
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }
  }
}

function preload() {
  imgs.push(loadImage('data/corona.png'));
  imgs.push(loadImage('data/emitter.png'));
  imgs.push(loadImage('data/particle.png'));
  imgs.push(loadImage('data/reflection.png'));
  imgs.push(loadImage('data/texture.png'));
}

function setup() {
  var canvas = createCanvasCustom();
  // var canvas = createCanvas(windowWidth - 10, windowHeight - 100, WEBGL);
  // canvas.parent(select('#sketch'));

  params.reset();

  liquid = new Liquid(0, 0, width, height, 0.01);

  // var gui = new dat.GUI();
  var gui = new dat.GUI();
  gui.add(params, 'wind').min(-0.5).max(0.5).step(0.1);
  gui.add(liquid, 'drag').min(0).max(0.1).step(0.01);
  gui.add(params, 'mouseControl');
  gui.add(params, 'moverCount')
    .min(1).max(10).step(1)
    .onFinishChange(moverCountChanged);
  gui.add(params, 'reset');
}

function moverCountChanged(value) {
  if (params.moverCount > movers.length) {
    for (let i = movers.length; i < params.moverCount; i++) {
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }
  }
  else if (params.moverCount < movers.length) {
    movers.splice(params.moverCount, movers.length - params.moverCount);
  }
}

function draw() {
  background(0);

  // liquid.render();

  var wind = createVector(params.wind, 0);

  // Update spaceship.
  spaceship.applyForce(wind);
  if (liquid.contains(spaceship)) {
    var drag = liquid.calculateDrag(spaceship);
    spaceship.applyForce(drag);
  }
  spaceship.update();
  spaceship.checkEdges();

  // Update movers
  for (let i = 0; i < movers.length; i++) {
    let mover = movers[i];
    mover.applyForce(wind);

    if (liquid.contains(mover)) {
      var drag = liquid.calculateDrag(mover);
      mover.applyForce(drag);
    }

    // 
    var d = p5.Vector.dist(mover.pos, spaceship.pos);
    if (d < (mover.mass * 20 + spaceship.r)) {
      movers[i] = new Mover(random(width), random(height), random(1, 4));
    }

    mover.update();
    mover.render();
    mover.checkEdges();
  }

  // Render spaceship after the movers.!!
  spaceship.render();

  if (params.mouseControl) {
    // var h = p5.Vector.sub(createVector(mouseX, mouseY), spaceship.pos).heading();
    var h = p5.Vector.sub(spaceship.pos, createVector(mouseX, mouseY), ).heading();

    h = h - PI / 2;
    constrain(h, -0.05, 0.05);

    spaceship.turn(h - spaceship.heading);
    if (mouseIsPressed) {
      spaceship.thrust();
    }
  }
  else {
    // Keyboard controls.
    if (keyIsPressed) {
      if (keyCode === RIGHT_ARROW) {
        spaceship.turn(0.03);
      }
      else if (keyCode === LEFT_ARROW) {
        spaceship.turn(-0.03);
      }
      else if (key === ' ') {
        spaceship.thrust();
      }
      else if (key === 'r' || key === 'R') {
        params.reset();
      }
    }
  }


  // noLoop();
}

