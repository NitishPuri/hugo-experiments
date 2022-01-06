let bubbles = [];

var count = 5

function setup() {
  // put setup code here
  createCanvasCustom();
  background(200);
  randomSeed(1232)
  for (let index = 0; index < count; index++) {
    let x = 10 + 30 * index;
    bubbles[index] = new Bubble(random(50, width - 50), random(50, height - 50), random(20, 40))
  }
}

function draw() {

  var r = random(150, 200)
  var g = random(150, 200)
  var b = random(0, 50)
  background(r, g, b, 50);
  // put drawing code here

  for (let bubble of bubbles) {
    bubble.move()
    bubble.bounce()
    bubble.display()
  }

  // stroke(r, g, b, 100)
  // strokeWeight(3)
  // var radius = random(10, 50);
  // // angleMo
  // line(mouseX - radius*cos(radians(theta)), mouseY - radius*sin(radians(theta)),
  //  mouseX + radius*cos(radians(theta)), mouseY + radius*sin(radians(theta)))

  //  theta += random(1, 100);




  // rect(1, 2, 3, h, [tl], [tr], [br], [bl])
}

function mousePressed() {
  for (let index = bubbles.length - 1; index >= 0; index--) {
    if (bubbles[index].contains(mouseX, mouseY)) {
      bubbles.splice(index, 1);
    }
  }
}


class Bubble {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.r = tempR;
    // this.xSpeed = random(5, 10);
    // this.ySpeed = random(4, 8);

    this.colorR = random(0, 250)
    this.colorG = random(0, 250)
    this.colorB = random(0, 250)
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
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

    ellipse(this.x, this.y, this.r + random(10));

  }

  contains(x, y) {
    return (dist(this.x, this.y, x, y) < this.r)
  }

  bounce() {
    // if(this.x > width  || this.x < 0) 
    //   this.xSpeed  =  (this.xSpeed > 0 ? -1 : 1) * random(1, 3);
    // if(this.y > height || this.y < 0) 
    //   this.ySpeed = (this.ySpeed > 0 ? -1 : 1) * random(1, 3);
  }

}