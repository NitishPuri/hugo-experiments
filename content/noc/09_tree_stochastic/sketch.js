
var theta = 0;
var yOff = 0;
var seed = 42;

function setup() {
  createCanvasCustom();
  smooth();
  // newTree();
}


function draw() {
  background(255);
  fill(0);
  stroke(0);
  translate(width / 2, height);
  yOff += 0.005;
  randomSeed(seed);
  branch(200, 0);
  // noLoop();
}

function mousePressed() {
  yOff = random(1000);
  seed = millis();
  // newTree();
}

// function newTree() {
//   background(51);

//   stroke(255);
//   push();
//   translate(width/2, height*2/3);
//   branch(120);
//   pop();
// }

function branch(h, xoff) {

  const sw = map(h, 2, 120, 1, 5);
  strokeWeight(sw);

  line(0, 0, 0, -h);

  translate(0, -h);

  h *= 0.7;
  xoff += 0.1;

  if (h > 4) {
    const n = Math.floor(random(1, 4));
    for (let i = 0; i < n; i++) {
      // const theta = random(-PI/3, PI/3);
      let theta = map(noise(xoff + i * 5, yOff), 0, 1, -PI / 3, PI / 3);
      if (n % 2 == 0) theta *= -1;

      push();
      rotate(theta);
      branch(h, xoff);
      pop();
    }
  }
}
