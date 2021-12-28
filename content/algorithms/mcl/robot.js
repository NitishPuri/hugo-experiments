class Robot {
  constructor() {
    this.x = random(width)        // robot's x position
    this.y = random(height)       // robot's y position
    this.orient = random(TWO_PI)  // robot's orientation

    this.forward_noise = 0
    this.turn_noise = 0
    this.sense_noise = 0
  }

  copy() {
    let p = new Robot()
    p.set(this.x, this.y, this.orient)
    p.set_noise(this.forward_noise, this.turn_noise, this.sense_noise)

    return p
  }

  set(x, y, orient) {
    // Set robot new position and orientation
    this.x = x;
    this.y = y;
    this.orient = orient;
  }

  set_noise(forward_noise, turn_noise, sense_noise) {
    this.forward_noise = forward_noise
    this.turn_noise = turn_noise
    this.sense_noise = sense_noise
  }

  sense() {
    // Compute the distance from each landmark with a gaussian noise
    return landmarks.map(l =>
      sqrt(pow(this.x - l[0], 2) + pow(this.y - l[1], 2)) + randomGaussian(0, this.sense_noise)
    )
  }

  move(turn, forward) {
    // turn and add randomness to the turning command
    this.orient += turn + randomGaussian(0, this.turn_noise)
    this.orient = mod(this.orient, TWO_PI)

    // Move and add randomness to the motion command
    let dist = forward + randomGaussian(0, this.forward_noise)
    this.x += cos(this.orient) * dist
    this.y += sin(this.orient) * dist

    // cyclic truncate
    this.x = mod(this.x, width)
    this.y = mod(this.y, height)

    // set particle
    // let res = new Robot();
    // res.set(this.x, this.y, this.orient)
    // res.set_noise(this.forward_noise, this.turn_noise, this.sense_noise)

    // return res
  }

  measurement_prob(measurement) {
    // console.log("measurement_prob")
    return landmarks.reduce(
      (p, l, i) => {
        // console.log(p);
        return p * gaussian(sqrt(pow(this.x - l[0], 2) + pow(this.y - l[1], 2)), this.sense_noise, measurement[i])
      },
      1
    )
  }
}


// landmarks.reduce(
//   (p, l, i) => { console.log(p); return p * gaussian(sqrt(pow(10 - l[0], 2) + pow(10 - l[1], 2)), 5, z[i]) },
//   1
// )

// gaussian(sqrt(pow(10 - landmarks[0][0], 2) + pow(10 - landmarks[0][1], 2)), 5, z[0])