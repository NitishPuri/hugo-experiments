let bubbles = [];
var count = 5

function setup() {
  // put setup code here
  createCanvasCustom();
  background(200);
  // randomSeed(42)
  for (let index = 0; index < count; index++) {
    const x = random(10, width - 10);
    const y = random(10, height - 10);
    const s = random(20, 40);
    bubbles[index] = new Bubble(x, y, s)
  }
}

function draw() {

  var r = random(150, 200)
  var g = random(150, 200)
  var b = random(0, 50)
  background(r, g, b, 50);
  // put drawing code here

  for (const bubble of bubbles) {
    bubble.move()
    bubble.bounce()
    bubble.display()
    for (const other of bubbles) {
      if (bubble.intersects(other)) {
        background(255, 255, 255, 150);
      }
    }
  }
}

function mousePressed() {
  for (let bubble of bubbles) {
    bubble.clicked(mouseX, mouseY)
  }
}


class Bubble {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    this.xSpeed = random(5, 10);
    this.ySpeed = random(4, 8);

    this.colorR = random(0, 250)
    this.colorG = random(0, 250)
    this.colorB = random(0, 250)
  }

  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }

  display() {

    // var r = random(200, 255)
    // var g = random(0, 100)
    // var b = random(100, 255)

    var r = random(this.colorR, 50)
    var g = random(this.colorG, 50)
    var b = random(this.colorB, 50)

    // var a = random(100, 100)
    // var r = map(mouseX, 0, width, 0, 255)
    // var g = map(mouseY, 0,height, 0, 255)
    // var b = map((mouseX+mouseY)/2, 0, (width+height)/2, 0, 255)

    fill(r, g, b, 150);
    noStroke()

    // ellipse(this.x, this.y, this.r + random(10));
    ellipse(this.x, this.y, this.r);

  }

  intersects(other) {
    if (other == this) return false;

    return dist(this.x, this.y, other.x, other.y) < (this.r + other.r);
  }

  bounce() {
    //   if(this.x > width  || this.x < 0) 
    //   this.xSpeed  =  (this.xSpeed > 0 ? -1 : 1) * random(1, 3);
    // if(this.y > height || this.y < 0) 
    //   this.ySpeed = (this.ySpeed > 0 ? -1 : 1) * random(1, 3);
    if (this.x > width || this.x < 0)
      this.xSpeed *= -1;
    if (this.y > height || this.y < 0)
      this.ySpeed *= -1;
  }
}