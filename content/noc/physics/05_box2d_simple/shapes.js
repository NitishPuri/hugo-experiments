// Base Shape class that defines a box2d body
class Shape {
  constructor(x, y, lock = false) {
    // Define a body
    var bd = new box2d.b2BodyDef();
    if (lock) bd.type = box2d.b2BodyType.b2_staticBody;
    else bd.type = box2d.b2BodyType.b2_dynamicBody;
    bd.position = scaleToWorld(x, y);

    // Create the body
    this.body = world.CreateBody(bd);
    this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
    this.body.SetAngularVelocity(random(-5, 5));
  }

  defineShape() {
    throw new Error("Abstract method!!!");
  }

  display() {
    throw new Error("Abstract method!!!");
  }

  // This function removes the body from box2d world.
  killBody() {
    world.DestroyBody(this.body);
  }

  contains(x, y) {
    const worldPoint = scaleToWorld(x, y);
    const f = this.body.GetFixtureList();
    return f.TestPoint(worldPoint);
  }

  attract(x, y) {
    const m = scaleToWorld(x, y);
    const b = this.body.GetWorldCenter();
    m.SelfSub(b);
    m.SelfNormalize();
    m.SelfMul(50.0);
    this.body.ApplyForce(m, b);
  }

  // Is the particle ready for deletion ? 
  done() {
    var pos = scaleToPixels(this.body.GetPosition());
    if (pos.y > height) {
      this.killBody();
      return true;
    }
    return false;
  }

}

// Box shape!!
class Box extends Shape {
  constructor(x, y, w, h, lock) {
    super(x, y, lock);
    this.w = w;
    this.h = h;
    this.defineShape();
  }

  defineShape() {

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

// Circle Shape!!
class Circle extends Shape {
  constructor(x, y, r_) {
    super(x, y);
    this.r = r_;
    this.defineShape();
  }

  defineShape() {
    // Define a fixture
    var fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2CircleShape();
    fd.shape.m_radius = scaleToWorld(this.r);
    // fd.shape.SetAsBox(scaleToWorld(this.size.x/2), scaleToWorld(this.size.y/2));
    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Attach the ficture
    this.body.CreateFixture(fd);
  }

  display() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(0);
    strokeWeight(2);
    // rect(0, 0, this.size.x, this.size.y);
    ellipse(0, 0, this.r * 2);
    line(0, 0, this.r, 0);
    pop();
  }
}

// Custom Polygonal Shape
class CustomShape extends Shape {
  constructor(x, y) {
    super(x, y);
    this.defineShape();
  }

  defineShape() {
    // Define a fixture
    var fd = new box2d.b2FixtureDef();

    var vertices = [];
    vertices[3] = scaleToWorld(-15, 25);
    vertices[2] = scaleToWorld(15, 0);
    vertices[1] = scaleToWorld(20, -15);
    vertices[0] = scaleToWorld(-10, -10);

    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsArray(vertices, vertices.length);

    // Some physics
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    // Attach the ficture
    this.body.CreateFixture(fd);
  }

  display() {
    // Get the body's position
    var pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    var a = this.body.GetAngleRadians();

    var f = this.body.GetFixtureList();
    var ps = f.GetShape();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(0);
    strokeWeight(2);
    ellipse(0, 0, 20, 20);
    beginShape();
    for (let i = 0; i < ps.m_count; i++) {
      var v = scaleToPixels(ps.m_vertices[i]);
      vertex(v.x, v.y);
    }
    endShape(CLOSE);
    pop();
  }
}

class Lollipop extends Shape {
  constructor(x, y) {
    super(x, y);
    this.w = 8;
    this.h = 24;
    this.r = 8;
    this.defineShape();
  }
  defineShape() {
    var fd1 = new box2d.b2FixtureDef();
    fd1.shape = new box2d.b2PolygonShape();
    fd1.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));
    fd1.density = 1.0;
    fd1.friction = 0.5;
    fd1.restitution = 0.2;
    this.body.CreateFixture(fd1);

    var fd2 = new box2d.b2FixtureDef();
    fd2.shape = new box2d.b2CircleShape();
    fd2.shape.m_radius = scaleToWorld(this.r);
    var offset = scaleToWorld(new box2d.b2Vec2(0, this.h / 2));
    fd2.shape.m_p = new box2d.b2Vec2(offset.x, offset.y);
    fd2.density = 1.0;
    fd2.friction = 0.5;
    fd2.restitution = 0.2;
    this.body.CreateFixture(fd2);
  }
  display() {
    var pos = scaleToPixels(this.body.GetPosition());
    var a = this.body.GetAngleRadians();

    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(0);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    ellipse(0, -this.h / 2, this.r * 2);
    pop();
  }
}