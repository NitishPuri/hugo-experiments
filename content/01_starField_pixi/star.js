function random() {
  if (arguments.length == 0) {
    return Math.random()
  }
  else if (arguments.length == 1) {
    return Math.random() * arguments[0]
  }
  else if (arguments.length == 2) {
    return arguments[0] + Math.random() * (arguments[1] - arguments[0])
  }
}

function map(a, l1, u1, l2, u2) {
  return l2 + (a - l1) / (u1 - l1) * (u2 - l2)
}

class Star {
  constructor() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = random(width);

    this.pz = this.z;

    this.graphic = new PIXI.Graphics()
  }

  update() {
    this.z -= params.speed;
    if (this.z < 1) {
      this.x = random(-width, width);
      this.y = random(-height, height);
      this.z = width;
      this.pz = this.z;
    }
  }

  show() {

    this.graphic.clear()

    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);


    const r = map(this.z, 0, width, 16, 0)

    this.graphic.lineStyle(0)
    this.graphic.beginFill(0xFFFFFF);
    this.graphic.drawCircle(sx, sy, r / 4)
    this.graphic.endFill();

    const px = map(this.x / this.pz, 0, 1, 0, width);
    const py = map(this.y / this.pz, 0, 1, 0, height);

    this.graphic.lineStyle(4, 0xffffff, 1)
    this.graphic.moveTo(px, py)
    this.graphic.lineTo(sx, sy)

    this.pz = this.z;
  }
}
