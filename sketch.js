let initMouseX,
  initMouseY = 0;
let endMouseX,
  endMouseY = 0;
let count,
  pCount = 0;
let l1Init, l1End, l2Init, l2End, l3Init, l3End, l4Init, l4End, l5Init, l5End;
let pMill = 0;
let toBeShown;
let randNum;
let started = false;
let alpha = 255;
let fade = 0;
let fader = 3;

function setup() {
  createCanvas(1280, 720);
  background(255);
  //   l1Init,
  //     l1End,
  //     l2Init,
  //     l2End,
  //     l3Init,
  //     l3End,
  //     l4Init,
  //     l4End,
  //     l5Init,
  //     (l5End = createVector(0, 0));
  console.log(data[0].events[5]);
  count = 0;
  randNum = int(random(data.lenght));
}

function draw() {
  //background(220);
  console.log(count);
  let mill = millis();
  //console.log(data[randNum].events[count]);
  if (!started) {
    toBeShown = data[randNum].initText;
    writeText();
    if (alpha <= 0) {
      alpha = 255;
      started = true;
    }
  } else if (data[randNum].events[count]) {
    toBeShown = data[randNum].events[count];
    console.log(toBeShown);
    writeText();
  } else if (count > 0 && count % 5 == 0 && mill - pMill > 2000) {
    background(255);
    pMill = mill;
  } else if (mouseIsPressed) {
    strokeWeight(4);
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  //console.log(mouseX,mouseY);
}

function mousePressed() {
  initMouseX = mouseX;
  initMouseY = mouseY;
  //console.log("hello",initMouseX, initMouseY);
}

function mouseReleased() {
  endMouseX = pmouseX;
  endMouseY = pmouseY;
  checkLine();
  //console.log("hello",endMouseX, endMouseY);
  //addToStore();
}

function checkLine() {
  if (count % 5 != 0) {
    count++;
    //addToStore();
  } else {
    count++;
    //addToStore();
    pMill = millis();
    console.log(pMill);
  }
}

function writeText() {
  background(255);
  fill(0, alpha);
  textFont("Cormorant Garamond");
  textAlign(CENTER);
  textSize(24);
  text(toBeShown, width / 2 - 450, height / 2, 900);
  alpha -= fade;
}

function keyPressed() {
  if (keyCode === 66) {
    console.log("Key  typed");
    fade = fader;
  }
}

// function addToStore(){
//   if (count % 5 == 1){
//     l1Init.set(initMouseX, initMouseY);
//     l1End.set(initMouseX, endMouseX);
//   }
//   else if (count % 5 == 2){
//     l2Init.set(initMouseX, initMouseY);
//     l2End.set(initMouseX, endMouseX);
//   }
//   else if (count % 5 == 3){
//     l3Init.set(initMouseX, initMouseY);
//     l3End.set(initMouseX, endMouseX);
//   }
//   else if (count % 5 == 4){
//     l4Init.set(initMouseX, initMouseY);
//     l4End.set(initMouseX, endMouseX);
//   }
//   else {
//     l5Init.set(initMouseX, initMouseY);
//     l5End.set(initMouseX, endMouseX);
//   }
// }
