const Firebase = require('firebase');
const $ = require('jquery');

const fireDb = new Firebase('https://dino-chrome.firebaseio.com/');

function appendFormattedScore(record, index) {
  const name = document.createElement('td');
  name.textContent = record.name;
  $('#scoreboard').append(
    `<tr>
    <td>${index}.</td>
    <td id='player-name'>${name.textContent}</td>
    <td>${record.score}</td>
    </td>`
  );
}

class Scoreboard {

  constructor() {
    this.highScores = [];
    this.fireDb = new Firebase('https://dino-chrome.firebaseio.com/');
    this.scorePending = false;
  }

  get sortedScores() {
    return this.highScores.sort((a, b) => b.score - a.score);
  }

  constructScoreboard() {
    fireDb.child('scoreboard').on('value', (scores) => {
        $('#scoreboard').empty();
        this.highScores = scores.val();
        this.highScores.forEach((record, index) => {
          appendFormattedScore(record, index + 1);
        });
    });
  }

  addScoreToHighScores(score) {
    if (this.sortedScores.length < 5 || score > this.sortedScores[4].score) {
      this.scorePending = true;
      $('.form').append(`<form><label>Sweet Dino Jumping Scores! Get Ready to be Famous!</label><input id="name" maxlength="20" type="text"></input><input id="submit" class="btn btn-score" type="submit"></input></form>`);
      $('#submit').on('click', (e) => {
        e.preventDefault();
        this.addScoreToScoreboard(score);
      });
    }
  }

  addScoreToScoreboard(score) {
    this.highScores.push({ name: $('#name').val(), score });
    fireDb.set({ scoreboard: this.sortedScores.slice(0, 5) });
    $('.form').children().remove();
    this.scorePending = false;
  }
}

module.exports = Scoreboard;
