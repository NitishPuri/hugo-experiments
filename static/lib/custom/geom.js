// http://paulbourke.net/fractals/randomtile/InsidePolygon.c
// Returns true of point 'v' lies inside the polygon 'p'
// \param v {x : <num>, y : <num> }
// \param p [{x : <num>, y : <num> }, ...]
function InsidePolygon(v, p) {
  const n = p.length;
  let angle = 0;
  for (let i = 0; i < n; i++) {
    const p1 = { x: p[i].x - v.x, y: p[i].y - v.y }
    const p2 = { x: p[(i + 1) % n].x - v.x, y: p[(i + 1) % n].y - v.y }
    angle += Angle2D(p1, p2);
  }
  return (abs(angle) >= PI)
}

// http://paulbourke.net/fractals/randomtile/InsidePolygon.c
// Return the angle between two vectors on a plane
// The angle is from vector 1 to vector 2, positive anticlockwise
// \param p1  {x: <num>, y: <num> }
function Angle2D(p1, p2) {
  const theta1 = atan2(p1.y, p1.x);
  const theta2 = atan2(p2.y, p2.x);
  let dtheta = theta2 - theta1;

  while (dtheta > PI) {
    dtheta -= TWO_PI;
  }
  while (dtheta < -PI) {
    dtheta += TWO_PI;
  }

  return dtheta;
}

// http://paulbourke.net/fractals/randomtile/LineIntersect.c
// Return true if the lines intersect
// \param line1 {p1: {x: <num>, y: <num>}, p2: {x: <num>, y: <num>} }
// \param line2 {p1: {x: <num>, y: <num>}, p2: {x: <num>, y: <num>} }
function LineIntersect(line1, line2) {
  const x1 = line1.p1.x, y1 = line1.p1.y;
  const x2 = line1.p2.x, y2 = line1.p2.y;
  const x3 = line2.p1.x, y3 = line2.p1.y;
  const x4 = line2.p2.x, y4 = line2.p2.y;

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  const numera = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  const numerb = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  // Are the lines coincident?
  if (Math.abs(numera) < Number.EPSILON && Math.abs(numerb) < Number.EPSILON && Math.abs(denom) < Number.EPSILON) {
    return true;
  }

  // Are the lines parallel?
  if (Math.abs(denom) < Number.EPSILON) {
    return false;
  }

  // Is the intersection along the segments?
  const mua = numera / denom;
  const mub = numerb / denom;
  if (mua < 0 || mua > 1 || mub < 0 || mub > 1) {
    return false;
  }

  return true;
}
