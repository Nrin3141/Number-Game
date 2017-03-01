var dots = [];
var difficultySettings = ''; //just Text
var winningMessage ='';
var timeMessage = '';//just Text
// These are button objects:
var restartButton = '';
var easyButton;
var mediumButton;
var hardButton;

var counter = 0; //used to see if number of dissappeared Dots = spawned Dots
var goal = 20;
var dm = 50; //Dots diameter
var gameEnd = 0;
var cnv; //Just a variable to target canvas

var startTime;
var endTime;
var neededTime;
function setup() {
  startNewRound();
}

function startEasyGame() {
  gameEnd = -1;
  startNewRound(10);
  }

function startMediumGame() {
    gameEnd = -1;
    startNewRound(20);
}
function startHardGame() {
  gameEnd = -1;
  startNewRound(30);
}
function startNewRound(x) {
  startTime = new Date();
  counter = 0;
  goal = x;
  if (gameEnd === 0) {
    cnv = createCanvas(windowWidth / 1.3, windowHeight / 1.3);
    cnv.parent('myCanvas');
    difficultySettings = createP('Choose a difficulty!');
    difficultySettings.parent('myText');
    easyButton = createButton('Easy');
    easyButton.parent('myButtons');
    easyButton.addClass('btn btn-success');
    mediumButton = createButton('Medium');
    mediumButton.parent('myButtons');
    mediumButton.addClass('btn btn-warning');
    hardButton = createButton('Hard');
    hardButton.parent('myButtons');
    hardButton.addClass('btn btn-danger');
    if (restartButton != '') {
      restartButton.remove();
      winningMessage.remove();
      gameEnd = 0;
    }
  }
  for (i = 0; i < goal; i++) {
    dots[i] = new Dot(i);
    }
  }


function Dot(x){
  //Creates dot object Values
  this.number = x + 1;
  this.r = random(150,220);
  this.g = random(150,220);
  this.b = random(150,220);
  this.x = random(30, width - 15);
  this.y = random(30, height - 15);
  this.speedX = random(-3, 3);
  this.speedY = random(-3, 3);
  this.display = function(){
    noStroke();
    fill(this.r,this.g,this.b);
    ellipse(this.x, this.y, dm, dm);
    textAlign(CENTER);
    fill(0);
    textSize(30);
    text(this.number, this.x, this.y + 10);
  }
  //Dot movement pattern
  this.move = function(){
    this.x = this.x + this.speedX;
    if (this.x > width || this.x < 0){
      this.speedX = -this.speedX;
    }
    this.y = this.y + this.speedY;
    if (this.y > height || this.y < 0){
      this.speedY = -this.speedY;
    }
  }
  //Checks if a Dot is clicked -> then deletes Dot
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 15 && counter == this.number - 1) {
      dots.splice(i, 1);
      counter += 1;
    }
  }
}
//Activates Dot.clicked function
function mousePressed() {
  for (i = 0; i < dots.length; i++) {
    dots[i].clicked();
  }
}

//Displays and moves dots, checks for button press
function draw(){
  easyButton.mousePressed(startEasyGame);
  mediumButton.mousePressed(startMediumGame);
  hardButton.mousePressed(startHardGame);
  background(52);
  for (i = 0; i < dots.length; i++) {
    dots[i].display();
    dots[i].move();
  }
  if (counter == goal) {
    easyButton.remove();
    mediumButton.remove();
    hardButton.remove();
    difficultySettings.remove();
    endTime = new Date();
    neededTime = endTime - startTime;
    neededTimeMin = floor(neededTime / 60000);
    neededTimeSec = floor((neededTime - (neededTimeMin * 60000)) / 1000);
    neededTimeMin.toFixed(1);
    var winningText = 'Hoorray, You have won - Your time was: ' + neededTimeMin + " min " + neededTimeSec + " s";
    winningMessage = createP(winningText);
    winningMessage.parent('myText');
    restartButton = createButton('Click here to restart');
    restartButton.parent('myButtons');
    restartButton.addClass('btn btn-primary');
    counter += 1;
    gameEnd = 2;
  }
  if (gameEnd === 2) {
    gameEnd = 0;
    restartButton.mousePressed(startNewRound);
  }
}
