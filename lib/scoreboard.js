const Firebase = require('firebase');
const $ = require('jquery');
const fireDb = new Firebase('https://dino-chrome.firebaseio.com/');

class Scoreboard {

  constructor() {
    this.highScores = [];
    this.fireDb = new Firebase('https://dino-chrome.firebaseio.com/');
    this.scorePending = false;
  }

  get sortedScores() {
    let sorted = this.highScores.sort( (a, b) => {
      return b.score - a.score;
    });
    return sorted;
  }

  constructScoreboard() {
    let that = this;
    fireDb.child('scoreboard').on('value', function(scores) {
        $('#scoreboard').empty();
        that.highScores = scores.val();
        that.highScores.forEach( (record, index) => {
          that.appendFormattedScore(record, index+1);
        });
    });
  }

  addScoreToHighScores(score) {
    if (this.sortedScores.length < 5 || score > this.sortedScores[4].score) {
      this.scorePending = true;
      $('.form').append(`<form><label>Sweet Dino Jumping Scores! Get Ready to be Famous!</label><input id='name' maxlength='20' type='text'></input><input id='submit' class='btn btn-score' type='submit'></input></form>`);
      $('#submit').on('click', (e) => {
        e.preventDefault();
        this.addScoreToScoreboard(score);
      });
    }
  }

  addScoreToScoreboard(score) {
    this.highScores.push({name: $('#name').val(), score: score});
    fireDb.set({ scoreboard: this.sortedScores.slice(0, 5) });
    $('.form').children().remove();
    this.scorePending = false;
  }

  appendFormattedScore(record, index) {
    $('#scoreboard').append(
      `<tr>
      <td>${index}.</td>
      <td id='player-name'>${record.name}</td>
      <td>${record.score}</td>
      </td>`
    );
  }
}

module.exports = Scoreboard;
