const Block = require('./block');

class Bullet extends Block {
  update() {
    this.scroll();
  }

  scroll() {
    this.x = this.x + 2;
  }
}

  module.exports = Bullet;
