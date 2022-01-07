
let params = {
  // f: 1.0
  method: 'identity',
  methods: [
    'identity',
    'wave',
    'smoothtest',
    'smoothMouse',
    'almostIdentity',
    'impulse',
    'cubicPulse',
    'expStep',
    'gain',
    'parabola',
    'pcurve',
    'sinc',
    'doubleExponentialSeat',
    'doubleExponentialSigmoid',
    'logisticSigmoid',
    'blinnWyvillCosineApproximation',
    'doubleCubicSeatWithLinearBlend',
    'doubleOddPolynomialSeat',
    'doublePolynomialSigmoid',
    'quadraticThroughAGivenPoint',
    'circularEaseIn',
    'circularEaseOut',
    'doubleCircleSeat',
    'doubleCircleSigmoid',
    'doubleEllipticSeat',
    'doubleEllipticSigmoid',
    'quadraticBezier',
    'cubicBezier',
    'cubicBezierNearlyThroughTwoPoints'
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