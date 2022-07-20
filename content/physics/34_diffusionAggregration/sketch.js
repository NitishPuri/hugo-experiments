
let tree = []
let walkers = []
let numWalkers = 500
let iterations = 100

let radius = 8

function setup() {
  // createCanvasCustom();
  createCanvasCustom({ w: 800, h: 800 });


  tree[0] = new Walker(width / 2, height / 2);

  for (let i = 0; i < numWalkers; i++) {
    walkers[i] = new Walker()
  }

  colorMode(HSB)

  background(0)

}

function draw() {

  background(0)

  tree.forEach(t => t.show())
  walkers.forEach(w => w.show())

  for (let j = 0; j < iterations; j++) {
    for (let i = walkers.length - 1; i >= 0; i--) {
      let w = walkers[i]
      w.walk()
      if (w.checkStuck(tree)) {
        tree.push(w)
        walkers.splice(i, 1)
      }
    }
  }


  if (radius > 2) {
    // if (walkers.length < numWalkers) {
    //   radius *= 0.9
    // }
    while (walkers.length < numWalkers) {
      if (radius > 2) {
        walkers.push(new Walker())
      }
    }
  }


}