const chai = require('chai');
const assert = chai.assert;

const Bullet = require('../lib/js/bullet');

const options = {x: 50, y: 300, width: 1, height: 1};

describe("Bullet", function(){
  it("instantiates with an x", function(){
    let bullet = new Bullet(options);

    assert.equal(bullet.x, 50);
  });

  it("instantiates with an y", function(){
    let bullet = new Bullet(options);

    assert.equal(bullet.y, 300);
  });

  it("instantiates with a height", function(){
    let bullet = new Bullet(options);

    assert.equal(bullet.height, 1);
  });

  it("instantiates with a width", function(){
    let bullet = new Bullet(options);

    assert.equal(bullet.width, 1);
  });

  it("can scroll to the right 2 pixels", function(){
    let bullet = new Bullet(options);
    let originalX = bullet.x;

    bullet.scroll();

    assert.equal(bullet.x, originalX + 2);
  });

  it("updates by scrolling to the right 2 pixels", function(){
    let bullet = new Bullet(options);
    let originalX = bullet.x;

    bullet.update();

    assert.equal(bullet.x, originalX + 2);
  });
});
