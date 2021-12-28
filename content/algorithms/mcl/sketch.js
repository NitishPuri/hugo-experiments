
let landmarks = []

let params = {
  forward_noise: 5,
  turn_noise: 0.1,
  sense_noise: 100,
  numParticles: 100,
  reset: function () {
    myRobot = new Robot();
    // myRobot.set(30, 50, PI / 2)
    myRobot.set_noise(5, 0.1, 5)
    // myRobot.move(-PI / 2, 15)
    // myRobot.move(-PI / 2, 10)

    landmarks = [
      [width / 5, height / 5],
      [width / 5, height * 4 / 5],
      [width / 5, height / 2],
      [width / 2, height / 5],
      [width / 2, height * 4 / 5],
      [width * 4 / 5, height * 4 / 5],
      [width * 4 / 5, height / 5],
      [width * 4 / 5, height / 2]
    ]


    numParticles = params.numParticles
    particles = Array(numParticles).fill().map(p => {
      let r = new Robot()
      r.set_noise(params.forward_noise, params.turn_noise, params.sense_noise)
      return r;
    })

    currStep = 0
  }
}

function mod(first, second) {
  return first - second * floor(first / second)
}

function evaluation(robot, particles) {
  // Calculate the mean error of the system
  return particles.reduce((s, p) => {
    // the second part is because of world's cyclicity
    let dx = mod((p.x - robot.x + (width / 2.0)), width) - (width / 2.0);
    let dy = mod((p.y - robot.y + (height / 2.0)), height) - (height / 2.0);
    let err = sqrt(pow(dx, 2) + pow(dy, 2));
    return (s + err);
  }, 0) / particles.length;

}

// Probability of z for 1-dim Gaussian with mean mu and var sigma.
const gaussian = (mu, sigma, x) => 
  exp(-pow(mu - x, 2) / pow(sigma, 2) / 2) / sqrt(TWO_PI * pow(sigma, 2))

let myRobot;
let numParticles = 5
let particles = []
let totalSteps = 10
let currStep = 0;

function setup() {
  createCanvasCustom()

  var gui = new dat.GUI();
  gui.add(params, 'forward_noise');
  gui.add(params, 'turn_noise');
  gui.add(params, 'sense_noise');
  gui.add(params, 'numParticles');
  gui.add(params, 'reset');

  params.reset();

  frameRate(1)
  // noLoop()

}

function draw() {
  background(0)

  // Move the robot and sense the environment afterwards
  myRobot.move(0.1, 5)
  const z = myRobot.sense()

  // console.log("Initial Particles :: ")
  // console.log(particles)

  // Simulate a robot motion for each of these particles
  particles.forEach(p => p.move(0.1, 5))

  // console.log("Simulate Robot motion :: ")
  // console.log(particles)

  // Generate particle weights depending on robot's measurement
  let weights = particles.map(p => p.measurement_prob(z))
  // console.log("Weight calculation :: ", weights)

  // Resample the particles with a sample probability proportional to the importance weight
  let ps = [];
  let index = floor(random(numParticles))
  let beta = 0, mw = max(weights)

  console.log("Max weight :: ", mw)

  for (let i = 0; i < numParticles; i++) {
    beta += random(2 * mw)
    // beta += random()
    while (beta > weights[index]) {
      beta -= weights[index]
      index = mod(index + 1, numParticles)
    }
    // console.log(index)
    ps.push(particles[index].copy())
  }
  // particles = ps;

  // Evaluate the error
  console.log("Step = " + (++currStep) + ", Evaluation = " + evaluation(myRobot, ps))

  // Draw particles in green
  fill(0, 255, 0, 100)
  particles.forEach(p => ellipse(p.x, p.y, 8))

  // Draw resampled particles in yellow
  fill(255, 255, 0, 100)
  ps.forEach(p => ellipse(p.x, p.y, 8))

  // Draw landmarks in red
  fill(255, 0, 0)
  landmarks.forEach(l => ellipse(l[0], l[1], 8))

  // Draw robot position in blue
  fill(100, 0, 255)
  ellipse(myRobot.x, myRobot.y, 8)

  particles = ps

  if (totalSteps < currStep) {
    params.reset();
  }

}