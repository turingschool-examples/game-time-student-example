const chai = require('chai');
const assert = chai.assert;

const Score = require('../lib/score');

describe("Score", function(){
  it("instantiates with a frameCount of 0", function(){
    let score = new Score();

    assert.equal(score.frameCount, 0);
  });

  it("increments frameCount by 1 when update is called", function(){
    let score = new Score();
    score.update();
    assert.equal(score.frameCount, 1);
  });

  it("currentScore starts at 0", function(){
    let score = new Score();

    assert.equal(score.currentScore, 0);
  });

  it("returns the currentScore based on the frameCount", function(){
    let score = new Score();
    for(let i = 0; i < 120; i++) {
      score.update();
    }
    assert.equal(score.currentScore, 3);
  });
});
