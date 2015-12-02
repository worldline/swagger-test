'use strict';

var expect = require('must');
var _ = require('lodash');
var testLauncher = require('../lib/test-launcher');
var generatedTest = require('./fixtures/generated-test');
var nock = require('nock');
nock.disableNetConnect();

describe('test launcher', function () {

  var launchTest = function(xample, expectedResult, stubs, done){
    testLauncher.launch(xample, function(result){
      _.forEach(stubs, function(stub){
        expect(stub.isDone()).to.be.true();
      });

      expect(result).to.eql(expectedResult);

      done();
    });
  };

  describe('given a Xample without any response', function(){
    var stub;

    it('should return OK if the received response has no body', function(done){
      stub = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, null, {
          'content-type': 'application/json'
        });

      var expectedResult = [
        _.merge({
          result:{
            status: 'OK',
            error: null
          }
        }, generatedTest.petsXample)
      ];

      launchTest([ generatedTest.petsXample ], expectedResult, [stub], done);
    });

    it('should return WARN if the received response has a body', function(done){
      stub = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, { body: true }, {
          'content-type': 'application/json'
        });

      var expectedResult = [
        _.merge({
          result:{
            status: 'WARN',
            error: 'There is no body defined in the test but a body response has been received'
          }
        }, generatedTest.petsXample)
      ];

      launchTest([ generatedTest.petsXample ], expectedResult, [stub], done);
    });

    it('should return KO if the response is not the expected one', function(done){
      stub = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, {}, {
          'content-type': 'application/xml'
        });

      var expectedResult = [
        _.merge({
          result:{
            status: 'KO',
            error: new Error('expected \"content-type\" of \"application/json\", got \"application/json\"')
          }
        }, generatedTest.petsXample)
      ];

      launchTest([ generatedTest.petsXample ], expectedResult, [stub], done);
    });
  });

  describe('given a complete Xample', function(){
    it('should have done all test', function(done){
      var stubPets = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, null, {
          'content-type': 'application/json'
        });

      var stubPetsFido4 = nock('https://localhost')
        .get('/v1/pets/fido4')
        .reply(200, null, {
          'content-type': 'application/json'
        });

      var stubPetsFido7 = nock('http://localhost')
        .get('/v1/pets/fido7')
        .reply(200, null, {
          'content-type': 'application/json'
        });

      var result = {
        result:{
          status: 'OK',
          error: null
        }
      };

      var expectedResult = [
        _.merge({}, result,  generatedTest.petsXample),
        _.merge({}, result,  generatedTest.petsFido4Xample),
        _.merge({}, result,  generatedTest.petsFido7Xample)
      ];

      launchTest([
          generatedTest.petsXample,
          generatedTest.petsFido4Xample,
          generatedTest.petsFido7Xample
      ], expectedResult, [stubPets, stubPetsFido4, stubPetsFido7], done);
    });
  });

});
