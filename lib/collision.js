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
    for (var i = 0; i < this.activeBullets.length; i++) {
      let bullet = this.activeBullets[i];
      if (bullet.x + bullet.width > this.closestCactus.x &&
         (bullet.y > this.closestCactus.y || bullet.y + bullet.height > this.closestCactus.y)) {
          return true;
        } else {
          return false;
        }
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

// I removed the left, middle, right functions for each cactus and instead store the offsets to
// detect a collision. This way it's easy to find the offsets and change them, and every cactus
// simply passes it's offsets to the collision detector function to determine if a collision happened.
  cactusOneCollide(dinoX, dinoY, cactus) {
    let left_offset = [cactus.width * 0.05, cactus.width * 0.3, cactus.height * 0.41]
    let middle_offset = [cactus.width * 0.3, cactus.width * 0.4, cactus.height * 0.08]
    let right_offset = [cactus.width * 0.7, cactus.width, cactus.height * 0.38]
    let all_offsets = [left_offset,middle_offset,right_offset]
    return this.cactusCollisonDetector(dinoX,dinoY,cactus,all_offsets)
  }

  cactusTwoCollide(dinoX, dinoY, cactus) {
    let left_offset = [0,0,0]
    let middle_offset = [cactus.width * 0.05, cactus.width * 0.75, cactus.height * 0.05]
    let right_offset = [0,0,0]
    let all_offsets = [left_offset,middle_offset,right_offset]
    return this.cactusCollisonDetector(dinoX,dinoY,cactus,all_offsets)
  }

  cactusThreeCollide(dinoX, dinoY, cactus) {
    let left_offset = [0, cactus.width * 0.4, cactus.height * 0.27]
    let middle_offset = [cactus.width * 0.4, cactus.width * 0.65, cactus.height * 0.02]
    let right_offset = [cactus.width * 0.65, cactus.width, cactus.height * 0.23]
    let all_offsets = [left_offset,middle_offset,right_offset]
    return this.cactusCollisonDetector(dinoX,dinoY,cactus,all_offsets)
  }

  cactusFourCollide(dinoX, dinoY, cactus) {
    let left_offset = [cactus.width * 0.12, cactus.width * 0.55, cactus.height * 0.05]
    let middle_offset = [0,0,0]
    let right_offset = [cactus.width * 0.5, cactus.width, cactus.height * 0.3]
    let all_offsets = [left_offset,middle_offset,right_offset]
    return this.cactusCollisonDetector(dinoX,dinoY,cactus,all_offsets)
  }

  cactusCollisonDetector(dinoX, dinoY, cactus, offsets) {
    let hit_detected = offsets.map(function(offset) {
      return (dinoX > (cactus.x + offset[0]) &&
              dinoX < (cactus.x + offset[1]) &&
              dinoY > (cactus.y + offset[2]));
    })
    return hit_detected[0] || hit_detected[1] || hit_detected[2];
  }
}

module.exports = Collision;
