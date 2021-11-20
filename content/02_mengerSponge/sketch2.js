
let box1;

let controls;

function setup() {
  box1 = new Box(0, 0, 0, 0.2);

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 1.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;

  controls.noZoom = false;
  controls.noPan = true;

  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;

  controls.keys = [65, 83, 68];
  // controls.addEventListner('change', draw);

  // world

}

function draw() {

  box1.mesh.rotation.x += 0.01;
  box1.mesh.rotation.y += 0.02;
}
