const Block = require('./block');
const Images = require('./imageRepo');

let cactiImages = [
  Images.cactus1,
  Images.cactus2,
  Images.cactus3,
  Images.cactus4
];

function randomCactusImage() {
  return cactiImages[Math.floor(Math.random()*cactiImages.length)];
}

class Cactus extends Block {

  get defaultOptions() {
    return {
      image: Images.cactus1,
      x: 905,
      y: 250,
      width: 25,
      height: 50,
      velocity: 4
    };
  }

  constructor(options) {
    super(options);
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

  resurrect(newPixelLocation){
    this.x = newPixelLocation;
    this.changeImage(randomCactusImage());
    return this;
  }

  resurrectWhenOffScreenTo(newPixelLocation){
    if(this.x < 0 - this.width) {
      this.resurrect(newPixelLocation);
    }
    return this;
  }

  resurrectWhenShotTo(newPixelLocation) {
    if(this.shot === true) {
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
