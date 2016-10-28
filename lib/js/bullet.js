const Block = require('./block');

class Bullet extends Block {
  constructor(options) {
    super(options);
  }

  update() {
    this.scroll();
  }

  scroll() {
    this.x = this.x + 2;
  }
}

  module.exports = Bullet;
