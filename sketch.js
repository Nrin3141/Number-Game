var dots = [];
var difficultySettings = '';
var winningMessage ='';
var restartButton = '';
var counter = 0;
var goal = 20;
var dm = 50;
var easyButton;
var mediumButton;
var hardButton;
var gameEnd = false;
var cnv;
function setup() {
  startGame();
}
function startEasyGame() {
  goal = 10;
  easyButton.remove();
  mediumButton.remove();
  hardButton.remove();
  difficultySettings.remove();
  cnv = createCanvas(windowWidth / 1.3, windowHeight / 1.3);
  cnv.parent('myCanvas');
  for (i = 0; i < goal; i++) {
    dots[i] = new Dot();
  }
}
function startMediumGame() {
    goal = 20;
    easyButton.remove();
    mediumButton.remove();
    hardButton.remove();
    difficultySettings.remove();
    cnv = createCanvas(windowWidth / 1.3, windowHeight / 1.3);
    cnv.parent('myCanvas');
    for (i = 0; i < goal; i++) {
      dots[i] = new Dot();
    }
}
function startHardGame() {
      goal = 30;
      easyButton.remove();
      mediumButton.remove();
      hardButton.remove();
      difficultySettings.remove();
      cnv = createCanvas(windowWidth / 1.3, windowHeight / 1.3);
      cnv.parent('myCanvas');
      for (i = 0; i < goal; i++) {
        dots[i] = new Dot();
      }
}
function Dot(){
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
  }
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
  this.clicked = function() {
    var d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 15) {
      dots.splice(i, 1);
      counter += 1;
    }
  }
}
function mousePressed() {
  for (i = 0; i < dots.length; i++) {
    dots[i].clicked();
  }
}
function startGame() {
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
  counter = 0;
  if (gameEnd === -1){
    print('Test');
    restartButton.remove();
    winningMessage.remove();
    gameEnd = false;
  }
}
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
    winningMessage = createP('Hoorray, You have won');
    winningMessage.parent('myText');
    restartButton = createButton('Click here to restart');
    restartButton.parent('myButtons');
    restartButton.addClass('btn btn-primary');
    counter += 1;
    gameEnd = true;
  }
  if (gameEnd === true) {
    restartButton.mousePressed(startGame);
    gameEnd = -1;
  }
}
