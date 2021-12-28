class Vehicle {
  constructor(x, y, ms, mf) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.position = createVector(x, y);
    this.r = random(4, 8);
    this.maxSpeed = ms || 4;
    this.maxForce = mf || 0.1;
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  // Behaviour :: Seek
  seek(target) {
    const desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);

    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  // Behaviour :: Arrive
  arrive(target, t) {
    const desired = p5.Vector.sub(target, this.position);
    const d = desired.magSq();

    t = t * t;
    if (d < t) {
      const m = map(d, 0, t, 0, this.maxSpeed);
      desired.setMag(m);
    }
    else {
      desired.setMag(this.maxSpeed);
    }

    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;
  }

  // Behaviour :: Stay withing bounds
  bound(d) {
    let desired = null;

    if (this.position.x < d) {
      desired = createVector(this.maxSpeed, this.velocity.y);
    }
    else if (this.position.x > width - d) {
      desired = createVector(-this.maxSpeed, this.velocity.y);
    }

    if (this.position.y < d) {
      desired = createVector(this.velocity.x, this.maxSpeed);
    }
    else if (this.position.y > height - d) {
      desired = createVector(this.velocity.x, -this.maxSpeed);
    }

    if (desired != null) {
      desired.normalize();
      desired.mult(this.maxSpeed);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }

    return createVector(0, 0);
  }

  // Behaviour :: Follow the flowfield
  followFlow(flow) {
    const desired = flow.lookup(this.position);
    desired.mult(this.maxSpeed);

    const steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);

    return steer;

  }

  // Wrap around!!!
  borders() {
    if (this.position.x < -this.r) this.position.x = width + this.r;
    if (this.position.y < -this.r) this.position.y = height + this.r;
    if (this.position.x > width + this.r) this.position.x = -this.r;
    if (this.position.y > height + this.r) this.position.y = -this.r;
  }

  bordersPath(path) {
    if (this.position.x > path.end.x + this.r) {
      this.position.x = path.start.x - this.r;
      this.position.y = path.start.y + (this.position.y - path.end.y);
    }
  }

  // Behaviour : Follow the path 
  followPath(path) {
    // Predict the location (50) frames ahead.
    const predict = this.velocity.copy();
    predict.normalize();
    predict.mult(50);
    const predictLoc = p5.Vector.add(this.position, predict);

    let normal = null;
    let target = null;
    let recordDistance = 1000000;

    for (let i = 0; i < path.points.length - 1; i++) {
      const a = path.points[i];
      const b = path.points[i + 1];

      let normalPoint = getNormalPoint(predictLoc, a, b);
      // This is a hack to deal with normal lying outside the line segment (ab)
      if (normalPoint.x < a.x || normalPoint.x > b.x) {
        normalPoint = b.copy();
      }

      const distance = p5.Vector.dist(predictLoc, normalPoint);
      if (distance < recordDistance) {
        recordDistance = distance;
        normal = normalPoint;

        const dir = p5.Vector.sub(b, a);
        dir.normalize();
        dir.mult(10);     // This should be based on the current velocity

        target = normalPoint.copy()
        target.add(dir);
      }
    }

    if (params.pathFollowing.showPathTarget) {
      fill(200);
      stroke(200);
      line(this.position.x, this.position.y, predictLoc.x, predictLoc.y);
      ellipse(predictLoc.x, predictLoc.y, 4);

      line(predictLoc.x, predictLoc.y, normal.x, normal.y);
      ellipse(normal.x, normal.y, 4);
      if (recordDistance > path.radius) fill(255, 0, 0);
      noStroke();
      ellipse(target.x, target.y, 8);
    }

    if (recordDistance > path.radius && target != null) {
      const f = this.seek(target);
      // this.arrive(target);

      return f;
    }

    return createVector(0, 0);

  }

  // Behaviour : Separation
  separate(vehicles, factor) {
    const desiredSeperation = this.r * factor;
    const sum = createVector();
    let count = 0;
    vehicles.forEach(v => {
      const d = p5.Vector.dist(this.position, v.position);
      if ((d > 0) && (d < desiredSeperation)) {
        const diff = p5.Vector.sub(this.position, v.position);
        diff.normalize();
        diff.div(d);
        sum.add(diff);
        count++;
      }
    })

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      const steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }

    return createVector(0, 0);
  }

  // Behaviour : Align
  align(vehicles, factor) {
    const desiredAlignment = this.r * factor;
    const sum = createVector();
    let count = 0;
    vehicles.forEach(v => {
      const d = p5.Vector.dist(this.position, v.position);
      if ((d > 0) && (d < desiredAlignment)) {
        sum.add(v.velocity);
        count++;
      }
    })

    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxSpeed);
      const steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    }

    return createVector(0, 0);
  }

  display() {
    var theta = this.velocity.heading() + PI / 2;
    fill(127);
    stroke(200);
    strokeWeight(1);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0, -this.r * 2);
    vertex(-this.r, this.r * 2);
    vertex(this.r, this.r * 2);
    endShape(CLOSE);
    pop();
  }
}


// A function to get normal point from a point `p` to a line segment `a-b`
// This function could be optimized to make fewer new Vector objects.
function getNormalPoint(p, a, b) {
  const ap = p5.Vector.sub(p, a);
  const ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab));
  const normalPoint = p5.Vector.add(a, ab);
  return normalPoint;
}