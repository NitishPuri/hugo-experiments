
// let landmarks = []

let params = {
  distance_noise: 5,
  turning_noise: 0.1,
  measurement_noise: 100,
  numParticles: 100,
  reset: function () {
    let p = GLOBAL_PARAMETERS[floor(random(1, GLOBAL_PARAMETERS.length))]
    // targetBot = new Robot(p['target_x'], p[]);

    // p['target_x'] = 100
    // p['target_y'] = 100
    // p['target_speed'] = 5

    console.log(p)

    targetBot = new Robot(p['target_x'],
      p['target_y'],
      p['target_heading'],
      2.0 * PI / p['target_period'],
      p['target_speed'],
      p['target_line_length'],
      p['random_move'])
    targetBot.set_noise(0.0, 0.0, .005 * p['target_speed'])

    OTHER = null;
    measured_path = []
    broken_path = []
    predicted_path = []
    distance_tolerance = 0.01 * targetBot.distance

    currStep = 0
    localized = false

    center = [width / 2 - targetBot.x, height / 2 - targetBot.y]
    // center = [targetBot.x, targetBot.y]
    // center = [width / 2, height / 2]
    zoom = targetBot.distance * 1
    // console.log("Center :: ", center)
    // console.log("Zoom :: ", zoom)

    // numParticles = params.numParticles

    // particles = Array(numParticles).fill().map(p => {
    //   let r = new Robot()
    //   r.set_noise(params.forward_noise, params.turn_noise, params.sense_noise)
    //   return r;
    // })

  }
}

function process_measurement(measurement) {
  // Process the last three measurements

  let m0 = OTHER['prev_measurement']
  let m1 = measurement
  OTHER['prev_measurement'] = measurement

  distance = distance_between(m0, m1)

  v2 = [m1[0] - m0[0], m1[1] - m0[1]]

  heading1 = OTHER['prev_heading']
  heading2 = atan2(v2[1], v2[0])
  OTHER['prev_heading'] = heading2

  turning = heading2 - heading1 // turning angle

  console.log("Turning :: ", turning)

  if (abs(turning) < 0.45) {   // Smooth out the heading direction as long as we did not perform a turn
    OTHER['prev_heading'] = (heading1 + heading2) / 2.0
  }

  return [distance, turning]
}

function estimate_next_pos(measurement) {
  let xy_estimate = null

  if (OTHER == null) {
    // This is the first measurement
    OTHER = {}

    // Internal state
    OTHER['M'] = 1
    OTHER['prev_measurement'] = measurement
    OTHER['prev_heading'] = 0

    // Parameters we want to estimate for successfull localization
    OTHER['distance'] = null
    OTHER['turning'] = null
    OTHER['line_length'] = null
    OTHER['moves_till_last_turn'] = 0

    return measurement
  } else if (OTHER['M'] == 1) {
    // This is the second measurement
    OTHER['M'] += 1
    let r = process_measurement(measurement)
    OTHER['distance'] = r[0]
    OTHER['moves_till_last_turn'] = 1

    return measurement
  }

  // Third and beyond
  OTHER['M'] += 1
  prev_measurement = OTHER['prev_measurement']

  let r = process_measurement(measurement)
  let distance = r[0]
  let turning = r[1]

  // Running average of distance
  OTHER['distance'] = (distance + (OTHER['M'] - 1) * OTHER['distance']) / OTHER['M']
  distance = OTHER['distance']

  if (abs(turning) < 0.45) {
    // Walking straight
    OTHER['moves_till_last_turn'] += 1
  } else {
    if (OTHER['turning'] == null) {
      OTHER['turning'] = turning
    }
    OTHER['turning'] = (OTHER['turning'] + turning) / 2.0
    OTHER['line_length'] = OTHER['moves_till_last_turn']
    OTHER['moves_till_last_turn'] = 1
  }

  heading3 = OTHER['prev_heading']   // Assume going in a straight line
  if (OTHER['line_length'] && OTHER['moves_till_last_turn'] && OTHER['moves_till_last_turn'] == OTHER['line_length']) {
    // Predict a turn
    heading3 += OTHER['turning']
  }

  xy_estimate = [
    measurement[0] + distance * cos(heading3),
    measurement[1] + distance * sin(heading3)
  ]

  return xy_estimate
}


// function evaluation(robot, particles) {
//   // Calculate the mean error of the system
//   return particles.reduce((s, p) => {
//     // the second part is because of world's cyclicity
//     let dx = mod((p.x - robot.x + (width / 2.0)), width) - (width / 2.0);
//     let dy = mod((p.y - robot.y + (height / 2.0)), height) - (height / 2.0);
//     let err = sqrt(pow(dx, 2) + pow(dy, 2));
//     return (s + err);
//   }, 0) / particles.length;

// }

// let myRobot;
// let numParticles = 5
// let particles = []
// let totalSteps = 10

let targetBot;
let currStep = 0;
let OTHER;  // Contains all state variables for the estimator

let localized = false;
let distance_tolerance;

let scale_fn;  // ~(_<./.>_-||-_<.\.>_)~

function setup() {

  scale_fn = scale; // Dooing absurd things!!!

  createCanvasCustom()

  var gui = new dat.GUI();
  gui.add(params, 'distance_noise');
  gui.add(params, 'turning_noise');
  gui.add(params, 'measurement_noise');
  gui.add(params, 'numParticles');
  gui.add(params, 'reset');

  params.reset();
  // center = [width / 2, height / 2]

  frameRate(5)
  background(0);

  // targetBot
  // noLoop()
}

let measured_path = []
let broken_path = []
let predicted_path = []

// Transforms
let center;
let zoom = 1;
let zoom_multiplier = 0.001;
let zoom_min = 0.125;
let zoom_max = 10;
let dragStart = null;

function mouseDragged() {
  if (dragStart == null) {
    dragStart = [center[0] - mouseX, center[1] - mouseY]
  }
  center[0] = mouseX + dragStart[0]
  center[1] = mouseY + dragStart[1]
}

function mouseReleased() {
  dragStart = null;
}

// function mouseWheel(event) {
//   zoom += event.delta * zoom_multiplier
//   zoom = max(zoom, zoom_min)
//   zoom = min(zoom, zoom_max)
//   return false;
// }

function drawAxes() {
  strokeWeight(1)
  stroke(255, 255, 255)
  line(-1000, 0, 1000, 0)
  line(0, -1000, 0, 1000)
}

function testGaussian() {
  noFill()
  stroke(255, 255, 255)
  strokeWeight(1 / zoom)
  rect(10, 10, 10, 10)
  for (let i = 0; i < 1000; i++) {
    let x = randomGaussian(15, 10)
    let y = randomGaussian(15, 1)
    ellipse(x, y, 1 / zoom, 1 / zoom)
  }
}

function draw() {
  background(0);

  if (localized || currStep > 1000) {
    params.reset();
  }

  translate(width / 2, height / 2)
  translate(center[0] - width / 2, center[1] - height / 2)
  scale_fn(zoom)

  currStep += 1;
  let measurement = targetBot.sense();
  let position_guess = estimate_next_pos(measurement);
  targetBot.move_in_polygon();
  let true_position = [targetBot.x, targetBot.y]
  let error = distance_between(position_guess, true_position)

  // Print the estimates and error values!!!

  if (error <= distance_tolerance) {
    console.log("You got it right!! It took you ", currStep, " steps to localize")
    localized = true
  }
  if (currStep == 1000) {
    console.log("Sorry, it took you too many steps to localize the target.")
  }

  // Draw the axes
  drawAxes()
  // testGaussian()

  // Draw the measured robot path
  stroke(255, 0, 0)
  strokeWeight(2 / zoom)
  measured_path.push(measurement)
  for (var i = 0; i < measured_path.length - 1; i++) {
    let p1 = measured_path[i]
    let p2 = measured_path[i + 1]
    line(p1[0], p1[1], p2[0], p2[1])
  }

  // Draw the broken robot path
  stroke(0, 255, 0)
  strokeWeight(1 / zoom)
  broken_path.push(true_position)
  for (var i = 0; i < broken_path.length - 1; i++) {
    let p1 = broken_path[i]
    let p2 = broken_path[i + 1]
    line(p1[0], p1[1], p2[0], p2[1])
  }


  // Draw the predicted robot path
  stroke(0, 0, 255)
  strokeWeight(1 / zoom);
  predicted_path.push(position_guess)
  for (var i = 0; i < predicted_path.length - 1; i++) {
    let p1 = predicted_path[i]
    let p2 = predicted_path[i + 1]
    line(p1[0], p1[1], p2[0], p2[1])
  }


  // // Move the robot and sense the environment afterwards
  // myRobot.move(0.1, 5)
  // const z = myRobot.sense()

  // // console.log("Initial Particles :: ")
  // // console.log(particles)

  // Simulate a robot motion for each of these particles
  // particles.forEach(p => p.move(0.1, 5))

  // console.log("Simulate Robot motion :: ")
  // console.log(particles)

  // Generate particle weights depending on robot's measurement
  // let weights = particles.map(p => p.measurement_prob(z))
  // console.log("Weight calculation :: ", weights)

  // Resample the particles with a sample probability proportional to the importance weight
  // let ps = [];
  // let index = floor(random(numParticles))
  // let beta = 0, mw = max(weights)

  // console.log("Max weight :: ", mw)

  // for (let i = 0; i < numParticles; i++) {
  //   beta += random(2 * mw)
  //   // beta += random()
  //   while (beta > weights[index]) {
  //     beta -= weights[index]
  //     index = mod(index + 1, numParticles)
  //   }
  //   // console.log(index)
  //   ps.push(particles[index].copy())
  // }
  // particles = ps;

  // Evaluate the error
  // console.log("Step = " + (++currStep) + ", Evaluation = " + evaluation(myRobot, ps))

  // Draw particles in green
  // fill(0, 255, 0, 100)
  // particles.forEach(p => ellipse(p.x, p.y, 8))

  // Draw resampled particles in yellow
  // fill(255, 255, 0, 100)
  // ps.forEach(p => ellipse(p.x, p.y, 8))

  // Draw landmarks in red
  // fill(255, 0, 0)
  // landmarks.forEach(l => ellipse(l[0], l[1], 8))

  // Draw robot position in blue
  // fill(100, 0, 255)
  // ellipse(myRobot.x, myRobot.y, 8)

  // particles = ps

  // if (totalSteps < currStep) {
  //   params.reset();
  // }

}