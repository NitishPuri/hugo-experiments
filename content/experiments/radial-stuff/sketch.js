var theta = 0;

function setup() {
  // put setup code here
  createCanvasCustom();
  background(200);
  randomSeed(42)
}

function draw() {
  var r = random(200, 255)
  var g = random(0, 100)
  var b = random(100, 255)
  var a = random(100, 100)
  // var r = map(mouseX, 0, width, 0, 255)
  // var g = map(mouseY, 0,height, 0, 255)
  // var b = map((mouseX+mouseY)/2, 0, (width+height)/2, 0, 255)

  //background(r, g, b);
  // put drawing code here
  // fill(r, g, b, 100);

  // ellipse(random(0, width), random(0, height), 20, 20);

  stroke(r, g, b, 100)
  strokeWeight(3)
  var radius = random(10, 50);
  // angleMo
  line(mouseX - radius * cos(radians(theta)), mouseY - radius * sin(radians(theta)),
    mouseX + radius * cos(radians(theta)), mouseY + radius * sin(radians(theta)))

  theta += random(1, 100);




  // rect(1, 2, 3, h, [tl], [tr], [br], [bl])
}

function mousePressed() {
  background(250, 250, 100)
}