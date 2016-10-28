const Block = require('./block');
const Images = require('./imageRepo');

let dryGunshotSound = new Audio();
dryGunshotSound.src = './lib/sounds/dry-fire-gunshot.mp3';
let gunshotSound = new Audio();
gunshotSound.src = './lib/sounds/shotgun-firing.mp3';
let jumpSound = new Audio();
jumpSound.src = './lib/sounds/mario-jump-sound.mp3';

class Dino extends Block {

  get defaultOptions() {
    return {
      image: Images.dinoSprite,
      x: 50,
      y: 225,
      width: 60,
      height: 75,
    };
  }

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

    this.availableBullets = options.availableBullets;
    this.activeBullets = options.activeBullets;
  }

  get bottomRight() {
    let x = this.x + (this.width * 0.92);
    let y = this.y + this.height * 0.98;
    return {x: x, y: y};
  }

  get bottomMiddle() {
    let x = this.x + (this.width / 2);
    let y = this.y + this.height;
    return {x: x, y: y};
  }

  get bottomLeft() {
    let x = this.x;
    let y = this.y + (this.height * 0.96);
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

      bullet.x = this.x + this.width;
      bullet.y = this.y + (this.height / 2.5);

      this.activeBullets.push(bullet);

      this.gunshotSound.currentTime = 0;
      this.gunshotSound.play();
    }
    else {
      this.dryGunshotSound.currentTime = 0;
      this.dryGunshotSound.play();
    }
  }

  update() {
    if (this.isFalling || this.isAtCrestOfJump) {this.activateGravity();}
    if (this.isJumping) {this.executeJump();}
  }
}

module.exports = Dino;
