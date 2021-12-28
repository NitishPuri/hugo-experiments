class Box {
  constructor(x, y, w, h) {
    this.w = w;
    this.h = h;

    // Define a body
    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Create the body
    this.body = world.CreateBody(bd);
    // this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    // this.body.SetAngularVelocity(random(-5, 5));

    // Define a fixture
    var fd = new box2d.b2FixtureDef();

    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Attach the ficture
    this.body.CreateFixture(fd);

    // this.body.SetUserData(this);
  }

  killBody() {
    world.DestroyBody(this.body);
  }

  display() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
  }
}