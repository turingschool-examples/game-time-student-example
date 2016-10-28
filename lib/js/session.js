const Collision = require('./collision');
const Renderer = require('./renderer');
const Score = require('./score');
const InitialGameObjects = require('./initial-game-objects');
const keycodes = require('./keycodes');

let Scoreboard = require('./scoreboard');
let marioRemix = new Audio();
let fatality = new Audio();

marioRemix.src = './lib/sounds/mario-remix.mp3';
fatality.src = './lib/sounds/fatality.mp3';

function updateCactusVelocity(group, cactusVelocity, score) {
  if (score % 10 === 0) {
    for(let i = 0; i < group.length; i++) {
      group[i].velocity = cactusVelocity;
    }
  }
}

class Session extends InitialGameObjects {

  constructor(canvas, settings) {

    super();
    this.setup(canvas, settings);
  }

  setup (canvas, settings) {

    settings = settings || {};

    this.start = settings.start;
    this.muted = settings.muted;

    this.scoreboard = new Scoreboard()
    this.scoreboard.constructScoreboard();

    this.activeBullets.splice(
      0, this.activeBullets.length);

    this.active = true;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.height = canvas.height;
    this.width = canvas.width;
    this.score = new Score();
    this.collision = new Collision(this);
    this.renderer = new Renderer(this);
    this.backgroundSong = marioRemix;
    this.backgroundSong.volume = 0.2;
    this.backgroundSong.play();
    this.fatality = fatality;
    this.fatality.volume = 0.15;

    this.checkForMute();
  }

  get movingObjects () {
    return this.cacti.concat(this.ground);
  }

  get cactusVelocity() {
    return 4 + (this.score.currentScore / 25);
  }

  triggerUserAction (e) {

    switch(e.which) {

      case keycodes.ENTER:

        if (this.active && this.dino.canShoot()) {
          e.preventDefault();
          this.dino.shoot();
        }
        break;

      case keycodes.SPACE:

        if (this.active) {
          e.preventDefault();
          this.dino.jump();
        }
        break;

      case keycodes.S:

        if (!this.scoreboard.scorePending && this.active === false) {

          this.fatality.pause();
          this.fatality.currentTime = 0;
          this.buildObjects(this.canvas);
          this.setup(this.canvas, {start: false, muted: this.muted});
        }
        break;
    }

  }

  tick() {
    if (this.start) {
      this.renderer.drawStart();
      return this.active = false;
    }
    if (this.active === true) {
      this.play();
    } else {
      this.gameOver();
    }
  }

  gameOver() {
    this.backgroundSong.pause();
    this.backgroundSong.currentTime = 0;
    this.fatality.play();
    this.renderer.drawGameOver();
  }

  play() {
    this.renderer.draw();
    this.collision.detectHit();
    this.update();
  }

  get gameObjects() {
    return this.cacti.concat(this.ground)
                     .concat(this.clouds)
                     .concat(this.activeBullets)
                     .concat(this.score)
                     .concat(this.dino);
  }

  update() {
    updateCactusVelocity(this.movingObjects, this.cactusVelocity, this.score.currentScore);
    for(let i = 0; i < this.gameObjects.length; i++) {
      this.gameObjects[i].update();
    }
  }

  checkForMute() {
    if (this.muted === true) {
      this.mute();
    } else {
      this.unmute();
    }
  }

  mute() {
    this.backgroundSong.volume = 0.0;
    this.fatality.volume = 0.0;
    this.dino.jumpSound.volume = 0.0;
    this.dino.gunshotSound.volume = 0.0;
    this.dino.dryGunshotSound.volume = 0.0;
    this.collision.cactusSplatSound.volume = 0.0;
  }

  unmute() {
    this.backgroundSong.volume = 0.2;
    this.fatality.volume = 0.15;
    this.dino.jumpSound.volume = 0.1;
    this.dino.gunshotSound.volume = 0.3;
    this.dino.dryGunshotSound.volume = 0.8;
    this.collision.cactusSplatSound.volume = 0.9;
  }
}

module.exports = Session;
