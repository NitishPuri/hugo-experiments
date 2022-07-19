class Surface {
  constructor() {
    this.surface = [];

    // 
    let theta = 0.0;

    for (let x = width + 10; x >= -10; x -= 5) {

      let y = map(sin(theta), -1, 1, 180, 200);
      theta += 0.15;

      this.surface.push(new box2d.b2Vec2(x, y));
    }

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