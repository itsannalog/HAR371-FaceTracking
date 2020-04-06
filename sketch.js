var webcam = null;
var tracker = null;
var features = null;
var innerMouth = [44, 61, 60, 59, 50, 58, 57, 56];
var outerMouth = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55];
var leftEye = [30, 68, 29, 67, 28, 70, 31, 69];
var rightEye = [23, 63, 24, 64, 25, 65, 26, 66];
var nose = [33, 40, 39, 38, 43, 37, 42, 36, 35, 34];
var green;
var blue;
var red;
var pink;
var orange;
var mouthOpen = false;

function setup(){
  createCanvas(windowWidth, windowHeight);
  webcam = createCapture(VIDEO);
  webcam.size(width, height);
  
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(webcam.elt);
  
  green = color(199, 42, 247);
  blue = color(17, 187, 217);
  red = color(209, 48, 27);
  pink = color(255, 135, 173);
  orange = color(255, 168, 102);
}

function draw(){
  translate(width, 0);
  scale(-1, 1);
  image(webcam, 0, 0, width, height);
  

  features = tracker.getCurrentPosition();
  if(features.length > 0){
    drawMask();
  }
}

function drawMask(){
  drawBase();
  drawMoon();
  drawEyes();
  drawMouth();
  drawEyebrows();
  drawNose();
  drawCheeks();
}

function drawBase(){
  strokeWeight(5);
  noFill();
  
  //halo vs horns
  if (mouthOpen){
    fill(0);
    strokeWeight(5);
    noStroke();
    ellipse(features[41][0], features[41][1], features[13][0] - features[1][0], 2*(features[41][1] - features[7][1]));
    stroke(red);
    fill(0);
    var startXL = features[16][0]
    var startYL = features[16][1] - 60;
    triangle(startXL, startYL, startXL+45, startYL-30, startXL+25, startYL+25);
      
    var startXR = features[20][0]
    var startYR = features[20][1] - 60;
    triangle(startXR, startYR, startXR-45, startYR-30, startXR-25, startYR+25);
  }
  else{
    noFill();
    stroke(255, 221, 25);
    ellipse(features[41][0], features[41][1] + (features[41][1] - features[7][1]) - 100, 150, 50);
  }
}

function drawEyes(){
  strokeWeight(3);
  
  if (mouthOpen) {stroke(green); fill(0); }else {stroke(pink); fill(255);}
  
  //left eye
  beginShape();
  for (var i = 0; i < leftEye.length; i++){
    var ft = leftEye[i];
    var ftX = features[ft][0];
    var ftY = features[ft][1];
    vertex(ftX, ftY);
  }
  endShape(CLOSE); 
  //right eye
  beginShape();
  for (var i2 = 0; i2 < rightEye.length; i2++){
    var ft2 = rightEye[i2];
    var ftX2 = features[ft2][0];
    var ftY2 = features[ft2][1];
    vertex(ftX2, ftY2);
  }
  endShape(CLOSE);
}

function drawMouth(){
  noFill();
  strokeWeight(3);
  if (mouthOpen) stroke(green); else stroke(pink);
  
  //outerMouth
  beginShape();
  for (var i = 0; i < outerMouth.length; i++){
    var ft = outerMouth[i];
    var ftX = features[ft][0];
    var ftY = features[ft][1];
    vertex(ftX, ftY);
  }
  endShape(CLOSE);
  
  //inner mouth
  fill(0);
  beginShape();
  for (var j = 0; j < innerMouth.length; j++){
    var ft2 = innerMouth[j];
    var ftX2 = features[ft2][0];
    var ftY2 = features[ft2][1];
    vertex(ftX2, ftY2);
  }
  endShape(CLOSE); 
  
  noFill();
  //top matrix
  line(features[49][0], features[49][1], features[59][0], features[59][1]);
  line(features[59][0], features[59][1], features[48][0], features[48][1]);
  line(features[48][0], features[48][1], features[60][0], features[60][1]);
  line(features[60][0], features[60][1], features[46][0], features[46][1]);
  line(features[46][0], features[46][1], features[61][0], features[61][1]);
  line(features[61][0], features[61][1], features[45][0], features[45][1]);
  //bottom matrix
  line(features[51][0], features[51][1], features[58][0], features[58][1]);
  line(features[58][0], features[58][1], features[52][0], features[52][1]);
  line(features[52][0], features[52][1], features[57][0], features[57][1]);
  line(features[57][0], features[57][1], features[54][0], features[54][1]);
  line(features[54][0], features[54][1], features[56][0], features[56][1]);
  line(features[56][0], features[56][1], features[55][0], features[55][1]);
  
  //open vs closed
  var openDist =features[57][1] - features[60][1];
  if (openDist > 25) mouthOpen = true;
  else mouthOpen = false;
  //console.log(features[57][1] - features[60][1]);
}

function drawMoon(){
  strokeWeight(5);
  if (mouthOpen) stroke(red);
  else stroke(blue);
  noFill();
  
  var topX = features[41][0];
  var topY = (features[16][1] + features[20][1])/2 -35;
  arc(topX, topY, 50, 50, 0, PI);
}

function drawEyebrows(){
  noFill();
  strokeWeight(2);
  if (mouthOpen) stroke(green); else stroke(pink);
  
  //left eyebrow
  triangle(features[15][0], features[15][1], features[16][0], features[16][1] - 5, features[17][0], features[17][1]);
  beginShape();
    vertex(features[16][0], features[16][1] - 5);
    vertex(features[17][0], features[17][1]);
    vertex(features[18][0], features[18][1]);
    vertex(features[18][0], features[18][1]+8);
  endShape(CLOSE);
  
  //right eyebrow
  triangle(features[19][0], features[19][1], features[20][0], features[20][1] - 5, features[21][0], features[21][1]);
  beginShape();
    vertex(features[20][0], features[20][1] - 5);
    vertex(features[21][0], features[21][1]);
    vertex(features[22][0], features[22][1]);
    vertex(features[22][0], features[22][1]+8);
  endShape(CLOSE);
}

function drawNose(){
  noFill();
  strokeWeight(3);
  if (mouthOpen) stroke(green); else stroke(pink);
  
  //outer nose
  beginShape();
  for (var i = 0; i < nose.length; i++){
    var ft = nose[i];
    var ftX = features[ft][0];
    var ftY = features[ft][1];
    vertex(ftX, ftY);
  }
  endShape(CLOSE);
  
  //matrix lines
  line(features[39][0], features[39][1], features[62][0], features[62][1]);
  line(features[62][0], features[62][1], features[35][0], features[35][1]);
  line(features[42][0], features[42][1], features[34][0], features[34][1]);
  line(features[34][0], features[34][1], features[37][0], features[37][1]);
  line(features[37][0], features[37][1], features[40][0], features[40][1]);
  line(features[40][0], features[40][1], features[43][0], features[43][1]);
  line(features[34][0], features[34][1], features[40][0], features[40][1]);
  line(features[40][0], features[40][1], features[41][0], features[41][1]);
  line(features[41][0], features[41][1], features[34][0], features[34][1]);
  line(features[41][0], features[41][1], features[33][0], features[33][1]);
}

function drawCheeks(){
  noStroke();
  if (mouthOpen) fill(red); else fill(orange);
  
  var startXL = features[12][0];
  var startYL = features[12][1];
  var startXR = features[2][0];
  var startYR = features[2][1];
  
  arc(startXL, startYL, 90, 90, 1.9, 4.8);
  arc(startXR, startYR, 90, 90, 4.6, 1.1);
}