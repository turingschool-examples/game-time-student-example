const chai = require('chai');
const assert = chai.assert;

const Block = require('../lib/js/block');
const options = {x: 1, y: 2, width: 3, height: 4};

describe('Block', () => {
  it('instantiates with an x', () => {
    const block = new Block(options);

    assert.equal(block.x, 1);
  });

  it('instantiates with an y', () => {
    const block = new Block(options);
    assert.equal(block.y, 2);
  });

  it('instantiates with an width', () => {
    const block = new Block(options);
    assert.equal(block.width, 3);
  });

  it('instantiates with an height', () => {
    const block = new Block(options);
    assert.equal(block.height, 4);
  });
});
