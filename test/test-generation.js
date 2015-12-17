'use strict';

var testGenerator = require('../lib/test-generation');
var expect = require('must');
var result = require('./fixtures/generated-test');
var spec = require('./fixtures/swagger');

describe('test generation', function () {
  var xamples;

  before(function(){
    xamples = testGenerator.parse(spec, { inferXamples: false });
  });

  it('should contain three test cases', function () {
    console.log(xamples);
    expect(xamples.length).to.equal(3);
  });

  it ('should test GET /pets', function () {
    expect(xamples[0]).to.eql(result.petsXample);
  });

  it ('should test GET /pets/fido4', function () {
    expect(xamples[1]).to.eql(result.petsFido4Xample);
  });

  it ('should test GET /pets/fido7', function () {
    expect(xamples[2]).to.eql(result.petsFido7Xample);
  });
});
