const chai = require('chai');
const assert = chai.assert;
const Bullet = require('../lib/js/bullet');
const Cloud = require('../lib/js/background');
const Cactus = require('../lib/js/cactus');
const Ground = require('../lib/js/ground');


const InitialGameObjects = require('../lib/js/initial-game-objects');


describe("InitialGameObjects", function(){
  it("instantiates 3 bullets", function(){
    let igo = new InitialGameObjects();
    assert.equal(igo.availableBullets.length, 3);
  });

  it("instantiates with bullets", function(){
    let igo = new InitialGameObjects();

    let bullets = igo.availableBullets;

    for(let i = 0; i < bullets.length; i++) {
      assert.instanceOf(bullets[i], Bullet);
    }
  });

  it("instantiates 2 clouds", function(){
    let igo = new InitialGameObjects();

    assert.equal(igo.clouds.length, 2);
  });

  it("instantiates with cloud objects", function(){
    let igo = new InitialGameObjects();
    let clouds = igo.clouds;

    for(let i = 0; i < clouds.length; i++) {
      assert.instanceOf(clouds[i], Cloud);
    }
  });

  it("instantiates 4 cacti", function(){
    let igo = new InitialGameObjects();

    assert.equal(igo.cacti.length, 4);
  });

  it("instantiates with cacti objects", function(){
    let igo = new InitialGameObjects();
    let cacti = igo.cacti;

    for(let i = 0; i < cacti.length; i++) {
      assert.instanceOf(cacti[i], Cactus);
    }
  });

  it("instantiates 2 grounds", function(){
    let igo = new InitialGameObjects();

    assert.equal(igo.ground.length, 2);
  });

  it("instantiates with ground objects", function(){
    let igo = new InitialGameObjects();
    let ground = igo.ground;

    for(let i = 0; i < ground.length; i++) {
      assert.instanceOf(ground[i], Ground);
    }
  });

});
