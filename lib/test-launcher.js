'use strict';

var _ = require('lodash');
var async = require('async');
var request = require('request');

var formatResponse = function(response){
    response.status = response.statusCode;
    delete response.statusCode;

    return response;
};

var pickElementToCompare = function(actualResponse, expectedResponse){
  if(!expectedResponse.body){
    return formatResponse(_.pick(actualResponse, ['statusCode', 'headers']));
  }

  return formatResponse(_.pick(actualResponse, ['statusCode', 'body', 'headers']));
};

var createRequest = function(testRequest, testResponse){

  var requestParam = _.merge({
    qs: testRequest.query,
    baseUrl: testRequest.scheme + '://' + testRequest.baseUrl
  }, _.omit(testRequest, ['query', 'baseUrl']));
  if(testResponse.headers['content-type'] === 'application/json'){
    _.merge(requestParam, {json:true});
  }

  return requestParam;
};

var findUnexpected = function(diffOnExpected, diffOnActual){
  return _.differenceBy(diffOnExpected, diffOnActual, _.isEqual);
};

var findDiff = function(expected, actual){
  return  _.reduce(expected, function(result, value, key) {
    if(!_.isEqual(value, actual[key])){
      var diff = {};
      diff[key] = value;
      result.push(diff);
    }

    return result;
  }, []);
};

var makeCall = function(testCase, done){
  var requestSpec = createRequest(testCase.request, testCase.response);
  request(requestSpec, function(err, res){
    if(err){
      if(err.code === 'ECONNREFUSED'){
        return done(new Error('Cannot connect to ' + requestSpec.baseUrl + requestSpec.verb));
      }
      return done(err);
    }

    var response = pickElementToCompare(res, testCase.response);

    if(!_.isEqual(testCase.response, response)){
      var error = new Error('Responses are different');

      error.diff = findDiff(testCase.response, response);
      error.unexpected = findUnexpected(error.diff, findDiff(response, testCase.response));

      return done(error);
    }

    done(null, res);
  });
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

var launch = function(tests, done){
  async.concatSeries(tests, function(testCase, callback){
    makeCall(testCase, function(err, res){
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
