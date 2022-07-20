let polys = [];

let angle
let delta

let params = {
  angle: 60,
  delta: 10,
  level: 1,
  tiling: '0',
  tilingOptions: {
    'Square': '0',
    'Hexagonal': '1',
    '4.8.8': '2',
    'Hexa triangle square': '3',
    'Dodeca hexa square': '4'
  },
  showGrid: true,
  angleIncrease: 0,
  deltaIncrease: 0,
  cycle: 0,
  dirty: true
}

function setup() {
  createCanvasCustom()

  gui = new dat.GUI()

  gui.add(params, 'angle').min(0).max(90).onChange(markDirty)
  gui.add(params, 'delta').min(0).max(25).onChange(markDirty)
  // gui.add(params, 'level').min(0).max(5).step(1)
  gui.add(params, 'tiling', params.tilingOptions).onChange(chooseTiling)
  gui.add(params, 'showGrid').onChange(markDirty)
  gui.add(params, 'angleIncrease').min(0).max(2).step(0.01).onChange(markDirty)
  gui.add(params, 'deltaIncrease').min(0).max(2).step(0.01).onChange(markDirty)
  gui.add(params, 'cycle').min(0).max(6.28).step(0.01).onChange(markDirty)

  chooseTiling()
}

function draw() {
  background(0)

  angle = params.angle
  delta = params.delta

  let t = 0;
  let step = params.cycle / polys.length

  polys.forEach((p, i) => {
    angle += (Math.sin(step * i)) * params.angleIncrease
    delta += (Math.sin(step * i)) * params.deltaIncrease
    if (params.dirty) {
      p.hankin();
    }
    p.show()
  })
  if (params.dirty) {
    params.dirty = false
  }

  // noLoop()
}

function markDirty() {
  params.dirty = true
}

function chooseTiling() {
  let tiles;
  switch (params.tiling) {
    case params.tilingOptions.Square:
      tiles = new SquareTiles(100)
      break
    case params.tilingOptions.Hexagonal:
      tiles = new HexagonalTiling(50)
      break
    case params.tilingOptions['4.8.8']:
      tiles = new SquareOctagonTiling(50)
      break
    case params.tilingOptions['Hexa triangle square']:
      tiles = new HexaTriangleSquareTiling(50)
      break
    case params.tilingOptions['Dodeca hexa square']:
      tiles = new DodecaHexaSquareTiling(50)
      break
    default:
      console.log('Invalid Option seleceted!!')
      tiles = new SquareTiles(100)
  }
  tiles.buildGrid()
  polys = tiles.polys

  // redraw()
  markDirty()
}
