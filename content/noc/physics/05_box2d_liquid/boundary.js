// A fixed oundary class
class Boundary {
  constructor(x_, y_, w_, h_, a_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.a = a_;

    var fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);
    bd.angle = this.a;
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));
    this.body = world.CreateBody(bd).CreateFixture(fd);
  }

  // Draw the boundary.
  display() {
    push();
    fill(127);
    stroke(0);
    rectMode(CENTER);
    translate(this.x, this.y);
    rotate(this.a);
    rect(0, 0, this.w, this.h);
    pop();
  }
}