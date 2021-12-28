
var lsys;
var turtle;

// var current = 'A';
// var count = 0;

var counter = 0;

function reset() {
  var ruleset = [];
  // ruleset[0] = new Rule('F', 'FF+[+F-F-F]-[-F+F+F]')
  ruleset[0] = new Rule('F', ruleInput.value())
  lsys = new LSystem('F', ruleset);
  turtle = new Turtle(lsys.getSentence(), height / 3, radians(25));

  counter = 0;

  results = ''
  results += 'Generation ' + counter + ': ' + lsys.getSentence() + '<br>';



  show.html(results)
}

var instructions;
var show;
var ruleInput;

var results = '';

function setup() {
  createCanvasCustom();

  instructions = createP('Click the mouse to generate');
  // instructions.class('clickable');
  instructions.style('padding-left', '1rem');
  // instructions.mousePressed(generate);


  ruleDiv = createDiv('');
  ruleDiv.style('padding-left', '1rem');
  ruleInput = createInput('FF+[+F-F-F]-[-F+F+F]')
  ruleInput.parent(ruleDiv);

  // ruleInput.parent().style('padding-left', '1rem');
  // ruleInput.style('padding-left', '1rem');

  show = createP();
  show.style('padding-left', '1rem');
  show.style('word-wrap', 'break-word');

  reset();
}

function draw() {
  background(51);
  fill(0);

  translate(width / 2, height);
  rotate(-PI / 2);
  turtle.render();
}


function mousePressed() {
  if (counter < 4) {
    push();
    lsys.generate();
    turtle.setToDo(lsys.getSentence());
    turtle.changeLen(0.5);
    pop();
    counter++;

    results += 'Generation ' + counter + ': ' + lsys.getSentence() + '<br>';
    show.html(results);
  }
  else {
    reset();
  }
}
