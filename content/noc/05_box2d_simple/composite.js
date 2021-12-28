// A pair of particles connected by a distance joint.
class Pair {
  constructor(x, y) {
    this.len = 32;
    this.p1 = new Circle(x, y, 10);
    this.p2 = new Circle(x + random(-1, 1), y + random(-1, 1), 10);

    // Create the connection between the particles
    var djd = new box2d.b2DistanceJointDef();
    djd.bodyA = this.p1.body;
    djd.bodyB = this.p2.body;
    // Equilibrium Length
    djd.length = scaleToWorld(this.len);

    // These properties affect how springy the joint is
    djd.frequencyHz = 3; // (0 - 5)
    djd.dampingRatio = 0.1; // (0 - 1)

    var dj = world.CreateJoint(djd);
  }

  attract(x, y) {
    this.p1.attract(x, y)
    this.p2.attract(x, y)
  }

  contains(x, y) {
    return (this.p1.contains(x, y) || this.p2.contains(x, y));
  }

  done() {
    return (this.p1.done() && this.p2.done());
  }

  killBody() {
    this.p1.killBody();
    this.p2.killBody();
  } // Not implemented...

  display() {
    var pos1 = scaleToPixels(this.p1.body.GetPosition());
    var pos2 = scaleToPixels(this.p2.body.GetPosition());

    stroke(0);
    strokeWeight(2);
    line(pos1.x, pos1.y, pos2.x, pos2.y);

    this.p1.display();
    this.p2.display();
  }
}

// A Plank with revolute joint and optional motor.
class Windmill {
  constructor(x, y) {
    this.len = 32;

    this.box1 = new Box(x, y - 20, 120, 10, false);
    this.box2 = new Box(x, y, 10, 40, true);

    // define the revolute joint
    var rjd = new box2d.b2RevoluteJointDef();
    rjd.Initialize(this.box1.body, this.box2.body, this.box1.body.GetWorldCenter());

    // Turning on the motor.
    rjd.motorSpeed = PI * 2;
    rjd.maxMotorTorque = 1000.0;
    rjd.enableMotor = false;

    // Create the joint
    this.joint = world.CreateJoint(rjd);
  }
  display() {
    this.box2.display();
    this.box1.display();

    var anchor = scaleToPixels(this.box1.body.GetWorldCenter());
    fill(0);
    noStroke();
    ellipse(anchor.x, anchor.y, 8);
  }

  toggleMotor() {
    this.joint.EnableMotor(!this.joint.IsMotorEnabled());
  }

  motorOn() {
    return this.joint.IsMotorEnabled();
  }
}

// Class for mouse joint.
class Spring {
  constructor() {
    this.mouseJoint = null;
  }
  update(x, y) {
    if (this.mouseJoint !== null) {
      var mouseWorld = scaleToWorld(x, y);
      this.mouseJoint.SetTarget(mouseWorld);
    }
  }

  display() {
    if (this.mouseJoint !== null) {
      let posA = this.mouseJoint.GetAnchorA();
      let posB = this.mouseJoint.GetAnchorB();

      let v1 = scaleToPixels(posA.x, posA.y);
      let v2 = scaleToPixels(posB.x, posB.y);

      stroke(150);
      strokeWeight(2);
      line(v1.x, v1.y, v2.x, v2.y);
    }
  }

  // the key function
  bind(x, y, body) {
    // define the joint
    let md = new box2d.b2MouseJointDef();
    // Body A is the fake ground body
    md.bodyA = world.CreateBody(new box2d.b2BodyDef()); // world.GetGroundBody()
    // body 2 is the box.
    md.bodyB = body;
    // get the mouse location in world coordinates
    let mp = scaleToWorld(x, y);
    md.target = mp;

    md.maxForce = 1000.0 * body.m_mass;
    md.frequencyHz = 5.0;
    md.dampingRatio = 0.9;

    this.mouseJoint = world.CreateJoint(md);
  }

  destroy() {
    if (this.mouseJoint !== null) {
      world.DestroyJoint(this.mouseJoint);
      this.mouseJoint = null;
    }
  }
}