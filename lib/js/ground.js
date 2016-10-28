const Block = require('./block');
const Background = require('./background');
const Images = require('./imageRepo');

class Ground extends Background {

  get defaultOptions() {
    return {
      image: Images.ground1,
      x: 0,
      y: 300,
      width: 940,
      height: 60,
      velocity: 4
    };
  }

  constructor(options) {
    super(options);
  }
}

module.exports = Ground;
