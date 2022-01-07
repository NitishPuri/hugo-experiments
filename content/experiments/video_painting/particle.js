class Particle {
  constructor() {
    this.position = createVector(random(video.width * vScale), random(video.height * vScale));
    this.velocity = createVector();
    this.r = random(4, 32)
    this.col = color(255, 0)
  }
  update() {
    this.velocity.x = random(-10, 10)
    this.velocity.y = random(-10, 10)

    this.position.add(this.velocity);

    const b = 10;
    if (this.position.x > video.width * vScale + b) this.position.x = 0
    if (this.position.y > video.height * vScale + b) this.position.y = 0;
    if (this.position.x < -b) this.position.x = video.widthwidth;
    if (this.position.y < -b) this.position.y = video.height;

  }
  show() {
    const px = floor(this.position.x / vScale)
    const py = floor(this.position.y / vScale)
    var col = video.get(px, py);
    col = color(col[0], col[1], col[2])

    this.col = lerpColor(col, this.col, params.lerp)
    // this.col = col
    this.col.setAlpha(params.alpha)

    noStroke()
    fill(this.col)
    // fill(this.col[0], this.col[1], this.col[2], params.alpha)
    // fill(this.col[0], this.col[1], this.col[2], params.alpha)

    ellipse(this.position.x, this.position.y, this.r);
  }
}