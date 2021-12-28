// Class for mouse joint.
class Spring {
  constructor() {
    this.mouseJoint = null;
  }
  update(x, y) {
    if (this.mouseJoint !== null) {
      const mouseWorld = scaleToWorld(x, y);
      this.mouseJoint.SetTarget(mouseWorld);
    }
  }

  display() {
    if (this.mouseJoint !== null) {
      const posA = this.mouseJoint.GetAnchorA();
      const posB = this.mouseJoint.GetAnchorB();

      const v1 = scaleToPixels(posA.x, posA.y);
      const v2 = scaleToPixels(posB.x, posB.y);

      stroke(150);
      strokeWeight(2);
      line(v1.x, v1.y, v2.x, v2.y);
    }
  }

  // the key function
  bind(x, y, body) {
    // define the joint
    const md = new box2d.b2MouseJointDef();
    // Body A is the fake ground body
    md.bodyA = world.CreateBody(new box2d.b2BodyDef()); // world.GetGroundBody()
    // body 2 is the box.
    md.bodyB = body;
    // get the mouse location in world coordinates
    const mp = scaleToWorld(x, y);
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