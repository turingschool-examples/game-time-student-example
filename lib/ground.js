const Background = require('./background');

class Ground extends Background {
  constructor(options) {
    super(options);
    this.velocity = options.velocity;
  }
}

module.exports = Ground;
