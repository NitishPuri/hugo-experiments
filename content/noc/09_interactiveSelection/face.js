class Face {
  constructor(dna_, x_, y_) {
    this.rolloverOn = false;
    this.dna = dna_;
    this.x = x_;
    this.y = y_;

    this.wh = 70;
    this.fitness = 1;
    this.r = new Rectangle(this.x - this.wh / 2, this.y - this.wh / 2, this.wh, this.wh);
  }

  display() {
    const genes = this.dna.genes;
    const r = map(genes[0], 0, 1, 0, 70);           // Face size.
    const c = color(genes[1], genes[2], genes[3])   // Face color.

    const eye_y = map(genes[4], 0, 1, 0, 5);        // Eye position x
    const eye_x = map(genes[5], 0, 1, 0, 10);       // Eye position y
    const eye_size = map(genes[6], 0, 1, 0, 10);       // Eye Size
    const eyeColor = color(genes[7], genes[8], genes[9]);   // Eye Color

    const mouthColor = color(genes[10], genes[11], genes[12]);   // Eye Color
    const mouth_y = map(genes[13], 0, 1, 0, 25);
    const mouth_x = map(genes[14], 0, 1, -25, 25);
    const mouth_w = map(genes[15], 0, 1, 0, 50);
    const mouth_h = map(genes[16], 0, 1, 0, 10);

    push()
    translate(this.x, this.y);
    noStroke();

    // Draw the head.
    fill(c);
    ellipseMode(CENTER);
    ellipse(0, 0, r);

    // Draw the eyes
    fill(eyeColor);
    rectMode(CENTER)
    rect(-eye_x, -eye_y, eye_size, eye_size)
    rect(eye_x, -eye_y, eye_size, eye_size)

    // Draw the mouth
    fill(mouthColor);
    rect(mouth_x, mouth_y, mouth_w, mouth_h)

    // Draw the bounding box
    stroke(0.25);
    if (this.rolloverOn) fill(0, 0.25)
    else noFill()
    rect(0, 0, this.wh, this.wh)

    pop()

    // Display the fitness value.
    textAlign(CENTER);
    if (this.rolloverOn) fill(0);
    else fill(0.25);
    text('' + floor(this.fitness), this.x, this.y + 55);
  }

  getFitness() {
    return this.fitness
  }

  getFitness() {
    return this.fitness;
  }

  getDNA() {
    return this.dna;
  }

  rollover(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    }
    else {
      this.rolloverOn = false;
    }
  }
}