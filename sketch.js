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
let fader = 1;
let textToShow = false;
let textShown = false;
let drawOnScreen = false;
let DateTime = luxon.DateTime;
let Intervals = luxon.Interval;
let c;
let weeksActuallySpent;
let timeSpent;
let isEnd = false;
let finalTimeRecorded = false;
let finalMill = 0;
let countWhileTextShown = 0;

function setup() {
  c = createCanvas(1280, 720);
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
  //console.log(data[0].events[5]);
  count = 0;
  randNum = int(random(data.lenght));
  console.log(data.length);
  console.log(randNum);
  randNum = 1;
  let inDate = DateTime.fromISO(data[randNum].dateIncarcerated);
  let outDate;
  if (data[randNum].released) {
    outDate = DateTime.fromISO(data[randNum].dateReleased);
  } else {
    outDate = DateTime.now();
  }
  let i = Intervals.fromDateTimes(inDate, outDate);
  weeksActuallySpent = int(i.length("days") / 7);
  console.log(weeksActuallySpent);
}

function draw() {
  //background(220);
  //console.log(count);
  let mill = millis();
  //timeSpent = mill / 3600;
  if (count > countWhileTextShown) {
    textShown = false;
  }
  if (count == weeksActuallySpent) {
    isEnd = true;
  }
  if (data[randNum].events[count] && !textShown) {
    textToShow = true;
  }
  //console.log(data[randNum].events[count]);
  if (!started) {
    drawOnScreen = false;
    toBeShown = data[randNum].initText;
    writeText();
    if (alpha <= 0) {
      alpha = 255;
      started = true;
      drawOnScreen = true;
    }
  } else if (textToShow) {
    drawOnScreen = false;
    toBeShown = data[randNum].events[count];
    //console.log(toBeShown);
    countWhileTextShown = count;
    writeText();
    if (alpha <= 0) {
      alpha = 255;
      textToShow = false;
      textShown = true;
      drawOnScreen = true;
    }
  } else if (count > 0 && count % 5 == 0 && mill - pMill > 2000) {
    background(255);
    pMill = mill;
  } else if (isEnd) {
    background(255);
    if (!finalTimeRecorded) {
      finalMill = mill;
      timeSpent = int(finalMill / 60000);
    }
    finalTimeRecorded = true;
    toBeShown = `${data[randNum].endText}. You spent ${timeSpent} minutes in this installation. ${data[randNum].name} has spend ${weeksActuallySpent} weeks in jail.`;
    fade = 0;
    alpha = 255;
    drawOnScreen = false;
    writeText();
  } else if (mouseIsPressed && drawOnScreen) {
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
  if (drawOnScreen) {
    endMouseX = pmouseX;
    endMouseY = pmouseY;
    checkLine();
  }

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
    let now = DateTime.now().toString();
    console.log(now);
    //fullscreen(true);
  }
}

function resetAlpha() {
  if (alpha <= 0) {
    alpha = 255;
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
