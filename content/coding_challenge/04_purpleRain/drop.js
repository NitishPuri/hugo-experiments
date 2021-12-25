class Drop {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -100);
    this.z = random(0, 20);
    this.ySpeed = map(this.z, 0, 20, 4, 10);
    this.len = map(this.z, 0, 20, 10, 20)
  }
  fall() {
    this.y += this.ySpeed;
    this.ySpeed += 0.1
    if (this.y > height) {
      this.y = random(-200, -100)
      this.ySpeed = map(this.z, 0, 20, 4, 10)
    }

  }
  show() {
    strokeWeight(map(this.z, 0, 20, 1, 3))
    stroke(138, 43, 226);
    line(this.x, this.y, this.x, this.y + this.len)
  }
}