const TRIANGLE_AREA_COEFF = 4 / Math.sqrt(3);

// Currying function!!!
const currier = function (fn) {
  let args = Array.prototype.slice.call(arguments, 1);
  return function () {
    return fn.apply(this, args.concat(
      Array.prototype.slice.call(arguments, 0)
    ));
  }
}


const createShape = () => {
  // Try to fit a (slightly)smaller shape
  frame_counter++;
  if (frame_counter > 1000) {
    frame_counter = 0;
    counter++;
  }

  let area = 0;
  let shape_to_add = undefined;

  if (params.filling == params.fillingTypes.Random) {
    const size = floor(random(params.minSize, params.maxSize))
    area = size * size
  }
  else if (params.filling == params.fillingTypes.Statistical) {
    area = initial_area * pow(counter, -params.c);
  }

  // console.log(`Size::${sqrt(area)}`)
  let attempts = 0;

  while (attempts++ < 1000) {
    const x = random(width);
    const y = random(height);

    const new_shape = shapes.current_shape({ x, y, area })
    // const new_shape = shapeFactory(x, y, area, shapes.current_shape)

    let intersects = false;
    for (let shape of created_shapes) {
      if (shape.intersect(new_shape)) {
        intersects = true;
        break;
      }
    }

    if (!intersects) {
      shape_to_add = new_shape
      break;
    }
  }

  if (shape_to_add) {
    shape_to_add.draw();
    created_shapes.push(shape_to_add)
    counter++;
    frame_counter--;
  }


}

class Shape {
  constructor(x, y, area) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.h = floor(random(100));
    // this.h = map(area, 0, initial_area, 0, 100);
    // this.h = exp(map(log(area), 0, log(initial_area), 0, 100));
    this.vertices = [];
  }
  intersect(other) {
    // Test if the bounding circles intersect
    if (dist(this.x, this.y, other.x, other.y) > (this.radius + other.radius)) {
      return false
    }

    for (let v of this.vertices) {
      if (InsidePolygon(v, other.vertices)) {
        return true;
      }
    }

    for (let v of other.vertices) {
      if (InsidePolygon(v, this.vertices)) {
        return true;
      }
    }

    const n1 = this.vertices.length
    const n2 = other.vertices.length

    for (let i = 0; i < this.vertices.length; i++) {
      for (let j = 0; j < other.vertices.length; j++) {
        if (LineIntersect(
          { p1: this.vertices[i], p2: this.vertices[(i + 1) % n1] },
          { p1: other.vertices[i], p2: other.vertices[(i + 1) % n2] }
        )) {
          return true;
        }
      }
    }
  }
  draw() {
    noStroke()
    if (params.rainbow) {
      fill(this.h, 100, 100)
    }
    else {
      fill(params.block_color)
    }
    beginShape();
    this.vertices.forEach(v => vertex(v.x, v.y))
    endShape(CLOSE);
  }
  clear() {
    if (params.rainbow) {
      fill(0, 0, 100)
    }
    else {
      fill(params.background_color)
    }
    beginShape();
    this.vertices.forEach(v => vertex(v.x, v.y))
    endShape(CLOSE);
  }
  contains(x, y) {
    return InsidePolygon({ x: x, y: y }, this.vertices)
  }
}

const circle = ({ x, y, area }) => {
  const shape = new Shape(x, y, area);

  shape.radius = sqrt(area / PI)
  shape.draw = function () {
    if (params.rainbow) {
      fill(shape.h, 100, 100);
    }
    else {
      fill(params.block_color)
    }
    ellipse(this.x, this.y, this.radius * 2)
  }
  shape.intersect = function (other) {
    return dist(this.x, this.y, other.x, other.y) < (this.radius + other.radius)
  }
  shape.clear = function () {
    if (params.rainbow) {
      stroke(0, 0, 100)
      fill(0, 0, 100)
    }
    else {
      stroke(params.background_color)
      fill(params.background_color)
    }
    ellipse(this.x, this.y, this.radius * 2)
  }
  shape.contains = function (x, y) {
    return (dist(this.x, this.y, x, y) < this.radius)
  }

  return shape;
}

const triangle = ({ x, y, area }, isInverted) => {

  const shape = new Shape(x, y, area);

  let side = sqrt(area * TRIANGLE_AREA_COEFF)
  let r = (2 * side) / (3 * TRIANGLE_AREA_COEFF);

  shape.x = x
  shape.y = y
  shape.radius = 2 * r;

  if (isInverted) {
    shape.vertices.push({ x: x - side / 2, y: y - r })
    shape.vertices.push({ x: x + side / 2, y: y - r })
    shape.vertices.push({ x: x, y: y + shape.radius })
  }
  else {
    shape.vertices.push({ x: x - side / 2, y: y + r })
    shape.vertices.push({ x: x, y: y - shape.radius })
    shape.vertices.push({ x: x + side / 2, y: y + r })
  }

  return shape
}

const rectangle = ({ x, y, area }, aspect = 1, angle = 0) => {
  const shape = new Shape(x, y, area);

  shape.height = sqrt(area / aspect);
  shape.width = shape.height * aspect;

  // shape.size = sqrt(area);
  shape.x = x + shape.width / 2;
  shape.y = y + shape.height / 2;
  shape.radius = dist(x, y, shape.x, shape.y);

  shape.vertices.push({ x: x, y: y })
  shape.vertices.push({ x: x + shape.width, y: y })
  shape.vertices.push({ x: x + shape.width, y: y + shape.height })
  shape.vertices.push({ x: x, y: y + shape.height })

  const drawDiagonals = true;
  if (drawDiagonals) {
    const offset = random(0.7, 0.8);
    const one_offset = 1 - offset;

    shape.drawSuper = shape.draw;
    shape.draw = () => {
      shape.drawSuper()

      if (params.rainbow) { stroke(0) }
      else { stroke(params.accent_color) }

      line(x, y, x + shape.width, y + shape.height * offset)
      line(x + shape.width, y, x, y + shape.height * offset)
      line(x, y + shape.height, x + shape.width, y + shape.height * one_offset)
      line(x + shape.width, y + shape.height, x, y + shape.height * one_offset)
    }
  }

  return shape;
}

