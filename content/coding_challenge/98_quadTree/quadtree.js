class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  contains(point) {
    return (
      point.x >= this.x - this.w &&
      point.x <= this.x + this.w &&
      point.y > this.y - this.h &&
      point.y < this.y + this.h
    );
  }

  intersects(range) {
    return !(range.x - range.w > this.x + this.w ||
      range.x + range.w < this.x - this.w ||
      range.y - range.h > this.y + this.h ||
      range.y + range.h < this.y - this.h)
  }
}

class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.hue = random(360)
  }

  subdivide() {
    let x = this.boundary.x
    let y = this.boundary.y
    let w = this.boundary.w
    let h = this.boundary.h

    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2)
    this.northwest = new QuadTree(nw, this.capacity);
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2)
    this.northeast = new QuadTree(ne, this.capacity);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2)
    this.southwest = new QuadTree(sw, this.capacity);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2)
    this.southeast = new QuadTree(se, this.capacity);
    this.divided = true
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return;
    }
    if (this.points.length < this.capacity) {
      this.points.push(point)
      return true
    } else {
      if (!this.divided) {
        this.subdivide();
      }

      if (this.northwest.insert(point))
        return true;
      else if (this.northeast.insert(point))
        return true;
      else if (this.southwest.insert(point))
        return true;
      else if (this.southeast.insert(point))
        return true;
    }
  }

  remove(point) {


  }

  query(range, foundParam) {
    let found = foundParam || []
    if (!this.boundary.intersects(range)) {
      return found
    }

    // console.log("intersects")

    this.points.forEach(p => {
      if (range.contains(p)) {
        found.push(p);
      }
    })

    if (this.divided) {
      this.northeast.query(range, found);
      this.northwest.query(range, found);
      this.southeast.query(range, found);
      this.southwest.query(range, found);
    }

    return found;
  }

  show() {
    // strokeWeight(1)
    // stroke(this.hue, 255, 255)
    // stroke(255, 255, 255)
    // noFill()
    noStroke();
    fill(this.hue, 255, 255)
    rect(this.boundary.x, this.boundary.y, this.boundary.w * 2, this.boundary.h * 2)
    if (this.divided) {
      this.northeast.show();
      this.northwest.show();
      this.southeast.show();
      this.southwest.show();
    }

    strokeWeight(4)
    stroke(255, 255, 200);
    this.points.forEach(p => point(p.x, p.y))

  }
}