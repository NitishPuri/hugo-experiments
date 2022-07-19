class World {
  constructor(num) {
    this.food = new Food(num);
    this.bloops = [];
    for (let i = 0; i < num; i++) {
      var l = createVector(random(width), random(height));
      var dna = new DNA()
      this.bloops.push(new Bloop(l, dna))
    }
  }

  born(x, y) {
    var l = createVector(x, y);
    var dna = new DNA();
    this.bloops.push(new Bloop(l, dna))
  }

  run() {
    this.food.run();
    for (let i = this.bloops.length - 1; i >= 0; i--) {
      var b = this.bloops[i];
      b.run();
      b.eat(this.food);
      if (b.dead()) {
        this.bloops.splice(i, 1);
        this.food.add(b.position);
      }
      var child = b.reproduce();
      if (child != null) this.bloops.push(child);
    }
  }
}