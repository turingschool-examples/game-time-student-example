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
        return this.cacti.reduce((previousValue, currentValue, currentIndex, array) => {
            if (currentValue.x + currentValue.width > this.dino.x && currentValue.x < previousValue.x) {
                return currentValue;
            }
            return previousValue;
        });
    }

    detectHit() {
        if (this.closestCactus.x <= this.dino.x + this.dino.width && this.dinoHitCactus()) {
            this.dino.jumpSound.pause();
            this.game.active = false;
            this.scoreboard.addScoreToHighScores(this.game.score.currentScore);
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
            if (bullet.x + bullet.width > this.closestCactus.x && (bullet.y > this.closestCactus.y || bullet.y + bullet.height > this.closestCactus.y)) {
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

    dinoHit(dinoX, dinoY, cactus) {
      return (
        (dinoX > cactus.x + cactus.width * cactus.left[0] && dinoX < cactus.x + (cactus.width * cactus.left[1]) && dinoY > (cactus.y + cactus.height * cactus.left[2])) ||
        (dinoX > cactus.x + (cactus.width * cactus.middle[0])) && dinoX < (cactus.x + (cactus.width * cactus.middle[1])) && dinoY > (cactus.y + (cactus.height * cactus.middle[2])) ||
        (dinoX > cactus.x + (cactus.width * cactus.right[0])) && dinoX < (cactus.x + (cactus.width * cactus.right[1])) && dinoY > (cactus.y + (cactus.height * cactus.right[2]))
      );
    }

    bottomRightDinoHit() {
        const x = this.dino.bottomRight.x;
        const y = this.dino.bottomRight.y;
        return this.dinoHit(x, y, this.closestCactus);
    }

    bottomMiddleDinoHit() {
        const x = this.dino.bottomMiddle.x;
        const y = this.dino.bottomMiddle.y;
        return this.dinoHit(x, y, this.closestCactus);
    }

    bottomLeftDinoHit() {
        const x = this.dino.bottomLeft.x;
        const y = this.dino.bottomLeft.y;
        return this.dinoHit(x, y, this.closestCactus);
    }
}

module.exports = Collision;
