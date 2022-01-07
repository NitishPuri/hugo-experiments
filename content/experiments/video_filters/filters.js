var Filters = {
  pixelate() {
    video.loadPixels();
    background(params.bgColor)
    for (let y = 0, vh = video.height; y < vh; y++) {
      for (let x = 0, vw = video.width; x < vw; x++) {
        const index = (x + y * vw) * 4;
        const r = video.pixels[index + 0];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        const a = video.pixels[index + 3];
        const w = vScale;

        fill(r, g, b)
        rect(x * vScale, y * vScale, w, w);
      }
    }
  },
  grayscale() {
    video.loadPixels();
    background(params.bgColor)
    for (let y = 0, vh = video.height; y < vh; y++) {
      for (let x = 0, vw = video.width; x < vw; x++) {
        const index = (x + y * vw) * 4;
        const r = video.pixels[index + 0];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        const a = video.pixels[index + 3];

        const bright = (r + g + b) / 3;
        const w = map(bright, 0, 255, 0, vScale);
        // const w = vScale;

        fill(bright);
        noStroke()
        // fill(r, g, b)
        rect(x * vScale, y * vScale, w, w);
      }
    }
  },
  threshold() {
    video.loadPixels();
    background(params.bgColor)
    for (let y = 0, vh = video.height; y < vh; y++) {
      for (let x = 0, vw = video.width; x < vw; x++) {
        const index = (x + y * vw) * 4;
        const r = video.pixels[index + 0];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        const a = video.pixels[index + 3];

        const bright = (r + g + b) / 3;
        // const w = map(bright, 0, 255, 0, vScale);
        const w = vScale;
        var t = params.threshold;

        if (bright > t) {
          fill(bright);
        }
        else {
          fill(0)
        }
        noStroke()
        // fill(r, g, b)
        rect(x * vScale, y * vScale, w, w);
      }
    }
  },
  invert() {
    video.loadPixels();
    background(params.bgColor)
    for (let y = 0, vh = video.height; y < vh; y++) {
      for (let x = 0, vw = video.width; x < vw; x++) {
        const index = (x + y * vw) * 4;
        const r = video.pixels[index + 0];
        const g = video.pixels[index + 1];
        const b = video.pixels[index + 2];
        const a = video.pixels[index + 3];

        const bright = (r + g + b) / 3;
        const w = map(bright, 0, 255, vScale, 0);
        // const w = vScale;

        fill(bright);
        noStroke()
        // fill(r, g, b)
        rect(x * vScale, y * vScale, w, w);
      }
    }
  }
}