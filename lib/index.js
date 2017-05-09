const canvas = document.getElementById('canvas');
const Session = require('./session');
const Scoreboard = require('./scoreboard');
const $ = require('jquery');

canvas.click();

const scoreboard1 = new Scoreboard();
scoreboard1.constructScoreboard();
let session = new Session(canvas, scoreboard1, {start: true});
let muted = false;

function game_loop(){
  session.tick();
  requestAnimationFrame(game_loop);
}

requestAnimationFrame(game_loop);

document.addEventListener('keydown', function(e){
  if (e.keyCode === 32) {
    if (session.active === true) {
      e.preventDefault();
      session.dino.jump();
    }
  }
});

$('#mute-btn').on('click', function(){
    session.mute();
    muted = true;
    $(this).toggle();
    $('#unmute-btn').toggle();
});

$('#unmute-btn').on('click', function(){
    session.unmute();
    muted = false;
    $(this).toggle();
    $('#mute-btn').toggle();
});

document.addEventListener('keydown', function(e){
  if (e.keyCode === 83 && !scoreboard1.scorePending && session.active === false) {
    session.fatality.pause();
    session.fatality.currentTime = 0;
    session = new Session(canvas, scoreboard1, {start: false, muted: muted});
  }
});

document.addEventListener('keydown', function(e){
  if (e.keyCode === 13 && session.active === true && session.dino.canShoot()) {
    e.preventDefault();
    session.dino.shoot.call(session);
  }
});
