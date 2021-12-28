class Robot {
  // Attributes:
  //     random_move_count(int): number of moves before randomly disobeying a move command
  //     move_counter(int): current move count.
  //     x(float): x position.
  //     y(float): y position.
  //     heading(float): angle currently facing with 0 being east.
  //     turning(float): angle to turn each time a turn is taken.
  //     distance(float): distance to travel for each move.
  //     line_length(int): number of times to travel straight before executing a turn.
  //     line_count(int): how many straight segments the robot has traveled so far since last turn.
  //     turning_noise(float): turning noise.
  //     distance_noise(float): distance traveled noise.
  //     measurement_noise(float): noise of location measurement.
  constructor(x, y, heading, turning, distance, line_length, random_move) {
    this.x = x || 0.0
    this.y = y || 0.0
    this.heading = heading || 0.0
    this.turning = turning || 2 * Math.PI / 10
    this.distance = distance || 1.0
    this.line_length = line_length || 1
    this.random_move = random_move
    this.move_counter = 0
    this.line_count = 0

    this.turning_noise = 0
    this.distance_noise = 0
    this.measurement_noise = 0

    // print(this.x, this.y)
  }

  copy() {
    let p = new Robot()
    p.set(this.x, this.y, this.orient)
    p.set_noise(this.forward_noise, this.turn_noise, this.sense_noise)

    return p
  }

  set(x, y, heading) {
    // Set robot new position and orientation
    this.x = x;
    this.y = y;
    this.heading = heading;
  }

  set_noise(turning_noise, distance_noise, measurement_noise) {
    this.turning_noise = turning_noise
    this.distance_noise = distance_noise
    this.measurement_noise = measurement_noise

    // console.log("Robot Noise :: ", turning_noise, distance_noise, measurement_noise)
  }

  sense() {
    // This function represents the robot sensing its location. When
    // measurements are noisy, this will return a value that is close to,
    // but not necessarily equal to, the robot's (x, y) position.

    return [randomGaussian_NP(this.x, this.measurement_noise), randomGaussian_NP(this.y, this.measurement_noise)]
  }

  move(turn, distance, tolerance = 0.001, max_turning_angle = Math.PI) {

    if (this.random_move && this.move_counter && this.move_counter % this.random_move == 0) {
      // console.log("Random move!!")
      let rand_change = random(0, 1)
      turn = turn * rand_change
      distance = distance * rand_change
    }

    this.move_counter += 1

    // Apply noise
    turn = randomGaussian_NP(turn, this.turning_noise)
    distance = randomGaussian_NP(distance, this.distance_noise)

    // Truncate to fir physical limitations
    turn = max(-max_turning_angle, turn)
    turn = min(max_turning_angle, turn)
    distance = max(0.0, distance)


    // Execute motion
    this.heading += turn
    this.heading = angle_trunc(this.heading)
    this.x += distance * cos(this.heading)
    this.y += distance * sin(this.heading)

    // cyclic truncate
    // this.x = mod(this.x, width)
    // this.y = mod(this.y, height)
  }

  move_in_circle() {
    // This function is used to advance the runaway target bot
    this.move(this.turning, this.distance)
  }

  move_in_polygon() {
    // This function is used to advance the runaway target in a polygon shape
    if (this.line_count == this.line_length) {
      this.move_in_circle()
      this.line_count = 0
    } else {
      this.move(0.0, this.distance)
    }

    this.line_count += 1
  }


  // measurement_prob(measurement) {
  //   // console.log("measurement_prob")
  //   return landmarks.reduce(
  //     (p, l, i) => {
  //       // console.log(p);
  //       return p * gaussian(sqrt(pow(this.x - l[0], 2) + pow(this.y - l[1], 2)), this.sense_noise, measurement[i])
  //     },
  //     1
  //   )
  // }
}


