'use strict';

var testGenerator = require('../lib/test-generation');
var expect = require('must');
var result = require('./fixtures/generated-test');
var spec = require('./fixtures/swagger');

describe('test generation', function () {
  var xamples;

  describe('with inference', function(){
    before(function(){
      xamples = testGenerator.parse(spec, { inferXamples: true });
    });

    it('should contain three test cases', function () {
      expect(xamples.length).to.equal(3);
    });

    it('should test GET /pets first', function () {
      expect(xamples[0]).to.eql(result.petsXample);
    });

    it ('should test GET /pets/fido4 second', function () {
      expect(xamples[1]).to.eql(result.petsFido4Xample);
    });

    it ('should test GET /pets/fido7 last', function () {
      expect(xamples[2]).to.eql(result.petsFido7Xample);
    });
  });

  describe('without inference', function(){

    before(function(){
      xamples = testGenerator.parse(spec, { inferXamples: false });
    });

    it('should contain three test cases', function () {
      expect(xamples.length).to.equal(2);
    });

    it ('should test GET /pets/fido4 first', function () {
      expect(xamples[0]).to.eql(result.petsFido4Xample);
    });

    it ('should test GET /pets/fido7 last', function () {
      expect(xamples[1]).to.eql(result.petsFido7Xample);
    });
  });
});
