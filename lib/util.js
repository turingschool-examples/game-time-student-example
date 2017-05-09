function hitCactus(dinoX, dinoY, cactus) {
  const c = cactus.image.src.match(/[^\\/]+$/)[0];

  if (c === 'cactus1.png') {
    if ((dinoX > cactus.x + cactus.width * 0.05 &&
      dinoX < cactus.x + (cactus.width * 0.3) &&
      dinoY > (cactus.y + cactus.height * 0.41))) {
      return true;
    }

    if ((dinoX > cactus.x + (cactus.width * 0.3)) &&
      dinoX < (cactus.x + (cactus.width * 0.4)) &&
      dinoY > (cactus.y + (cactus.height * 0.08))) {
      return true;
    }

    if ((dinoX > cactus.x + (cactus.width * 0.7)) &&
      dinoX < (cactus.x + cactus.width) &&
      dinoY > (cactus.y + (cactus.height * 0.38))) {
      return true;
    }
  }

  if (c === 'cactus2.png') {
    if ((dinoX > cactus.x + cactus.width * 0.05 &&
      dinoX < cactus.x + (cactus.width * 0.75) &&
      dinoY > (cactus.y + cactus.height * 0.05))) {
      return true;
    }
  }

  if (c === 'cactus3.png') {
    if ((dinoX > cactus.x &&
      dinoX < cactus.x + (cactus.width * 0.4) &&
      dinoY > (cactus.y + cactus.height * 0.27))) {
      return true;
    }

    if ((dinoX > cactus.x + (cactus.width * 0.4)) &&
      dinoX < (cactus.x + (cactus.width * 0.65)) &&
      dinoY > (cactus.y + (cactus.height * 0.02))) {
      return true;
    }

    if ((dinoX > cactus.x + (cactus.width * 0.65)) &&
    dinoX < (cactus.x + cactus.width) &&
    dinoY > (cactus.y + (cactus.height * 0.23))) {
      return true;
    }
  }

  if (c === 'cactus4.png') {
    if ((dinoX > cactus.x + cactus.width * 0.12 &&
      dinoX < cactus.x + (cactus.width * 0.55) &&
      dinoY > (cactus.y + cactus.height * 0.05))) {
      return true;
    }

    if ((dinoX > cactus.x + (cactus.width * 0.5)) &&
      dinoX < (cactus.x + cactus.width) &&
      dinoY > (cactus.y + (cactus.height * 0.3))) {
      return true;
    }
  }

  return false;
}

exports.hitCactus = hitCactus;
