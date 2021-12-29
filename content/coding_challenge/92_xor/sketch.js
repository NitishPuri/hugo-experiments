

// TODO: t5.js doesnt work anymore. 

let model;

let resolution = 10;
let cols;
let rows;

let xs;

const train_xs = tf.tensor2d([
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1]
])
const train_ys = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
])

function setup() {
  createCanvasCustom({ w: 400, h: 400 });

  cols = width / resolution;
  rows = height / resolution;

  let inputs = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
    }
  }
  xs = tf.tensor2d(inputs);


  model = tf.sequential();
  let hidden = tf.layers.dense({
    inputShape: [2],
    units: 2,
    activation: 'sigmoid'
  });

  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  });

  model.add(hidden);
  model.add(output);

  model.compile({
    optimizer: tf.train.sgd(0.5),
    loss: 'meanSquaredError'
  });
}

async function trainModel() {
  return await model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 10
  });
}

function draw() {
  background(0);

  tf.tidy(() => {
    trainModel().then(r => console.log(r.history.loss[0]))
  });

  noStroke()


  tf.tidy(() => {
    let ys = model.predict(xs).dataSync();

    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let x1 = i / cols;
        let x2 = j / rows;
        fill(ys[index] * 255);
        rect(i * resolution, j * resolution, resolution, resolution)
        index++;
      }
    }
  });

}
