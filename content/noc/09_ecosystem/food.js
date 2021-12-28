class Food {
  constructor(num) {
    this.food = []
    for (let i = 0; i < num; i++) {
      this.food.push(createVector(random(width), random(height)));
    }
  }

  add(l) {
    this.food.push(l.copy());
  }


  run() {
    for (let i = 0; i < this.food.length; i++) {
      const f = this.food[i];
      rectMode(CENTER);
      stroke(0);
      fill(127);
      rect(f.x, f.y, 8, 8);
    }
  }

  getFood() {
    return this.food;
  }
}