
var theta = 0;

function setup() {
  createCanvasCustom();
}


function draw() {
  background(51);
  theta = map(mouseX, 0, width, 0, PI);
  translate(width / 2, height * 2 / 3);
  stroke(255);
  strokeWeight(2);
  branch(120);
}

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  len *= 0.66;
  if (len > 2) {
    push();
    rotate(theta);
    branch(len);
    pop();

    push();
    rotate(-theta);
    branch(len);
    pop();
  }
}
