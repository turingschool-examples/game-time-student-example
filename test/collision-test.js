const chai = require('chai');
const assert = chai.assert;

const Dino = require('../lib/js/dino');
const Cactus = require('../lib/js/cactus');
const Bullet = require('../lib/js/bullet');
const Collision = require('../lib/js/collision');
const Images = require('../lib/js/imageRepo');


describe("Collision", function(){
  it("instantiates with a dino", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 300, width: 10, height: 15});
    session.cacti = [new Cactus({image: Images.cactus2, x: 750, y: 300, width: 10, height: 15})];
    let collision = new Collision(session);

    assert.equal(collision.dino, session.dino);
  });

  it("instantiates with cacti", function(){

    let session = {};
    session.dino = new Dino({x: 50, y: 300, width: 10, height: 15});
    session.cacti = [new Cactus({image: Images.cactus2, x: 750, y: 300, width: 10, height: 15})];
    let collision = new Collision(session);

    assert.deepEqual(collision.cacti, session.cacti);
  });

  it("instantiates with a cactus", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 300, width: 10, height: 15});
    session.cacti = [new Cactus({image: Images.cactus2, x: 750, y: 300, width: 10, height: 15})];
    let collision = new Collision(session);

    assert.equal(collision.closestCactus, session.cacti[0]);
  });

  it("can determine a bottom right dino hit when true", function(){
    let session = {};
    session.dino = new Dino({x: 44, y: 295, width: 10, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 50, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isTrue(collision.bottomRightDinoHit());
  });

  it("can determine a bottom right dino hit when false", function(){
    let session = {};
    session.dino = new Dino({x: 44, y: 295, width: 10, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 150, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isFalse(collision.bottomRightDinoHit());
  });

  it("can determine a bottom left dino hit when true", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 10, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 44, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isTrue(collision.bottomLeftDinoHit());
  });

  it("can determine a bottom left dino hit when false", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 10, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 150, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isFalse(collision.bottomLeftDinoHit());
  });

  it("can determine a bottom middle dino hit when true", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 55, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isTrue(collision.bottomMiddleDinoHit());
  });

  it("can determine a bottom middle dino hit when false", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 150, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isFalse(collision.bottomMiddleDinoHit());
  });

  it("can determine a dino hit when true", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 55, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isTrue(collision.dinoHitCactus());
  });

  it("can determine a dino hit when false", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 150, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    let collision = new Collision(session);

    assert.isFalse(collision.dinoHitCactus());
  });

  it("can determine a bullet hit when true", function(){
    let session = {};
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let bullet = new Bullet({x: 51, y: 300, width: 4, height: 4});
    let cactus = new Cactus({image: Images.cactus2, x: 54, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    session.activeBullets = [bullet];
    let collision = new Collision(session);

    assert.isTrue(collision.bulletHitCactus());
  });

  it("can determine a bullet hit when false", function(){
    let session = {};
    let bullet = new Bullet({x: 51, y: 300, width: 4, height: 4});
    session.dino = new Dino({x: 50, y: 295, width: 20, height: 10});
    let cactus = new Cactus({image: Images.cactus2, x: 154, y: 300, width: 10, height: 10});
    session.cacti = [cactus];
    session.activeBullets = [bullet];
    let collision = new Collision(session);

    assert.isFalse(collision.bulletHitCactus());
  });

  it("can remove spent bullets", function(){
    let session = {activeBullets: [1, 2]};
    let collision = new Collision(session);

    collision.removeBullet();

    assert.equal(session.activeBullets.length, 1);
  });
});
