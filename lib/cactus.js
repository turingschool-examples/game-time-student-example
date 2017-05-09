const Block = require('./block');

const cactus1 = new Image();
cactus1.src = './images/cactus1.png';
const cactus2 = new Image();
cactus2.src = './images/cactus2.png';
const cactus3 = new Image();
cactus3.src = './images/cactus3.png';
const cactus4 = new Image();
cactus4.src = './images/cactus4.png';

const cactiImages = [cactus1, cactus2, cactus3, cactus4];

function randomCactusImage() {
  return cactiImages[Math.floor(Math.random() * cactiImages.length)];
}

class Cactus extends Block {
  constructor(options) {
    super(options);
    this.velocity = options.velocity;
    this.shot = false;
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
    this.resurrectWhenOffScreenTo(950);
    this.resurrectWhenShotTo(950);
  }

  resurrect(newPixelLocation) {
    this.x = newPixelLocation;
    this.changeImage(randomCactusImage());
    return this;
  }

  resurrectWhenOffScreenTo(newPixelLocation) {
    if (this.x < 0 - this.width) {
      this.resurrect(newPixelLocation);
    }
    return this;
  }

  resurrectWhenShotTo(newPixelLocation) {
    if (this.shot === true) {
      this.resurrect(newPixelLocation);
      this.shot = false;
    }
    return this;
  }

  changeImage(newImage) {
    this.image = newImage;
  }
}

module.exports = Cactus;
