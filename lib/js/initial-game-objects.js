const Bkg = require('./background');
const Bullet = require('./bullet');
const Ground = require('./ground');
const Images = require('./imageRepo');
const Cactus = require('./cactus');
const Dino = require('./dino');

class InitialGameObjects {

  constructor() {
    this.buildObjects();
  }

  buildObjects() {

    var width = 900;
    var size = Bullet.size;

    this.activeBullets = [];

    this.availableBullets = [
      new Bullet({
        x: width - (2 * size),
        y: (size * 2)
      }),
      new Bullet({
        x: width - (4 * size),
        y: (size * 2)
      }),
      new Bullet({
        x: width - (6 * size),
        y: (size * 2)
      })
    ];

    this.dino = new Dino({
      activeBullets: this.activeBullets,
      availableBullets: this.availableBullets
    });

    this.clouds = [
      new Bkg(),
      new Bkg({image: Images.bkg2,x: 955,})
    ];

    this.ground =  [
      new Ground(),
      new Ground({image: Images.ground2, x: 920})
    ];

    this.cacti = [
      new Cactus(),
      new Cactus({
        image: Images.cactus2,
        x: 1300,
        y: 258,
        width: 25,
        height: 42
      }),
      new Cactus({
        image: Images.cactus3,
        x: 1600,
        y: 220,
        width: 25,
        height: 80
      }),
      new Cactus({
        image: Images.cactus4,
        x: 1850,
        y: 235,
        width: 25,
        height: 65
      })
    ];
  }
}

module.exports = InitialGameObjects;
