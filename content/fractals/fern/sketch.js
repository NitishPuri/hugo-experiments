
let x, y;

// For barnsley fern
// let transform_fern = [
//   { a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0.01, color: 0 },
//   { a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.60, p: 0.85, color: 25 },
//   { a: 0.20, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.60, p: 0.07, color: 50 },
//   { a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 0.07, color: 75 }
// ]

let previous = 0;
let previousTwo = 0

let g;

class Params {
  constructor() {
    this.transforms = [
      { a: 0, b: 0, c: 0, d: 0.16, e: 0, f: 0, p: 0.01, color: 0 },
      { a: 0.85, b: 0.04, c: -0.04, d: 0.85, e: 0, f: 1.60, p: 0.85, color: 25 },
      { a: 0.20, b: -0.26, c: 0.23, d: 0.22, e: 0, f: 1.60, p: 0.07, color: 50 },
      { a: -0.15, b: 0.28, c: 0.26, d: 0.24, e: 0, f: 0.44, p: 0.07, color: 75 }
    ]
    this.preset = 'Fern'
    this.presets = []
    this.background = 10;
    this.speed = 1000;
    this.alpha = 60
    // this.rotate = 0
    this.perturb = false
    this.extents = {
      xMin: -4.5,
      xMax: 7,
      yMin: -2,
      yMax: 11
    }
  }
  reset() {
    g.background(0);

    Object.keys(gui.__folders["Transforms"].__folders).forEach((a, i) => {
      gui.__folders["Transforms"].__folders[a].__controllers.forEach(c => {
        const p = c.property;
        this.transforms[i][p] = this.presets[this.preset].transforms[i][p]
        c.updateDisplay()
      });
    });
    gui.__folders["Extents"].__controllers.forEach(c => {
      const p = c.property;
      this.extents[p] = this.presets[this.preset].extents[p]
      c.updateDisplay()
    });
  }
  clearBackground() { g.background(0) }
}

let gui;
let param = new Params();

function preload() {
  loadJSON('gui.json', setupGUI)
}

function setupGUI(data) {
  gui = new dat.GUI()

  // Load presets!
  param.preset = data.preset
  param.presets = data.presets

  gui.add(param, 'clearBackground')
  gui.add(param, 'reset')
  // let presets = gui.addFolder('Presets')
  gui.add(param, 'preset', Object.keys(param.presets)).onFinishChange(() => param.reset())
  let extents = gui.addFolder('Extents')
  extents.add(param.extents, 'xMin').min(-5).max(0).step(0.01)
  extents.add(param.extents, 'xMax').min(0).max(10).step(0.01)
  extents.add(param.extents, 'yMin').min(-5).max(0).step(0.01)
  extents.add(param.extents, 'yMax').min(0).max(20).step(0.01)
  let transforms = gui.addFolder('Transforms')
  for (let i = 0; i < param.transforms.length; i++) {
    let tf = transforms.addFolder('Transform' + (i + 1))
    tf.add(param.transforms[i], 'a').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'b').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'c').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'd').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'e').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'f').min(-5).max(5).step(0.01)
    tf.add(param.transforms[i], 'p').min(0).max(1).step(0.01)
  }
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

  // createConnection()

}

function draw() {
  // put drawing code here

  // TODO :: 3D???
  // TODO :: General Shapes?? Carpet!
  // TODO :: Movie making -- scripted property animations.
  // console.log(frameCount)
  let s = [10, 45, 80, 100]

  g.background(0, 0, 0, param.background)
  for (let i = 0; i < param.speed; i++) {
    let p = random();
    let color = 0;
    let i = 0;
    for (let t of param.transforms) {
      if (p < t.p) {
        let nextX = t.a * x + t.b * y + t.e
        let nextY = t.c * x + t.d * y + t.f

        x = nextX;
        y = nextY;
        color = t.color
        break;
      }
      i++
      p -= t.p;
    }

    // g.stroke((color) % 100, 100, 100, param.alpha)
    g.stroke(color, 100, 100, param.alpha)

    // let mx = map(x, -2.1820, 2.6558, 0, width)
    // let my = map(y, 0, 9.9983, height, 0)
    let mx = map(x, param.extents.xMin, param.extents.xMax, 0, width)
    let my = map(y, param.extents.yMin, param.extents.yMax, height, 0)
    // if (i != 3) {
    g.point(mx, my);
    // }
    // previous++
    // if (i == 3) {
    //   // if (previous > 500) {
    //   //   console.log(previous)

    //   // }
    //   previous = 0
    // }
    // previousTwo = previous
    // previous = i
  }

  // if (param.type == '0') {
  //   translate(width / 2, height / 2)
  //   rotate(frameCount * 0.001)
  //   translate(-width / 2, -height / 2)
  // }

  image(g, 0, 0, width, height)
}