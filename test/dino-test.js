const chai = require('chai');
const assert = chai.assert;

const Dino = require('../lib/js/dino');

const options = {x: 50, y: 225, width: 10, height: 15};

describe("Dino", function(){
  it("instantiates with an x", function(){
    let dino = new Dino(options);

    assert.equal(dino.x, 50);
  });

  it("instantiates with an y", function(){
    let dino = new Dino(options);

    assert.equal(dino.y, 225);
  });

  it("instantiates with an height", function(){
    let dino = new Dino(options);

    assert.equal(dino.height, 15);
  });

  it("instantiates with an width", function(){
    let dino = new Dino(options);

    assert.equal(dino.width, 10);
  });

  it("instantiates with a velocity of 0", function(){
    let dino = new Dino(options);

    assert.equal(dino.velocity, 0);
  });

  it("instantiates on the ground", function(){
    let dino = new Dino(options);

    assert.isTrue(dino.isOnGround);
  });

  it("isOnGround return false when y position is not 300", function(){
    let dino = new Dino(options);
    dino.y = 250;

    assert.isFalse(dino.isOnGround);
  });

  it("isJumping returns true when velocity is less than 0", function(){
    let dino = new Dino(options);
    dino.velocity = -1;

    assert.isTrue(dino.isJumping);
  });

  it("isJumping returns false when velocity is greater than 0", function(){
    let dino = new Dino(options);
    dino.velocity = 1;

    assert.isFalse(dino.isJumping);
  });

  it("isFalling returns true when velocity is greater than 0 and y position is less than 300", function(){
    let dino = new Dino(options);
    dino.velocity = 1;
    dino.y = 250;

    assert.isTrue(dino.isFalling);
  });

  it("isFalling returns false when velocity is less than 0 and y position is less than 300", function(){
    let dino = new Dino(options);
    dino.velocity = -1;
    dino.y = 250;

    assert.isFalse(dino.isFalling);
  });

  it("isAtCrestOfJump returns true when velocity is 0 and y position is less than 300", function(){
    let dino = new Dino(options);
    dino.velocity = 0;
    dino.y = 250;

    assert.isTrue(dino.isAtCrestOfJump);
  });

  it("isAtCrestOfJump returns false ascending", function(){
    let dino = new Dino(options);
    dino.velocity = -1;
    dino.y = 250;

    assert.isFalse(dino.isAtCrestOfJump);
  });

  it("isAtCrestOfJump returns false falling", function(){
    let dino = new Dino(options);
    dino.velocity = 1;
    dino.y = 250;

    assert.isFalse(dino.isAtCrestOfJump);
  });

  it("can jump when on ground and not jumping or falling", function(){
    let dino = new Dino(options);

    assert.isTrue(dino.jumpAvailable);
  });

  it("can not jump when above ground", function(){
    let dino = new Dino(options);
    dino.y = 250;

    assert.isFalse(dino.jumpAvailable);
  });

  it("can jump", function(){
    let dino = new Dino(options);
    dino.jump();

    assert.equal(dino.velocity, -20);
    assert.isTrue(dino.isJumping);
  });

  it("moves up when jump is executed", function(){
    let dino = new Dino(options);
    dino.velocity = -1;
    let nextJumpX = dino.y + dino.velocity;
    dino.executeJump();

    assert.equal(dino.velocity, 0);
    assert.equal(dino.y, nextJumpX);
  });

  it("moves down when gravity is acvtiated", function(){
    let dino = new Dino(options);
    dino.y = 220;
    dino.velocity = 1;
    let dinoNextGravityY = dino.y + dino.velocity;
    dino.activateGravity();

    assert.equal(dino.velocity, 1.8);
    assert.equal(dino.y, dinoNextGravityY);
  });

  it("doesn't fall past ground (300px) when gravity is activated", function(){
    let dino = new Dino(options);
    dino.y = 224;
    dino.velocity = 10;
    dino.activateGravity();

    assert.equal(dino.y, 225);
  });


});
