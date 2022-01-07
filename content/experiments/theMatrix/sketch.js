
let streams = []
let symbolSize = 26

// https://en.wikipedia.org/wiki/Unicode_block
let uniStart = 0x0900
let uniRange = 1152

function setup() {
  createCanvasCustom()

  let x = 0
  for (let i = 0; i < floor(width / symbolSize); i++) {
    let stream = new Stream()
    stream.generateSymbols(x, random(-1000, 0))
    streams.push(stream)
    x += symbolSize
  }

  textSize(symbolSize)
}

function draw() {
  background(0, 150)
  streams.forEach(s => s.render())
}

class Glyph {
  constructor(x, y, speed, first) {
    this.x = x
    this.y = y
    this.value
    this.speed = speed
    this.switchInterval = round(random(2, 20))
    this.first = first
  }

  setToRandomSymbol() {
    if (this.first) {
      this.value = String.fromCharCode(0x0950)
    }
    else {
      this.value = String.fromCharCode(
        uniStart + round(random(uniRange))
      )
    }
  }

  rain() {
    this.y = (this.y > height) ? 0 : this.y + this.speed
  }
}

class Stream {
  constructor() {
    this.symbols = []
    this.totalSymbols = round(random(5, 30))
    this.speed = random(2, 10)
  }
  generateSymbols(x, y) {
    let first = (round(random(0, 1)) == 1)
    for (let i = 0; i < this.totalSymbols; i++) {
      let symbol = new Glyph(x, y, this.speed, first)
      symbol.setToRandomSymbol()
      this.symbols.push(symbol)
      y -= symbolSize

      first = false
    }
  }

  render() {
    this.symbols.forEach(symbol => {
      if (symbol.first) {
        fill(180, 255, 180)
      }
      else {
        fill(0, 255, 70)
      }
      text(symbol.value, symbol.x, symbol.y)
      symbol.rain()
      if (frameCount % symbol.switchInterval == 0) {
        symbol.setToRandomSymbol()
      }
    })
  }
}