const Bkg = require('./background');
const Bullet = require('./bullet');
const Ground = require('./ground');
const Images = require('./imageRepo');
const {Cactus, cactiAvailable} = require('./cactus');
const Dino = require('./dino');

let canvasWidth = 900;
let bulletSize = 15;

class InitialGameObjects {
  constructor() {
    this.dino = new Dino({image: Images.dinoSprite, x: 50, y: 225, width: 60, height: 75});
    this.availableBullets = [
      new Bullet({image: Images.bulletImage, x: canvasWidth - (2 * bulletSize), y: (bulletSize * 2), width: bulletSize, height: bulletSize}),
      new Bullet({image: Images.bulletImage, x: canvasWidth - (4 * bulletSize), y: (bulletSize * 2), width: bulletSize, height: bulletSize}),
      new Bullet({image: Images.bulletImage, x: canvasWidth - (6 * bulletSize), y: (bulletSize * 2), width: bulletSize, height: bulletSize}),
    ];
    this.clouds = [
      new Bkg({image: Images.bkg1, x: 55, y: 0, width: 900, height: 200}),
      new Bkg({image: Images.bkg2, x: 955, y: 0, width: 900, height: 200}),
    ];
    this.cacti = [];
    cactiAvailable.forEach((cactus) => {
      this.cacti.push(new Cactus(cactus));
    });
    this.ground =  [
      new Ground({image: Images.ground1, x: 0, y: 300, width: 940, height: 60, velocity: 4}),
      new Ground({image: Images.ground2, x: 920, y: 300, width: 940, height: 60, velocity: 4}),
    ];
  }
}

module.exports = InitialGameObjects;
