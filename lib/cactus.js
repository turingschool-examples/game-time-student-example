const Block = require('./block');
const Images = require('./imageRepo');

class Cactus extends Block {
  constructor(options) {
    super(options);
    this.velocity = options.velocity;
    this.shot = false;
    this.left = options.left;
    this.middle = options.middle;
    this.right = options.right;
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

const cactiAvailable = [
  {image: Images.cactus1, x: 905, y: 250, width: 25, height: 50, velocity: 4, left: [0.05, 0.3, 0.41], middle: [0.3, 0.4, 0.08], right: [0.7, 1, 0.38]},
  {image: Images.cactus2, x: 1300, y: 258, width: 25, height: 42, velocity: 4, left: [0.05, 0.75, 0.05], middle: [0.05, 0.75, 0.05], right: [0.05, 0.75, 0.05]},
  {image: Images.cactus3, x: 1600, y: 220, width: 25, height: 80, velocity: 4, left: [1, 0.4, 0.27], middle: [0.4, 0.65, 0.02], right: [0.65, 1, 0.23]},
  {image: Images.cactus4, x: 1850, y: 235, width: 25, height: 65, velocity: 4, left: [0.12, 0.55, 0.05], middle: [0.12, 0.55, 0.05], right: [0.5, 1, 0.3]},
];

function randomCactusImage() {
  return cactiAvailable[Math.floor(Math.random()*cactiAvailable.length)].image;
}

module.exports = {
  Cactus: Cactus,
  cactiAvailable: cactiAvailable,
};
