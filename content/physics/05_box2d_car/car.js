// Class for mouse joint.
class Car {
  constructor(x, y) {
    this.box = new Box(x, y, 100, 30);
    this.wheel1 = new Particle(x - 28, y + 16, 12);
    this.wheel2 = new Particle(x + 28, y + 16, 12);

    function createRevoluteJoint(b1, b2) {
      const rjd1 = new box2d.b2RevoluteJointDef();
      rjd1.Initialize(b1, b2, b2.GetWorldCenter());;
      rjd1.motorSpeed = -PI * 2.5;
      rjd1.maxMotorTorque = 500.0;
      rjd1.enableMotor = true;
      world.CreateJoint(rjd1);
    }

    createRevoluteJoint(this.box.body, this.wheel1.body);
    createRevoluteJoint(this.box.body, this.wheel2.body);
  }

  destroy() {
    this.box.killBody();
    this.wheel1.killBody();
    this.wheel2.killBody();
  }

  display() {
    this.box.display();
    this.wheel1.display();
    this.wheel2.display();
  }
}