// A fixed oundary class
class Boundary {
  constructor(x_, y_, w_, h_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;

    var fd = new box2d.b2FixtureDef();
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.2;

    var bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_staticBody;
    bd.position.x = scaleToWorld(this.x);
    bd.position.y = scaleToWorld(this.y);
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
    rect(this.x, this.y, this.w, this.h);
    pop();
  }
}

class Surface {
  constructor() {
    this.surface = [];

    // Perlin noise argument
    let xOff = 0.0;

    const slope = random(0.5, 0.8);
    const offset = height / 4;
    for (let x = width + 10; x >= -10; x -= 5) {
      // Doing some stuff with perlin noise to calculate a surface that points
      // down on one side.

      let y;
      if (x > width / 2) {
        y = offset + (width - x) * slope + map(noise(xOff), 0, 1, -80, 80);
      }
      else {
        y = offset + x * slope + map(noise(xOff), 0, 1, -40, 40);
      }
      constrain(y, 0, height - 5);
      xOff += 0.1;

      // console.log(x, y);

      this.surface.push(new box2d.b2Vec2(x, y));
    }

    // this.surface.push(new box2d.b2Vec2(0, height / 2));
    // this.surface.push(new box2d.b2Vec2(width / 2, height / 2 + 100));
    // this.surface.push(new box2d.b2Vec2(width, height / 2));

    // this.surface = this.surface.map(s => scaleToWorld(s));
    const vertices = this.surface.map(s => scaleToWorld(s));

    // Put the surface in the world.
    const chain = new box2d.b2ChainShape();
    chain.CreateChain(vertices, vertices.length);

    this.body = world.CreateBody(new box2d.b2BodyDef());

    const fd = new box2d.b2FixtureDef();
    fd.shape = chain;
    fd.density = 1.0;
    fd.friction = 0.5;
    fd.restitution = 0.3

    this.body.CreateFixture(fd);
  }

  display() {
    push();
    fill(127);
    stroke(0);
    beginShape();
    this.surface.forEach(v => vertex(v.x, v.y));
    vertex(0, height);
    vertex(width, height);
    endShape(CLOSE);
    pop();
  }
}