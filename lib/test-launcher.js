'use strict';

var _ = require('lodash');
var async = require('async');
var supertest = require('supertest');

var expectedHeader = function(callResult, response){
  _.forEach(response.headers, function(headerValue, headerKey){
    callResult = callResult.expect(headerKey, headerValue);
  });

  return callResult;
}

var expectedResponse = function(callResult, response){
  if(response.body){
    return callResult.expect(response.status, response.body);
  }

  return callResult.expect(response.status);
}

var call = function(testCase, done){
  var request = testCase.request;
  var response = testCase.response;

  var callResult = supertest(request.scheme + '://' + request.baseUri)
    .get(request.verb)
    .expect(function(res){
      if(!res){
        throw new Error('Cannot connect to ' + request.scheme + '://' + request.baseUri + request.verb);
      }
    });

    callResult = expectedResponse(callResult, response);
    callResult = expectedHeader(callResult, response);
    callResult.end(done);
};

var addResult = function(testCase, status, error, done){
  done(null, _.merge({
    result: {
      status: status,
      error: error
    }
  }, testCase
  ));
};

var launch = function(xamples, done){
  async.concatSeries(xamples, function(testCase, callback){
    call(testCase, function(err, res){
      if(err){
        return addResult(testCase, 'KO', err, callback);
      }

      if(!_.isEmpty(res.body) && _.isEmpty(testCase.response.body)){
        addResult(testCase, 'WARN',
            'There is no body defined in the test but a body response has been received', callback);
      }

      addResult(testCase, 'OK', null, callback);
    });
  }, function(err, res){
    // err cannot exist here since there is no error in the above function
    done(res);
  });
};

module.exports.launch = launch;
