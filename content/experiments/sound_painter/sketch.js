
var atmos;
var bells;

let maxim;

function preload() {
  maxim = new Maxim()
  atmos = maxim.loadFile(resolveUrl('/data/sounds/atmos1.wav'))
  bells = maxim.loadFile(resolveUrl('/data/sounds/bells.wav'))
}

function setup() {
  var cnv = createCanvasCustom();

  atmos.setLooping(true)
  bells.setLooping(true)

  atmos.volume(0.25)

  background(0)

  rectMode(CENTER)
}

function mouseDragged() {
  atmos.play();
  bells.play();

  let r = map(mouseX, 0, width, 0, 255);
  let b = map(mouseY, 0, height, 0, 255);
  let g = dist(mouseX, mouseY, width / 2, height / 2);

  let speed = dist(pmouseX, pmouseY, mouseX, mouseY);
  let alpha = map(speed, 0, 100, 0, 5);
  console.log(alpha)

  let lineWidth = map(speed, 0, 200, 10, 1)
  lineWidth = constrain(lineWidth, 0, 10)

  noStroke()
  fill(0, alpha)
  rect(width / 2, height / 2, width, height)

  stroke(r, g, b, 255)
  strokeWeight(lineWidth)

  //rect(mouseX, mouseY, speed, speed);
  // line(0, 0, mouseX, mouseY);
  // line(pmouseX, pmouseY, mouseX, mouseY);
  // brush1(mouseX, mouseY, speed, speed, lineWidth);
  // brush2(mouseX, mouseY, speed, speed, lineWidth);
  // brush3(mouseX, mouseY, speed, speed, lineWidth);
  // brush4(pmouseX, pmouseY, mouseX, mouseY, lineWidth);

  // brush5(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
  // brush6(mouseX, mouseY, speed, speed, lineWidth);
  brush7(pmouseX, pmouseY, mouseX, mouseY, lineWidth);

  atmos.setFilter(map(mouseY, 0, height, 50, 5000), 10);
  bells.ramp(1, 1000)
  bells.speed(mouseX / width / 2);
}

function mouseReleased() {
  bells.ramp(0, 1000);
}