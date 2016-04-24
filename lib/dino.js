const Block = require('./block');
const dryGunshotSound = new Audio();
dryGunshotSound.src = './sounds/dry-fire-gunshot.mp3';
const gunshotSound = new Audio();
gunshotSound.src = './sounds/shotgun-firing.mp3';
const jumpSound = new Audio();
jumpSound.src = './sounds/mario-jump-sound.mp3';

class Dino extends Block {
  constructor(options, game) {
    super(options);
    this.velocity = 0;
    this.game = game;
    this.jumpSound = jumpSound;
    this.jumpSound.volume = 0.1;
    this.gunshotSound = gunshotSound;
    this.gunshotSound.volume = 0.3;
    this.dryGunshotSound = dryGunshotSound;
    this.dryGunshotSound.volume = 0.8;
  }

  get bottomRight() {
    const x = this.x + (this.width * 0.92);
    const y = this.y + this.height * 0.98;
    return {x: x, y: y};
  }

  get bottomMiddle() {
    const x = this.x + (this.width / 2);
    const y = this.y + this.height;
    return {x: x, y: y};
  }

  get bottomLeft() {
    const x = this.x;
    const y = this.y + (this.height * 0.96);
    return {x: x, y: y};
  }

  get isOnGround() {
    return this.y === 225;
  }

  get isJumping() {
    return this.velocity < 0;
  }

  get isFalling() {
    return this.velocity > 0 && !this.isOnGround;
  }

  get isAtCrestOfJump() {
    return this.velocity === 0 && !this.isOnGround;
  }

  get jumpAvailable() {
    return (this.isOnGround) && !(this.isJumping || this.isFalling);
  }

  jump() {
    if (this.jumpAvailable) {
      this.velocity = -20;
      this.jumpSound.currentTime = 0;
      this.jumpSound.play();
    }
  }

  executeJump() {
    this.y += this.velocity;
    this.velocity++;
  }

  activateGravity() {
    if (this.y < 225) {
      this.y += this.velocity;
      this.y = Math.min(this.y, 225);
      this.velocity += 0.8;
    }
  }

  canShoot() {
    if (this.isOnGround) {
      return true;
    } else {
      return false;
    }
  }

  shoot() {
    if (this.availableBullets.length > 0) {
      let bullet = this.availableBullets.shift();
      bullet.x = this.dino.x + this.dino.width;
      bullet.y = this.dino.y + (this.dino.height/2.5);
      this.activeBullets.push(bullet);
      this.dino.gunshotSound.currentTime = 0;
      this.dino.gunshotSound.play();
    }
    else {
      this.dino.dryGunshotSound.currentTime = 0;
      this.dino.dryGunshotSound.play();
    }
  }

  update() {
    if (this.isFalling || this.isAtCrestOfJump) {this.activateGravity();}
    if (this.isJumping) {this.executeJump();}
  }
}

module.exports = Dino;
