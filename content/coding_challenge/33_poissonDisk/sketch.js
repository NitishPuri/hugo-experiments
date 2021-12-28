let r = 5  // 'r' pixels apart
let k = 30

let grid = []
let active = []
let order = []

let w
let cols
let rows

function setup() {
  createCanvasCustom();

  background(0);
  strokeWeight(4)

  w = r / sqrt(2)

  // STEP 0
  cols = floor(width / w)
  rows = floor(height / w)

  grid = new Array(cols * rows)

  colorMode(HSB)

  // for (let i = 0; i < cols * rows; i++) {
  //   grid[i] = undefined
  // }

  // for (let y = 0; y < rows; y++) {
  //   for (let x = 0; x < cols; x++) {
  //     grid.push(-1)
  //   }
  // }


  // STEP 1
  let pos = createVector(width / 2, height / 2)
  let i = floor(pos.x / w)
  let j = floor(pos.y / w)
  grid[i + j * cols] = pos
  active.push(pos)
  // order.push(pos)
}

function draw() {
  background(0);

  // STEP 2
  for (let l = 0; l < 10; l++) {
    if (active.length > 0) {
      let randIndex = floor(random(active.length))
      let pos = active[randIndex]
      let found = false
      for (let n = 0; n < k; n++) {
        let sample = p5.Vector.random2D()
        let m = random(r, 2 * r)
        sample.setMag(m)
        sample.add(pos)

        let sCol = floor(sample.x / w)
        let sRow = floor(sample.y / w)

        if (sCol >= 0 && sCol < cols && sRow >= 0 && sRow < rows && !grid[sCol + sRow * cols]) {
          let ok = true;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              let index = (sCol + i) + (sRow + j) * cols
              let neighbor = grid[index]
              if (neighbor) {
                // console.log(sample)
                // console.log(neighbor)
                let d = p5.Vector.dist(sample, neighbor)
                if (d < r) {
                  ok = false
                }
              }
            }
          }

          if (ok) {
            found = true
            grid[sCol + sRow * cols] = sample
            active.push(sample)
            // break
          }

        }

      }
      if (!found) {
        order.push(active[randIndex])
        active.splice(randIndex, 1)
      }
    }
  }


  // stroke(255)
  // strokeWeight(2)
  // for (let i = 0; i < grid.length; i++) {
  //   if (grid[i]) {
  //     stroke(i / 100 % 360, 100, 100)
  //     point(grid[i].x, grid[i].y)
  //   }
  // }

  stroke(255, 0, 255)
  strokeWeight(r / 2)
  order.forEach((a, i) => {
    stroke(i % 360, 100, 100)
    point(a.x, a.y)
  })

  stroke(255, 0, 255)
  strokeWeight(r / 2)
  active.forEach((a, i) => {
    stroke(0, 50, 100)
    point(a.x, a.y)
  })
}