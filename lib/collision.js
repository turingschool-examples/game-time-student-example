const { hitCactus } = require('./util');

const cactusSplatSound = new Audio();
cactusSplatSound.src = './sounds/cactus-splat.mp3';

class Collision {

  constructor(game) {
    this.game = game;
    this.dino = game.dino;
    this.cacti = game.cacti;
    this.activeBullets = game.activeBullets;
    this.scoreboard = game.scoreboard;
    this.cactusSplatSound = cactusSplatSound;
  }

  get closestCactus() {
    let closest = this.cacti[0];
    for (let i = 0; i < this.cacti.length; i++) {
      if (this.cacti[i].x + this.cacti[i].width > this.dino.x) {
        const currentCactus = this.cacti[i];
        if (currentCactus.x < closest.x) { closest = currentCactus; }
      }
    }
    return closest;
  }

  detectHit() {
    if (this.closestCactus.x <= this.dino.x + this.dino.width) {
      if (this.dinoHitCactus()) {
        this.dino.jumpSound.pause();
        this.game.active = false;
        this.scoreboard.addScoreToHighScores(this.game.score.currentScore);
      }
    }
    if (this.bulletHitCactus()) {
      this.closestCactus.shot = true;
      this.cactusSplatSound.currentTime = 0;
      this.cactusSplatSound.play();
      this.removeBullet();
    }
  }

  bulletHitCactus() {
    for (let i = 0; i < this.activeBullets.length; i++) {
      const bullet = this.activeBullets[i];
      if (bullet.x + bullet.width > this.closestCactus.x &&
        (bullet.y > this.closestCactus.y || bullet.y + bullet.height > this.closestCactus.y)) {
        return true;
      }
      return false;
    }
  }

  removeBullet() {
    this.game.activeBullets.shift();
  }

  dinoHitCactus() {
    return this.bottomRightDinoHit() ||
      this.bottomMiddleDinoHit() ||
      this.bottomLeftDinoHit();
  }

  bottomRightDinoHit() {
    const x = this.dino.bottomRight.x;
    const y = this.dino.bottomRight.y;
    return hitCactus(x, y, this.closestCactus);
  }

  bottomMiddleDinoHit() {
    const x = this.dino.bottomMiddle.x;
    const y = this.dino.bottomMiddle.y;
    return hitCactus(x, y, this.closestCactus);
  }

  bottomLeftDinoHit() {
    const x = this.dino.bottomLeft.x;
    const y = this.dino.bottomLeft.y;
    return hitCactus(x, y, this.closestCactus);
  }
}


module.exports = Collision;
