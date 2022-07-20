class LSystem {
  constructor(axiom, r) {
    this.sentence = axiom;
    this.ruleset = r;
    this.generation = 0;
  }

  generate() {
    var nextGen = '';
    var n = this.sentence.length;
    for (let i = 0; i < n; i++) {
      var replace = this.sentence.charAt(i);
      for (let j = 0; j < this.ruleset.length; j++) {
        const a = this.ruleset[j].getA();
        if (a === replace) {
          replace = this.ruleset[j].getB();
          break;
        }
      }

      nextGen += replace;
    }

    this.sentence = nextGen;
    this.generation++;
  }

  getSentence() {
    return this.sentence;
  }

  getGeneration() {
    return this.generation;
  }
}