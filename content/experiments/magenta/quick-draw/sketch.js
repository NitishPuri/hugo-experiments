

// const url = 'https://quickdrawfiles.appspot.com/drawing/cat?isAnimated=false&format=json&key='
let dKey = 'BJ{bTzEvI{8YDpJ{:CTNn7v3dVsNoHxqGwDu5Rx'
let eKey;

let strokeIndex = 0;
let index = 0;
let drawing;
let prevX, prevY;
let start;

let categories = ["aircraft carrier", "airplane", "alarm clock", "ambulance", "angel", "animal migration", "ant", "anvil", "apple", "arm", "asparagus", "axe", "backpack", "banana", "bandage", "barn", "baseball", "baseball bat", "basket", "basketball", "bat", "bathtub", "beach", "bear", "beard", "bed", "bee", "belt", "bench", "bicycle", "binoculars", "bird", "birthday cake", "blackberry", "blueberry", "book", "boomerang", "bottlecap", "bowtie", "bracelet", "brain", "bread", "bridge", "broccoli", "broom", "bucket", "bulldozer", "bus", "bush", "butterfly", "cactus", "cake", "calculator", "calendar", "camel", "camera", "camouflage", "campfire", "candle", "cannon", "canoe", "car", "carrot", "castle", "cat", "ceiling fan", "cello", "cell phone", "chair", "chandelier", "church", "circle", "clarinet", "clock", "cloud", "coffee cup", "compass", "computer", "cookie", "cooler", "couch", "cow", "crab", "crayon", "crocodile", "crown", "cruise ship", "cup", "diamond", "dishwasher", "diving board", "dog", "dolphin", "donut", "door", "dragon", "dresser", "drill", "drums", "duck", "dumbbell", "ear", "elbow", "elephant", "envelope", "eraser", "eye", "eyeglasses", "face", "fan", "feather", "fence", "finger", "fire hydrant", "fireplace", "firetruck", "fish", "flamingo", "flashlight", "flip flops", "floor lamp", "flower", "flying saucer", "foot", "fork", "frog", "frying pan", "garden", "garden hose", "giraffe", "goatee", "golf club", "grapes", "grass", "guitar", "hamburger", "hammer", "hand", "harp", "hat", "headphones", "hedgehog", "helicopter", "helmet", "hexagon", "hockey puck", "hockey stick", "horse", "hospital", "hot air balloon", "hot dog", "hot tub", "hourglass", "house", "house plant", "hurricane", "ice cream", "jacket", "jail", "kangaroo", "key", "keyboard", "knee", "knife", "ladder", "lantern", "laptop", "leaf", "leg", "light bulb", "lighter", "lighthouse", "lightning", "line", "lion", "lipstick", "lobster", "lollipop", "mailbox", "map", "marker", "matches", "megaphone", "mermaid", "microphone", "microwave", "monkey", "moon", "mosquito", "motorbike", "mountain", "mouse", "moustache", "mouth", "mug", "mushroom", "nail", "necklace", "nose", "ocean", "octagon", "octopus", "onion", "oven", "owl", "paintbrush", "paint can", "palm tree", "panda", "pants", "paper clip", "parachute", "parrot", "passport", "peanut", "pear", "peas", "pencil", "penguin", "piano", "pickup truck", "picture frame", "pig", "pillow", "pineapple", "pizza", "pliers", "police car", "pond", "pool", "popsicle", "postcard", "potato", "power outlet", "purse", "rabbit", "raccoon", "radio", "rain", "rainbow", "rake", "remote control", "rhinoceros", "rifle", "river", "roller coaster", "rollerskates", "sailboat", "sandwich", "saw", "saxophone", "school bus", "scissors", "scorpion", "screwdriver", "sea turtle", "see saw", "shark", "sheep", "shoe", "shorts", "shovel", "sink", "skateboard", "skull", "skyscraper", "sleeping bag", "smiley face", "snail", "snake", "snorkel", "snowflake", "snowman", "soccer ball", "sock", "speedboat", "spider", "spoon", "spreadsheet", "square", "squiggle", "squirrel", "stairs", "star", "steak", "stereo", "stethoscope", "stitches", "stop sign", "stove", "strawberry", "streetlight", "string bean", "submarine", "suitcase", "sun", "swan", "sweater", "swing set", "sword", "syringe", "table", "teapot", "teddy-bear", "telephone", "television", "tennis racquet", "tent", "The Eiffel Tower", "The Great Wall of China", "The Mona Lisa", "tiger", "toaster", "toe", "toilet", "tooth", "toothbrush", "toothpaste", "tornado", "tractor", "traffic light", "train", "tree", "triangle", "trombone", "truck", "trumpet", "t-shirt", "umbrella", "underwear", "van", "vase", "violin", "washing machine", "watermelon", "waterslide", "whale", "wheel", "windmill", "wine bottle", "wine glass", "wristwatch", "yoga", "zebra", "zigzag"]

let params = {
  loop: true,
  category: 'cat'
}

// let drawBackground = true;
let size;
let offsets = [];

function setupGUI() {
  gui = new dat.GUI()
  gui.add(params, 'loop').onChange(value => {
    if (value && drawing == undefined) {
      newDrawing();
    }
  })

  gui.add(params, 'category', categories)
}

function encrypt(s){
  let e = ''
  for(c of s){
    e = e.concat(String.fromCharCode(c.charCodeAt(0)+1))
  }
  return e;
}

function decrypt(s) {
  let d = ''
  for(c of s){
    d = d.concat(String.fromCharCode(c.charCodeAt(0)-1))
  }
  return d;
}

function setup() {
  // put setup code here
  createCanvasCustom();

  eKey = decrypt(dKey)

  setupGUI()

  newDrawing();

  size = min(width, height)
  offsets = [(width - size) / 2, (height - size) / 2]
}

function transform(x, y) {
  return { x: x * size + offsets[0], y: y * size + offsets[1] }
}

function newDrawing() {
  const url = `https://quickdrawfiles.appspot.com/drawing/${params.category}?isAnimated=false&format=json&key=${eKey}`
  loadJSON(url, gotDrawing);
}

function gotDrawing(data) {
  background(225, 225, 0)
  drawing = data.drawing;
}

function draw() {
  // put drawing code here
  if (drawing == undefined) {
    return
  }

  let coords = transform(drawing[strokeIndex][0][index] / 255, drawing[strokeIndex][1][index] / 255)
  let x = coords.x, y = coords.y;

  stroke(0);
  strokeWeight(3);

  if (prevX !== undefined) {
    line(prevX, prevY, x, y);
  }

  index++;

  if (index === drawing[strokeIndex][0].length) {
    strokeIndex++;
    prevX = undefined;
    prevY = undefined;

    index = 0;

    if (strokeIndex == drawing.length) {
      drawing = undefined;
      strokeIndex = 0;
      if (params.loop) {
        setTimeout(newDrawing, 100);
      }
    }
  } else {
    prevX = x;
    prevY = y;
  }
}