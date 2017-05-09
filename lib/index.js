const canvas = document.getElementById('canvas');
const Session = require('./session');
const Scoreboard = require('./scoreboard');
const $ = require('jquery');

canvas.click();

const scoreboard1 = new Scoreboard();
scoreboard1.constructScoreboard();
let session = new Session(canvas, scoreboard1, { start: true });

function game_loop() {
  session.tick();
  requestAnimationFrame(game_loop);
}

requestAnimationFrame(game_loop);

$('#mute-btn').click((e) => {
  const button = $(e.currentTarget);
  const isMuted = button.hasClass('muted');
  if (isMuted) {
    session.unmute();
    $('#mute-btn').removeClass('muted');
    $('#mute-btn').addClass('unmuted');
  } else {
    session.mute();
    $('#mute-btn').removeClass('unmuted');
    $('#mute-btn').addClass('muted');
  }
});

document.addEventListener('keydown', (e) => {
  const isMuted = $('#mute-btn').hasClass('muted');

  if (e.keyCode === 32) {
    if (session.active === true) {
      e.preventDefault();
      session.dino.jump();
    }
  }

  if (e.keyCode === 83 && !scoreboard1.scorePending && session.active === false) {
    session.fatality.pause();
    session.fatality.currentTime = 0;
    session = new Session(canvas, scoreboard1, { start: false, muted: isMuted });
  }

  if (e.keyCode === 13 && session.active === true && session.dino.canShoot()) {
    e.preventDefault();
    session.dino.shoot.call(session);
  }
});
