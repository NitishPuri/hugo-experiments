
var atmos;
var bells;

let maxim;

function preload() {
    maxim = new Maxim()
    atmos = maxim.loadFile(resolveUrl('/data/sounds/atmos1.wav'))
    bells = maxim.loadFile(resolveUrl('/data/sounds/bells.wav'))
}

let params = {
    brush1: false,
    brush2: false,
    brush3: false,
    brush4: false,
    brush5: false,
    brush6: false,
    brush7: true
}

function setup() {
    var cnv = createCanvasCustom();
    
    atmos.setLooping(true)
    bells.setLooping(true)

    var gui = new dat.GUI();
    gui.add(params, 'brush1')
    gui.add(params, 'brush2')
    gui.add(params, 'brush3')
    gui.add(params, 'brush4')
    gui.add(params, 'brush5')
    gui.add(params, 'brush6')
    gui.add(params, 'brush7')
    
    atmos.volume(0.25)
    
    background(0)
    
    rectMode(CENTER)
}

function mouseDragged() {
    atmos.play();
    bells.play();
    
    let r = map(mouseX, 0, width, 0, 255);
    let b = map(mouseY, 0, height, 0, 255);
    let g = dist(mouseX, mouseY, width / 2, height / 2);
    
    let speed = dist(pmouseX, pmouseY, mouseX, mouseY);
    let alpha = map(speed, 0, 100, 0, 5);
    // console.log(alpha)
    
    let lineWidth = map(speed, 0, 200, 10, 1)
    lineWidth = constrain(lineWidth, 0, 10)
    
    noStroke()
    fill(0, alpha)
    rect(width / 2, height / 2, width, height)
    
    stroke(r, g, b, 255)
    strokeWeight(lineWidth)
    
    //rect(mouseX, mouseY, speed, speed);
    // line(0, 0, mouseX, mouseY);
    // line(pmouseX, pmouseY, mouseX, mouseY);
    if(params.brush1) brush1(mouseX, mouseY, speed, speed, lineWidth);
    if(params.brush2) brush2(mouseX, mouseY, speed, speed, lineWidth);
    if(params.brush3) brush3(mouseX, mouseY, speed, speed, lineWidth);
    if(params.brush4) brush4(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
    
    if(params.brush5) brush5(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
    if(params.brush6) brush6(mouseX, mouseY, speed, speed, lineWidth);
    if(params.brush7) brush7(pmouseX, pmouseY, mouseX, mouseY, lineWidth);
    
    atmos.setFilter(map(mouseY, 0, height, 50, 5000), 10);
    bells.ramp(1, 1000)
    bells.speed(mouseX / width / 2);
}

function mouseReleased() {
    bells.ramp(0, 1000);
}