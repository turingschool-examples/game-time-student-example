const chai = require('chai');
const assert = chai.assert;

const createPoint = require('../lib/create-point');

describe("createPoint", () => {
  it("creates object with an x property", ()=> {
    let point = createPoint(1, 2);
    assert.equal(point.x, 1)
  });

  it("creates object with an y property", ()=> {
    let point = createPoint(1, 2);
    assert.equal(point.y, 2)
  });
});
