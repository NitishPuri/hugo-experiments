
var video;
var snapshots = [];
var go = false;
var counter = 0;
var w = 160;
var h = 120;
var total;

function setup() {
  createCanvasCustom()
  // createCanvas(320, 240);

  total = floor(width / w) * floor(height / h)

  background(51)
  video = createCapture(VIDEO, function () {
    go = true;
  });
  video.size(320, 240)
  video.hide()
}

var off = 0;
function draw() {
  if (go) {
    if (off == 0) off = frameCount;
    snapshots[counter] = video.get();
    counter++;
    if (counter == total) {
      counter = 0
    }
  }

  var ox = (width % w) / 2;
  var oy = (height % h) / 2;
  translate(ox, oy)
  var x = 0;
  var y = 0;
  for (let i = 0, n = snapshots.length; i < n; i++) {
    // tint(200, 0, 200)
    // const index = (i + counter) % snapshots.length;
    const index = (counter - i + n - 1) % n;
    image(snapshots[index], x, y, w, h);
    // textSize(20)
    // stroke(0);
    // text('(' + i + ',' + index + ')', x + 10, y + 20);
    x += w;
    if ((x / w) > (floor(width / w) - 1)) {
      x = 0;
      y += h;
    }
  }
}
