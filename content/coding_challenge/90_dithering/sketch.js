let kitten;

let imageIndex = (img, x, y) => 4 * (x + y * img.width)

function getColorAtIndex(img, x, y) {
  let i = imageIndex(img, x, y)
  let p = img.pixels;
  let r = p[i]
  let g = p[i + 1]
  let b = p[i + 2]
  let a = p[i + 3]
  return color(r, g, b, a)
}

function setColorAtIndex(img, x, y, clr) {
  let i = imageIndex(img, x, y)
  let p = img.pixels;
  p[i + 0] = red(clr)
  p[i + 1] = green(clr)
  p[i + 2] = blue(clr)
  p[i + 3] = alpha(clr)
}


// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
let closestStep = (max, steps, value) => round(steps * value / 255) * floor(255 / steps)

function makeDithered(img, steps) {
  img.loadPixels()

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtIndex(img, x, y)
      let oldR = red(clr)
      let oldG = green(clr)
      let oldB = blue(clr)
      let newR = closestStep(255, steps, oldR)
      let newG = closestStep(255, steps, oldG)
      let newB = closestStep(255, steps, oldB)


      let newClr = color(newR, newG, newB)
      setColorAtIndex(img, x, y, newClr)

      let errR = oldR - newR
      let errG = oldG - newG
      let errB = oldB - newB

      distributeError(img, x, y, errR, errG, errB)
    }
  }

  img.updatePixels()
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB)
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB)
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB)
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB)
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;

  let clr = getColorAtIndex(img, x, y)
  clr.setRed(red(clr) + errR * factor)
  clr.setGreen(green(clr) + errG * factor)
  clr.setBlue(blue(clr) + errB * factor)

  setColorAtIndex(img, x, y, clr)
}



function preload() {
  kitten = loadImage(resolveUrl('/data/kitten.jpg'))
}

function setup() {
  createCanvasCustom()

  image(kitten, 0, 0)

  makeDithered(kitten, 1)
  image(kitten, 512, 0)

  // Apply Gray filter to the whole canvas!!
  filter(GRAY)
}




