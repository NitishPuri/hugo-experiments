
let params = {
  interactive: true,
  maxIterations: 800,
  colorResolution: 256,
  method: 'getColorGreen',
  methods: [
    'getColorGreen',
    'getColorWheel'
  ]
}

let t = 0;

function setup() {
  console.log("Setting up.");
  let gui = new dat.GUI();
  gui.add(params, 'interactive');
  gui.add(params, 'method', params.methods).onChange(loadShader)
  gui.add(params, 'maxIterations').min(100).max(5000).step(10).onChange(loadShader)
  gui.add(params, 'colorResolution').min(100).max(1000).step(10).onChange(loadShader)

  setInterval(updateMouse, 100);
}

function setMacroOption(src, option, value) {
  let r = new RegExp("(#define " + option + " (.*))", "g");
  let s = "#define " + option + " " + value;
  return src.replace(r, s)
}

let mousePos;
document.onmousemove = (e) => {
  mousePos = {
    x: e.pageX,
    y: e.pageY
  }
}

function updateMouse() {
  t++;
  if (params.interactive && mousePos) {
    sandbox.setUniform('u_mousePos', mousePos.x, mousePos.y)
  } else {
    let cx = (Math.sin(Math.cos(t / 10) * 10) + Math.cos(t * 2.0) / 4.0 + Math.sin(t * 3.0) / 6.0) * 0.8;
    let cy = (Math.cos(Math.sin(t / 10) * 10) + Math.sin(t * 2.0) / 4.0 + Math.cos(t * 3.0) / 6.0) * 0.8;
    cx = (cx + 1) * (window.innerWidth / 20);
    cy = (cy + 1) * (window.innerHeight / 20);

    sandbox.setUniform('u_mousePos', cx, cy)
  }
}


function compile(src) {
  // return src;
  // console.log(src)

  console.log("compiling")

  src = setMacroOption(src, 'getColor', params.method);
  src = setMacroOption(src, 'maxIterations', params.maxIterations);
  src = setMacroOption(src, 'colorResolution', params.colorResolution);
  // console.log(src)
  return src;
}