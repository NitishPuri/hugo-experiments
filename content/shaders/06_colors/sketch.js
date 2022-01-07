
let params = {
  // f: 1.0
  method: 'linear',
  methods: [
    'linear',
    'exponentialIn',
    'exponentialOut',
    'exponentialInOut',
    'sineIn',
    'sineOut',
    'sineInOut',
    'qinticIn',
    'qinticOut',
    'qinticInOut',
    'quarticIn',
    'quarticOut',
    'quarticInOut',
    'quadraticInOut',
    'quadraticIn',
    'quadraticOut',
    'cubicIn',
    'cubicOut',
    'cubicInOut',
    'elasticIn',
    'elasticOut',
    'elasticInOut',
    'circularIn',
    'circularOut',
    'circularInOut',
    'bounceOut',
    'bounceIn',
    'bounceInOut',
    'backIn',
    'backOut',
    'backInOut'
  ]
}

function setup() {
  console.log("Calling setup!!")
  let gui = new dat.GUI();
  // gui.add(params, 'f').min(0.01).max(10.0).step(0.01).onChange(v => {
  //   console.log("Updating uniform ::", v)
  //   sandbox.setUniform('u_fraction', v);
  // });
  gui.add(params, 'method', params.methods).onChange(loadShader)
}

function compile(src) {
  return src.replace(/(#define func (.*))/g, "#define func " + params.method)
}