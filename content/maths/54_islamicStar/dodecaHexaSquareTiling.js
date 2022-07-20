class DodecaHexaSquareTiling {
  constructor(r) {
    this.polys = []
    this.r = r
  }

  buildCell(x, y) {
    let sides = 12
    let p = build_poly(x, y, this.r, sides)
    this.polys.push(p)

    p = build_poly(x, y + this.d4, this.r4, 4)
    this.polys.push(p)
    p = build_poly(x + this.d6, y, this.r6, 6)
    this.polys.push(p)

    p = build_poly(x + this.D6.x, y + this.D6.y, this.r6, 6, PI / 3);
    this.polys.push(p);
    p = build_poly(x + this.D4A.x, y + this.D4A.y, this.r4, 4, PI / 6);
    this.polys.push(p);
    p = build_poly(x + this.D4B.x, y + this.D4B.y, this.r4, 4, -PI / 6);
    this.polys.push(p);

  }

  // http://www.redblobgames.com/grids/hexagons/
  buildGrid() {
    let sides = 12;
    this.h12 = this.r * cos(PI / sides);
    this.side = this.r * sin(PI / sides);

    this.r6 = this.side / sin(PI / 6);
    this.r4 = this.side / sin(PI / 4);
    this.h6 = this.r6 * cos(PI / 6);
    this.h4 = this.r4 * cos(PI / 4);

    this.d4 = this.h12 + this.h4
    this.d6 = this.h12 + this.h6

    this.D4A = p5.Vector.fromAngle(2 * PI / 12)
    this.D4B = p5.Vector.fromAngle(-2 * PI / 12)
    this.D6 = p5.Vector.fromAngle(4 * PI / 12)
    this.D4A.setMag(this.d4)
    this.D4B.setMag(this.d4)
    this.D6.setMag(this.d6)

    // console.log("h4 : ", h4);
    //What I'm trying to do here is this:
    var h = this.h12 + this.h4;
    var w = 2 * this.h12 + 4 * this.h6 + 2 * this.h4;
    var inc = h
    // TODO: get dimensions from somewhere
    // var dim = 400;
    var row = 0;
    for (var y = -h / 2; y < width + h / 2; y += inc) {
      var startX = ((row % 2) == 0) ? -w : -w / 2;
      for (var x = startX; x < width; x += w) {
        this.buildCell(x, y);
      }
      row++;
    }
  }
}

function build_poly(x, y, r, sides, init_angle) {
  p = new Polygon(sides);
  if (init_angle == undefined) init_angle = 0;
  // rotate 360 degrees around the clock in 60 degree increments
  var inc = 2 * PI / sides;
  for (var index = 0; index < sides; index++) {
    // angular to cartesian 
    var θ = (index * inc) - inc / 2 + init_angle;
    var vX = x + r * cos(θ);
    var vY = y + r * sin(θ);
    p.addVertex(vX, vY);
  }
  p.close();
  return p;
}