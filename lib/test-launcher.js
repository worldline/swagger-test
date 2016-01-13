'use strict';

var _ = require('lodash');
var async = require('async');
var supertest = require('supertest');

var call = function(testCase, done){
  var request = testCase.request;
  var response = testCase.response;

  var callResult = supertest(request.scheme + '://' + request.baseUri)
    .get(request.verb)
    .expect(response.status);
  _.forEach(response.headers, function(headerValue, headerKey){
    callResult = callResult.expect(headerKey, headerValue);
  });

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

      if(!_.isEmpty(res.body)){
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
