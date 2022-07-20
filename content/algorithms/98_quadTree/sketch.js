let qtree;

function setup() {
  createCanvasCustom()
  colorMode(HSB);

  let boundary = new Rectangle(width / 2, height / 2, width / 2, height / 2)
  let capacity = 4;
  qtree = new QuadTree(boundary, capacity);

  // console.log(qt)

  // for (let i = 0; i < 1000; i++) {
  //   let p = new Point(random(width), random(height))
  //   qtree.insert(p);
  // }

  rectMode(CENTER);

  background(0, 0, 0);
  // qtree.show()
}

function draw() {

  background(0);

  if (mouseIsPressed) {
    for (let i = 0; i < 5; i++) {
      let m = new Point(mouseX, mouseY);
      qtree.insert(m);
    }
  }

  // background(0);
  qtree.show();

  stroke(0, 255, 0)
  noFill();
  rectMode(CENTER)
  let range = new Rectangle(mouseX, mouseY, 200, 200);
  rect(range.x, range.y, range.w * 2, range.h * 2)

  stroke(0, 255, 0)
  strokeWeight(6);
  let found = qtree.query(range);
  found.forEach(f => point(f.x, f.y))

  // found = found.map()
}