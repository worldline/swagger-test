'use strict';

var expect = require('must');
var _ = require('lodash');
var testLauncher = require('../lib/test-launcher');
var generatedTest = require('./fixtures/generated-test');
var testResult = require('./fixtures/test-result');
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

      launchTest([ generatedTest.petsXample ], testResult.petsXampleOnlyOk, [stub], done);
    });

    it('should return WARN if the received response has a body', function(done){
      stub = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, { body: true }, {
          'content-type': 'application/json'
        });

      launchTest([ generatedTest.petsXample ], testResult.petsXampleOnlyWarn, [stub], done);
    });

    it('should return KO if the response is not the expected one', function(done){
      stub = nock('http://localhost')
        .get('/v1/pets')
        .reply(200, {}, {
          'content-type': 'application/xml'
        });

      launchTest([ generatedTest.petsXample ], testResult.petsXampleOnlyKo, [stub], done);
    });

    it('should return KO if the server cannot be reached', function(done){
      launchTest([ generatedTest.petsXample ], testResult.petsXampleOnlyKo, [stub], done);
    });
  });

  describe('given an Xample with a body response', function(){
    var stub;
    it('should return KO if the body response is not the expected one', function(done){
      stub = nock('http://localhost')
        .get('/v1/advancedPets')
        .reply(200, {}, {
          'content-type': 'application/json'
        });

      launchTest([ generatedTest.advancedPetsXample ], testResult.advancedPetsXampleOnlyKo, [stub], done);

    });

    it('should return OK if the body response is the expected one', function(done){
      stub = nock('http://localhost')
        .get('/v1/advancedPets')
        .reply(200, generatedTest.advancedPetsXample.response.body, {
          'content-type': 'application/json'
        });

      launchTest([ generatedTest.advancedPetsXample ], testResult.advancedPetsXampleOnlyOk, [stub], done);

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

      var stubAdvancedPets = nock('http://localhost')
        .get('/v1/advancedPets')
        .reply(200, generatedTest.advancedPetsXample.response.body, {
          'content-type': 'application/json'
        });

      launchTest([
          generatedTest.petsXample,
          generatedTest.petsFido4Xample,
          generatedTest.petsFido7Xample,
          generatedTest.advancedPetsXample
      ], testResult.allXampleOK, [stubPets, stubPetsFido4, stubPetsFido7, stubAdvancedPets], done);
    });
  });

});
