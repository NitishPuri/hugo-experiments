
let maxim;

let samples = [];

let currentBeat = 0;

// let tracks = [];
let bpm = 70;
let drums

params = {
  hmargin: 100,
  vmargin: 25,
  numBeats: 16,
  isPlaying: false,
  reset() {
    tracks = Array(samples.length).fill().map(function () {
        return Array(params.numBeats).fill().map(t => false);
      })
  }
}

function preload() { 

  samples = [
    '/data/make_sound/OS_CLAP01.wav',
    '/data/make_sound/OS_CLAP02.wav',
    '/data/make_sound/OS_CLAP03.wav',
    '/data/make_sound/OS_CLAP04.wav',
    '/data/make_sound/OS_CLOSEDHAT01.wav',
    '/data/make_sound/OS_CLOSEDHAT02.wav',
    '/data/make_sound/OS_CLOSEDHAT03.wav',
    '/data/make_sound/OS_CLOSEDHAT04.wav',
    '/data/make_sound/OS_CLOSEDHAT05.wav',
    '/data/make_sound/OS_CLOSEDHAT06.wav',
    '/data/make_sound/OS_COWBELL01.wav',
    '/data/make_sound/OS_COWBELL02.wav',
    '/data/make_sound/OS_COWBELL03.wav',
    '/data/make_sound/OS_KICK01.wav',
    '/data/make_sound/OS_KICK02.wav',
    '/data/make_sound/OS_KICK03.wav',
    '/data/make_sound/OS_KICK04.wav',
    '/data/make_sound/OS_KICK05.wav',
    '/data/make_sound/OS_KICK06.wav',
    '/data/make_sound/OS_LOWTOM01.wav',
    '/data/make_sound/OS_LOWTOM03.wav',
    '/data/make_sound/OS_LOWTOM04.wav',
    '/data/make_sound/OS_OPENHAT01.wav',
    '/data/make_sound/OS_OPENHAT02.wav',
    '/data/make_sound/OS_OPENHAT03.wav',
    '/data/make_sound/OS_OPENHAT04.wav',
    '/data/make_sound/OS_OPENHAT05.wav',
    '/data/make_sound/OS_OPENHAT06.wav',
    '/data/make_sound/OS_SNARE01.wav',
    '/data/make_sound/OS_SNARE02.wav',
    '/data/make_sound/OS_SNARE03.wav',
    '/data/make_sound/OS_SNARE04.wav',
    '/data/make_sound/OS_SNARE05.wav',
    '/data/make_sound/OS_SNARE06.wav',
  ].map(s => ({
    sound: loadSound(s),
    name: (/[.]*OS_(.*)\.wav/g).exec(s)[1],
    pattern: [],
    phrase: new p5.Phrase(name, (time) => {
      this.sound.play(time);
    }, this.pattern)
  }));
}

function setup() {
  var cnv = createCanvasCustom();

  samples.forEach(s => s.sound.setLoop(false));

  frameRate(30);

  params.reset();

  const gui = new dat.GUI();
  gui.add(params, 'isPlaying');
  gui.add(params, 'reset');

  background(0)
}

function draw() {

  background(0);
  stroke(255);

  translate(params.hmargin, params.vmargin)
  const eWidth = (width - 1.5 * params.hmargin)
  const buttonWidth = eWidth / params.numBeats;
  const eHeight = (height - 2 * params.vmargin)
  const buttonHeight = eHeight / samples.length;

  // horizontal lines
  for (let i = 0; i < tracks.length + 1; i++)
    line(0, i * buttonHeight, eWidth, i * buttonHeight);

  // vertical lines
  for (let i = 0; i < params.numBeats + 1; i++)
    line(i * buttonWidth, 0, i * buttonWidth, (tracks.length * buttonHeight));

  // Labels
  fill(255)
  for (let i = 0; i < tracks.length; i++)
    text(samples[i].name, -params.hmargin, i * buttonHeight, params.hmargin, buttonHeight);


  fill(255, 0, 0);
  tracks.forEach((track_j, j) => {
    track_j.forEach((track_j_i, i) => {
      if (track_j_i) {
        rect(i * buttonWidth, j * buttonHeight, buttonWidth, buttonHeight);
      }
    })
  })

  if (params.isPlaying && frameCount % 4 == 0) {

    fill(0, 0, 200, 120);
    rect(currentBeat * buttonWidth, 0, buttonWidth, buttonHeight * tracks.length);

    tracks.forEach((ts, i) => {
      if (ts[currentBeat]) {
        samples[i].sound.addCue(0);
        samples[i].sound.play();
      }
    })

    currentBeat++;
    if (currentBeat >= params.numBeats)
      currentBeat = 0;
  }
}

function mouseClicked() {
  const eWidth = (width - 1.5 * params.hmargin)
  const buttonWidth = eWidth / params.numBeats;
  const eHeight = (height - 2 * params.vmargin)
  const buttonHeight = eHeight / samples.length;

  const index = Math.floor((mouseX - params.hmargin) / buttonWidth);
  const track = Math.floor((mouseY - params.vmargin) / buttonHeight);

  if (track >= 0 && track < tracks.length && index >= 0 && index < params.numBeats) {
    tracks[track][index] = !tracks[track][index];
  }
}
