
let canvas = document.getElementById('canvas');
let Session = require('./session');
let $ = require('jquery');

canvas.click();

let session = new Session(canvas, {start: true});

function game_loop(){
  session.tick();
  requestAnimationFrame(game_loop);
}
requestAnimationFrame(game_loop);

$(document).on('keydown', function (e) {
  session.triggerUserAction(e);
});

$('#mute-btn').on('click', function(){
    session.mute();
    $(this).toggle();
    $('#unmute-btn').toggle();
});

$('#unmute-btn').on('click', function(){
    session.unmute();
    $(this).toggle();
    $('#mute-btn').toggle();
});
