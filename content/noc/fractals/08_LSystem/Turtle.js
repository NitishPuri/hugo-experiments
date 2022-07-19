class Turtle {
  constructor(s, l, t) {
    this.todo = s;
    this.len = l;
    this.theta = t;
  }

  render() {
    stroke(255);

    const todoLength = this.todo.length;
    for (let i = 0; i < todoLength; i++) {
      const c = this.todo.charAt(i);
      if (c === 'F') {
        line(0, 0, this.len, 0);
        translate(this.len, 0);
      }
      else if (c === 'G') {
        translate(this.len, 0);
      }
      else if (c === '+') {
        rotate(this.theta);
      }
      else if (c === '-') {
        rotate(-this.theta);
      }
      else if (c === '[') {
        push();
      }
      else if (c === ']') {
        pop();
      }
    }
  }

  setLen(l) {
    this.len = l;
  }

  changeLen(percent) {
    this.len *= percent;
  }

  setToDo(s) {
    this.todo = s;
  }
}