class Skeleton {
  constructor() {
    // Create an empty skeleton
    this.bodies = [];
    this.joints = [];
    this.radius = 100;
    this.totalPoints = 32;
    this.bodyRadius = 10;

    const center = createVector(width / 2, height / 2);

    // Create the bodies
    for (let index = 0; index < this.totalPoints; index++) {
      const theta = map(index, 0, this.totalPoints, 0, TWO_PI);
      const x = center.x + this.radius * sin(theta);
      const y = center.y + this.radius * cos(theta);

      // Make an individual body
      const bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.fixedRotation = true;
      bd.position = scaleToWorld(x, y);
      const body = world.CreateBody(bd);

      // Make a circle shape
      const cs = new box2d.b2CircleShape();
      cs.m_radius = scaleToWorld(this.bodyRadius);

      // Define a Fixture
      const fd = new box2d.b2FixtureDef();
      fd.shape = cs;
      fd.density = 1.0;
      fd.friction = 0.5;
      fd.restitution = 0.3;

      body.CreateFixture(fd);
      this.bodies.push(body);
    }

    // Now connect the outline,.!!
    for (let index = 0; index < this.bodies.length; index++) {
      var djd = new box2d.b2DistanceJointDef();
      const bodyA = this.bodies[index];
      const next = (index + 1) % this.bodies.length;
      const bodyB = this.bodies[next];

      // Connection between previous particle and this one.
      djd.bodyA = bodyA;
      djd.bodyB = bodyB;

      // Equilibrium length is the distance between the two bodies.
      const aPos = bodyA.GetWorldCenter();
      const bPos = bodyB.GetWorldCenter();
      const d = dist(aPos.x, aPos.y, bPos.x, bPos.y);
      djd.length = d;

      // Springiness of the joint..
      djd.frequencyHz = 10;
      djd.dampingRatio = 0.9;

      // Make the joint!!!
      const dj = world.CreateJoint(djd);
      this.joints.push(dj);
    }

    // Make some joints that cross the center of the blob between bodies.
    for (let index1 = 0; index1 < this.bodies.length; index1++) {
      for (let index2 = index1 + 2; index2 < this.bodies.length; index2 += 4) {
        const djd = new box2d.b2DistanceJointDef();
        const bodyA = this.bodies[index1];
        const bodyB = this.bodies[index2];

        // Connection between previous particle and this one.
        djd.bodyA = bodyA;
        djd.bodyB = bodyB;

        // Equilibrium length is the distance between the two bodies.
        const aPos = bodyA.GetWorldCenter();
        const bPos = bodyB.GetWorldCenter();
        const d = dist(aPos.x, aPos.y, bPos.x, bPos.y);
        djd.length = d;

        // Springiness of the joint..
        djd.frequencyHz = 3;
        djd.dampingRatio = 0.1;

        // Make the joint!!!
        const dj = world.CreateJoint(djd);
        this.joints.push(dj);
      }
    }
  }

  displaySkeleton() {
    stroke(0);
    strokeWeight(1);
    this.joints.forEach(joint => {
      const posA = scaleToPixels(joint.GetBodyA().GetWorldCenter());
      const posB = scaleToPixels(joint.GetBodyB().GetWorldCenter());
      line(posA.x, posA.y, posB.x, posB.y);
    });

    this.bodies.forEach(body => {
      const pos = scaleToPixels(body.GetWorldCenter());
      const angle = body.GetAngleRadians();
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      fill(175);
      stroke(0);
      strokeWeight(1);
      ellipse(0, 0, this.bodyRadius * 2);
      pop();
    });
  }

  // Draw it as a creature!!
  displayCreature() {
    let center = createVector(0, 0);

    // Make a curvy polygon
    push();
    beginShape();
    stroke(100);
    strokeWeight(this.bodyRadius * 2);
    fill(150);
    // strokeWeight(2);
    this.bodies.forEach(body => {
      const pos = scaleToPixels(body.GetWorldCenter());
      curveVertex(pos.x, pos.y);
      center.add(createVector(pos.x, pos.y));
    });
    endShape(CLOSE);
    pop();

    // Find the center.
    center.mult(1.0 / this.bodies.length);

    // console.log(center);
    fill(200, 0, 0);
    ellipse(center.x, center.y, 20, 20)

    // Find the angle between center and side body
    const pos = scaleToPixels(this.bodies[0].GetWorldCenter());
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const angle = atan2(dy, dx) - PI / 2;

    // Draw eyes and mouth relative to the center.
    push();
    strokeWeight(1);
    stroke(0);
    translate(center.x, center.y);
    rotate(angle);
    fill(0);
    ellipse(-25, -50, 16, 16);
    ellipse(25, -50, 16, 16);
    line(-50, 50, 50, 50);
    pop();
  }

  getFirstBody() {
    return this.bodies[0];
  }
}

