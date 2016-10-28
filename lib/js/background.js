const Block = require('./block');
const Images = require('./imageRepo');

class Background extends Block {

  get defaultOptions() {
    return {
      x: 55,
      y: 0,
      width: 900,
      height: 200,
      image: Images.bkg1
    };
  }

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

  alternateBackgrounds(){
    if(this.x + this.width < 0) {
      this.startNextBackground();
    }
    return this;
  }

  startNextBackground(){
    this.x = 900;
    return this;
  }
}

module.exports = Background;
