
let x, y;

// For chaos game
let anchors = []
let colors = []

let previous = 0;
let previousTwo = 0

let restrictionFunctions = [
  (c) => true,
  (c) => (previous != c),
  (c) => (((previous - 1 + param.n) % param.n != c)),
  (c) => ((previous - 2 + param.n) % param.n != c) && ((previous + 2 + param.n) % param.n != c),
  (c) => ((previous - 1 + param.n) % param.n != c) && ((previousTwo - 3 + param.n) % param.n != c),
  (c) => (((previous - 1 + param.n) % param.n != c) && ((previousTwo - 3 + param.n) % param.n != c))
    || (((previous - 3 + param.n) % param.n != c) && ((previousTwo - 1 + param.n) % param.n != c)),
  (c) => (((previous - 1 + param.n) % param.n != c) && ((previousTwo - 4 + param.n) % param.n != c))
    || (((previous - 4 + param.n) % param.n != c) && ((previousTwo - 1 + param.n) % param.n != c)),
  (c) => (((previous - 1 + param.n) % param.n != c) && ((previousTwo - 4 + param.n) % param.n != c)),
  (c) => (((previousTwo - c + param.n) % 3 != 0))
  // (c) => ((previous - 1 + param.n) % param.n != c) && ((previousTwo - 3 + param.n) % param.n != c)
  // (c) => ((previous - 1 + param.n) % param.n != c) && ((previousTwo + 3 + param.n) % param.n != c)
]

let g;

class Params {
  constructor() {
    this.n = 4;
    this.ratio = 0.5;
    this.restriction = 2;
    this.background = 0;
    this.preset = ''
    this.presets = []
    this.speed = 1000;
    this.alpha = 60
    this.rotate = 0
    this.perturb = false
    this.restrictions = {
      None: 0,
      NotPrevious: 1,
      NotAdjacentLeft: 2,
      NotTwo: 3,
      NotOneAndThree: 4,
      NotOneOrThree: 5,
      NotOneOrFour: 6,
      NotOneAndFour: 7,
      NotEven: 8
    };
  }
  reset() {
    g.background(0);
    anchors = [];
    colors = [];

    let preset = this.presets[this.preset]

    this.n = preset.n
    this.ratio = preset.ratio
    this.restriction = preset.restriction

    gui.__folders['Shape'].__controllers.forEach(c => c.updateDisplay())

    let center = createVector(width / 2, height / 2);
    let radius = min(width / 2, height / 2);
    for (let i = 0; i < this.n; i++) {
      let angle = (i * TWO_PI) / this.n + random(0);
      anchors.push(createVector(radius * cos(angle) + center.x, radius * sin(angle) + center.y));
      colors.push(floor(i * 100 / this.n));
    }
  }
  clearBackground() { g.background(0) }
}

let gui;
let param = new Params();

let restrictionFunction = (...args) => {
  return restrictionFunctions[int(param.restriction)](...args)
}

function preload() {
  loadJSON('gui.json', setupGUI)
}

function setupGUI(data) {
  gui = new dat.GUI()
  // gui = new dat.GUI({ load: data, preset: "Fern" })

  // Load presets!
  param.preset = data.preset
  param.presets = data.presets

  // gui.remember(param)
  gui.add(param, 'clearBackground')
  gui.add(param, 'reset')
  gui.add(param, 'preset', Object.keys(param.presets)).onFinishChange(() => param.reset())
  let shape = gui.addFolder('Shape')
  shape.add(param, 'n').min(2).max(50).step(1)
  shape.add(param, 'ratio').min(0.01).max(0.99).step(0.01)
  shape.add(param, 'restriction', param.restrictions)
  shape.add(param, 'rotate').min(0).max(TWO_PI).step(0.01)
  gui.add(param, 'speed').min(100).max(2000).step(100)
  gui.add(param, 'alpha').min(0).max(100).step(10)
  gui.add(param, 'background').min(0).max(100).step(10)
  gui.add(param, 'perturb')
}

function setup() {
  // put setup code here
  createCanvasCustom()

  g = createGraphics(width, height)

  g.background(0)
  g.colorMode(HSB, 100, 100, 100, 100)
  g.strokeWeight(2);

  param.reset()

  x = random(windowWidth)
  y = random(windowHeight)

}

function draw() {
  // put drawing code here

  // TODO :: 3D???
  // TODO :: General Shapes?? Carpet!
  // TODO :: Movie making -- scripted property animations.

  g.background(0, 0, 0, param.background)
  let s = sin(param.rotate)
  let c = cos(param.rotate)
  for (let i = 0; i < param.speed; i++) {
    let r = floor(random(anchors.length))
    if (restrictionFunction(r)) {
      // TODO :: Color options.
      g.stroke(colors[(r + floor(frameCount / 100)) % colors.length], 100, 100, param.alpha)


      let px = x, py = y;
      x = lerp(x, anchors[r].x, param.ratio)
      y = lerp(y, anchors[r].y, param.ratio)


      // Perturbations in even? vertices 
      if (param.perturb && r % 2 == 0) {
        let n = map(noise(frameCount / 100, r / anchors.length), 0, 1, -100, 100)
        x += n
        y += n
      }

      // TODO :: rotation with rules !!
      if (param.rotate > 0.0) {
        let tx = x - anchors[r].x
        let ty = y - anchors[r].y
        x = tx * c - ty * s + anchors[r].x
        y = tx * s + ty * c + anchors[r].y
      }

      // draw lines ??
      g.point(x, y)
      // g.line(px, py, x, y)

      previousTwo = previous
      previous = r;
    }
  }

  translate(width / 2, height / 2)
  rotate(frameCount * 0.001)
  translate(-width / 2, -height / 2)

  image(g, 0, 0, width, height)
}