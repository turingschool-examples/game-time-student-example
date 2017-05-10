const Block = require('./block');

class Background extends Block {
  constructor(options) {
    super(options);
    this.velocity = 0.5;
  }

  draw(context) {
    context.fillRect(this.x, this.y, this.width, this.height);
    return this;
  }

  scroll() {
    this.x -= this.velocity;
  }

  update() {
    this.scroll();
    this.alternateBackgrounds();
  }

  alternateBackgrounds() {
    if (this.x + this.width < 0) {
      this.startNextBackground();
    }
    return this;
  }

  startNextBackground() {
    this.x = 900;
    return this;
  }
}

module.exports = Background;
