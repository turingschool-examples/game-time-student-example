const Bkg = require('./background');
const Bullet = require('./bullet');
const Ground = require('./ground');
const Images = require('./imageRepo');
const Cactus = require('./cactus');
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
    this.cacti = [
      new Cactus({image: Images.cactus1, x: 905, y: 250, width: 25, height: 50, velocity: 4, left: [0.05, 0.3, 0.41], middle: [0.3, 0.4, 0.08], right: [0.7, 1, 0.38]}),
      new Cactus({image: Images.cactus2, x: 1300, y: 258, width: 25, height: 42, velocity: 4, left: [0.05, 0.75, 0.05], middle: [0.05, 0.75, 0.05], right: [0.05, 0.75, 0.05]}),
      new Cactus({image: Images.cactus3, x: 1600, y: 220, width: 25, height: 80, velocity: 4, left: [1, 0.4, 0.27], middle: [0.4, 0.65, 0.02], right: [0.65, 1, 0.23]}),
      new Cactus({image: Images.cactus4, x: 1850, y: 235, width: 25, height: 65, velocity: 4, left: [0.12, 0.55, 0.05], middle: [0.12, 0.55, 0.05], right: [0.5, 1, 0.3]}),
    ];
    this.ground =  [
      new Ground({image: Images.ground1, x: 0, y: 300, width: 940, height: 60, velocity: 4}),
      new Ground({image: Images.ground2, x: 920, y: 300, width: 940, height: 60, velocity: 4}),
    ];
  }
}

module.exports = InitialGameObjects;
