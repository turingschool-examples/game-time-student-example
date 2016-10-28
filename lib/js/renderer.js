const Images = require('./imageRepo');
let tickCount = 0;

class Renderer {

  constructor(game) {
    this.cacti = game.cacti;
    this.dino = game.dino;
    this.canvas = game.canvas;
    this.context = game.context;
    this.activeBullets = game.activeBullets;
    this.availableBullets = game.availableBullets;
    this.clouds = game.clouds;
    this.ground = game.ground;
    this.dinoLegUpImage = Images.dinoSprite;
    this.dinoLegDownImage = Images.dinoSprite1;
    this.dinoUpImage = Images.dinoJump;
    this.dinoGroundImage = game.dino.image;
    this.score = game.score;
  }

  drawGameOver() {
    this.context.drawImage(Images.gameOver, 350, 100, 200, 150);
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawDino();
    this.drawNonDinoObjects();
    this.drawAvailableBullets();
  }

  drawStart() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawObject(this.dino);
    this.drawNonDinoObjects();
  }

  drawNonDinoObjects() {
    this.drawCacti();
    this.drawGround();
    this.drawActiveBullets();
    this.drawBkg();
    this.drawScore();
    this.drawAvailableBullets();
  }

  drawCacti() {
    let that = this;
    this.cacti.forEach(function (cactus) {
      that.drawObject(cactus);
    });
  }

  drawObject(object) {
    this.context.drawImage(object.image, object.x, object.y, object.width, object.height);
    return this;
  }

  drawActiveBullets() {
    var that = this;
    this.activeBullets.forEach(function (bullet) {
      that.drawBullet(bullet);
    });
  }

  drawAvailableBullets() {
    var that = this;
    this.availableBullets.forEach(function (bullet) {
      that.drawBullet(bullet);
    });
  }

  drawBullet(object) {
    this.context.fillText("Bullets Left: ", 820, 20);
    this.context.drawImage(object.image, object.x, object.y, object.width, object.height);
    return this;
  }

  drawBkg() {
    let that = this;
    this.clouds.forEach(function (pane) {
      that.drawObject(pane);
    });
  }

  drawScore() {
    this.context.fillText("Score: ", 20, 20);
    this.context.fillText(this.score.currentScore, 55, 20);
    return this;
  }

  drawGround() {
    let that = this;
    this.ground.forEach(function (pane) {
      that.drawObject(pane);
    });
  }

  drawDino() {
    if (this.dino.isOnGround){
      this.drawDinoWalking();
    } else {
      this.drawDinoJumping();
    }
    return this;
  }

  drawDinoJumping() {
    this.dino.image = this.dinoUpImage;
    this.drawObject(this.dino);
  }

  drawDinoWalking() {
    if (tickCount <= 6){
      this.drawDinoLegUp();
    } else if (tickCount > 6){
      this.drawDinoLegDown();
      if (tickCount > 13){
        tickCount = 0;
      }
    }
  }

  drawDinoLegUp() {
    this.dino.image = this.dinoLegUpImage;
    this.drawObject(this.dino);
    tickCount++;
  }

  drawDinoLegDown() {
    this.dino.image = this.dinoLegDownImage;
    this.drawObject(this.dino);
    tickCount++;
  }
}

module.exports = Renderer;
