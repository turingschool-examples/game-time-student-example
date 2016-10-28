const Block = require('./block');
const Images = require('./imageRepo');

class Bullet extends Block {

  get defaultOptions() {
    return {
      image: Images.bulletImage,
      x: 0,
      y: 0,
      width: Bullet.size,
      height: Bullet.size
    };
  }

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

Bullet.size = 15;

module.exports = Bullet;
