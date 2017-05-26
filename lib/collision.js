let cactusSplatSound = new Audio();
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
        let currentCactus = this.cacti[i];
        if (currentCactus.x < closest.x) { closest = currentCactus;}
      }
    }
    return closest;
  }

    
  //cleaning up readability
  detectHit() {
    if (this.closestCactus.x <= this.dino.x + this.dino.width) {
      if (this.dinoHitCactus()) {
        this.endGame();
      }
    }
    if (this.bulletHitCactus()) {
      this.cactusSplat();
    }
  }
    
  endGame(){
      this.dino.jumpSound.pause();
      this.game.active = false;
      this.scoreboard.addScoreToHighScores(this.game.score.currentScore);
  }
    
  cactusSplat(){
      this.closestCactus.shot = true;
      this.cactusSplatSound.currentTime = 0;
      this.cactusSplatSound.play();
      this.removeBullet();
  }

    
  //Simplified logic for bullet hitting cactus
  bulletHitCactus() {
    for (var i = 0; i < this.activeBullets.length; i++) {
      let bullet = this.activeBullets[i];
      return (bullet.x + bullet.width > this.closestCactus.x &&
         (bullet.y > this.closestCactus.y || bullet.y + bullet.height > this.closestCactus.y))
      }
    }

    removeBullet() {
      let spentBullet = this.game.activeBullets.shift();
      spentBullet = null;
    }

  dinoHitCactus() {
    return this.bottomRightDinoHit() ||
           this.bottomMiddleDinoHit() ||
           this.bottomLeftDinoHit();
  }

  dinoHit(dinoX, dinoY, cactus) {
    switch (cactus.image.src.split('images')[1]) {
      case '/cactus1.png':
      return this.cactusOneCollide(dinoX, dinoY, cactus);

      case '/cactus2.png':
      return this.cactusTwoCollide(dinoX, dinoY, cactus);

      case '/cactus3.png':
      return this.cactusThreeCollide(dinoX, dinoY, cactus);

      case '/cactus4.png':
      return this.cactusFourCollide(dinoX, dinoY, cactus);
  }
}

  bottomRightDinoHit() {
    let x = this.dino.bottomRight.x;
    let y = this.dino.bottomRight.y;
    return this.dinoHit(x, y, this.closestCactus);
  }

  bottomMiddleDinoHit() {
    let x = this.dino.bottomMiddle.x;
    let y = this.dino.bottomMiddle.y;
    return this.dinoHit(x, y, this.closestCactus);
  }

  bottomLeftDinoHit() {
    let x = this.dino.bottomLeft.x;
    let y = this.dino.bottomLeft.y;
    return this.dinoHit(x, y, this.closestCactus);
  }

  cactusOneCollide(dinoX, dinoY, cactus) {
    return this.cactusOneCollideLeft(dinoX, dinoY, cactus) ||
           this.cactusOneCollideMiddle(dinoX, dinoY, cactus) ||
           this.cactusOneCollideRight(dinoX, dinoY, cactus);
  }

  cactusThreeCollide(dinoX, dinoY, cactus) {
    return this.cactusThreeCollideLeft(dinoX, dinoY, cactus) ||
           this.cactusThreeCollideMiddle(dinoX, dinoY, cactus) ||
           this.cactusThreeCollideRight(dinoX, dinoY, cactus);
  }
  cactusFourCollide(dinoX, dinoY, cactus) {
    return this.cactusFourCollideLeft(dinoX, dinoY, cactus) ||
           this.cactusFourCollideRight(dinoX, dinoY, cactus);
  }

  cactusOneCollideLeft(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + cactus.width * 0.05 &&
    dinoX < cactus.x + (cactus.width * 0.3) &&
    dinoY > (cactus.y + cactus.height * 0.41));
  }

  cactusOneCollideMiddle(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + (cactus.width * 0.3)) &&
    dinoX < (cactus.x + (cactus.width * 0.4)) &&
    dinoY > (cactus.y + (cactus.height * 0.08));
  }

  cactusOneCollideRight(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + (cactus.width * 0.7)) &&
    dinoX < (cactus.x + cactus.width) &&
    dinoY > (cactus.y + (cactus.height * 0.38));
  }

  cactusThreeCollideLeft(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x &&
    dinoX < cactus.x + (cactus.width * 0.4) &&
    dinoY > (cactus.y + cactus.height * 0.27));
  }

  cactusThreeCollideMiddle(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + (cactus.width * 0.4)) &&
    dinoX < (cactus.x + (cactus.width * 0.65)) &&
    dinoY > (cactus.y + (cactus.height * 0.02));
  }

  cactusThreeCollideRight(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + (cactus.width * 0.65)) &&
    dinoX < (cactus.x + cactus.width) &&
    dinoY > (cactus.y + (cactus.height * 0.23));
  }

  cactusFourCollideLeft(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + cactus.width * 0.12 &&
    dinoX < cactus.x + (cactus.width * 0.55) &&
    dinoY > (cactus.y + cactus.height * 0.05));
  }

  cactusFourCollideRight(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + (cactus.width * 0.5)) &&
    dinoX < (cactus.x + cactus.width) &&
    dinoY > (cactus.y + (cactus.height * 0.3));
  }

  cactusTwoCollide(dinoX, dinoY, cactus) {
    return (dinoX > cactus.x + cactus.width * 0.05 &&
    dinoX < cactus.x + (cactus.width * 0.75) &&
    dinoY > (cactus.y + cactus.height * 0.05));
  }
}

module.exports = Collision;
