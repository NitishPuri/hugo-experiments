// A fixed Boundary class
class Boundary {
    constructor(x_, y_, w_, h_) {
        this.x = x_;
        this.y = y_;
        this.w = w_;
        this.h = h_;

        const bd = new box2d.b2BodyDef();
        bd.type = box2d.b2BodyType.b2_staticBody;
        bd.position.x = scaleToWorld(this.x);
        bd.position.y = scaleToWorld(this.y);

        const fd = new box2d.b2FixtureDef();
        fd.density = 1.0;
        fd.friction = 0.5;
        fd.restitution = 0.2;

        fd.shape = new box2d.b2PolygonShape();
        fd.shape.SetAsBox(this.w / (scaleFactor * 2), this.h / (scaleFactor * 2));

        this.body = world.CreateBody(bd);
        this.body.CreateFixture(fd);
    }

    // Draw the boundary.
    display() {
        fill(127);
        stroke(0)
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }
}