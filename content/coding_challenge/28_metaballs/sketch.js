let blobs = [];

function setup() {
  createCanvasCustom({ w: 640, h: 400 });
  pixelDensity(1)

  for (let i = 0; i < 10; i++) {
    blobs.push(new Blob(random(width), random(height)))
  }

  colorMode(HSB)
}

function draw() {
  background(0)

  loadPixels()
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let sum = 0;
      blobs.forEach(blob => {
        let d = dist(x, y, blob.pos.x, blob.pos.y)
        sum += 100 * blob.r / d;
      })
      set(x, y, color(sum, 255, 255))
    }
  }
  updatePixels()

  blobs.forEach(blob => {
    blob.update();
    // blob.show();
  })
}