const assets = {
  dinoSprite: './images/runDino1.png',
  dinoSprite1: './images/runDino2.png',
  dinoJump: './images/jump1.png',
  cactus1: './images/cactus1.png',
  cactus2: './images/cactus2.png',
  cactus3: './images/cactus3.png',
  cactus4: './images/cactus4.png',
  bkg1: './images/cloudCanvas1.png',
  bkg2: './images/cloudCanvas2.png',
  ground1: './images/ground1.png',
  ground2: './images/ground2.png',
  bulletImage: './images/bulletIcon.png',
  gameOver: './images/gameOver.png',
};

let fullImages = {};

for(let imageName in assets) {
  if(assets.hasOwnProperty(imageName)) {
    fullImages[imageName] = new Image();
    fullImages[imageName].src = assets[imageName];
  }
}

module.exports = {
  dinoSprite: fullImages.dinoSprite,
  dinoSprite1: fullImages.dinoSprite1,
  dinoJump: fullImages.dinoJump,
  cactus1: fullImages.cactus1,
  cactus2: fullImages.cactus2,
  cactus3: fullImages.cactus3,
  cactus4: fullImages.cactus4,
  bkg1: fullImages.bkg1,
  bkg2: fullImages.bkg2,
  ground1: fullImages.ground1,
  ground2: fullImages.ground2,
  bulletImage: fullImages.bulletImage,
  gameOver: fullImages.gameOver,
};
