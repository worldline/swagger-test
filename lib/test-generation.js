'use strict';

var template = require('url-template');
var _ = require('lodash');

/**
 * Get the first scheme define in the swagger specification.
 *
 * @param {Object} spec - A valid swagger specification.
 *
 * @return The first scheme define in the swagger specification. If there is no scheme define, return an empty String.
 */
var findSchemeFromSpec = function(spec){
  var scheme = '';
  if(spec.schemes){
    if(spec.schemes.length >= 1){
      scheme = spec.schemes[0];
    }
  }

  return scheme;
};

/**
 * Expand an uri with its parameters.
 * Exemple: /path/{id} can become /path/1
 *
 * @param {Object} uri - An uri expecting parameters
 * @param {Object} params - All the params define in x-amples[].request.params
 *
 * @return {String} An uri expanded with its parameters
 */
var expandUri = function(uri, params){
  var uriTemplate = template.parse(uri);
  return uriTemplate.expand(params);
};

var inferResponseElement = function(operation){
  var responseElement = {};
  if(operation.produces && operation.produces.length > 0){
    _.merge(responseElement, {
      headers: {
        'content-type': operation.produces[0]
      }
    });
  }
  return responseElement;
};

/**
 * Parse a single X-ample to create a test case.
 *
 * @param {Object} param
 * @param {Object} param.spec - A valid swagger specification.
 * @param {String} param.uri - The uri of the ressource to call in the test.
 * @param {String} param.method - The method of the verb to call in the test.
 *
 * @return {TestCase} A test case extracted from the specification.
 */
var parseXample = function(param){
  return function(xample){
    var overwritableProperties = {
      baseUri: param.spec.host + param.spec.basePath,
      scheme: findSchemeFromSpec(param.spec)
    };

    var nonOverwritableProperties = {
      method: param.method,
      verb: expandUri(param.uri, _.get(xample, 'request.params', {}))
    };

    return {
      description: xample.description || param.method + ' ' + param.uri,
      request: _.merge(overwritableProperties, xample.request, nonOverwritableProperties),
      response: _.merge(inferResponseElement(param.operation), xample.response)
    };
  };
};

/**
 * Parse a method of a path to find all test case that it contains.
 *
 * @param {Object} param
 * @param {Object} param.spec - A valid swagger specification.
 * @param {String} param.uri - The uri of the ressource to call in the test.
 *
 * @return {Function} function - to pass has a callback for _.map.
 * @param {Object} function operation - An operation object has describe in swagger documentation.
 * @param {String} function method - The method of the verb to call in the test.
 */
var parseMethod = function(param){
  return function(operation, method){
    var xamples = operation['x-amples'];
    if(xamples){
      return _.map(xamples, parseXample(_.merge({method: method, operation: operation}, param)));
    }
  };
};

/**
 * Parse a path to find all test case that it contains.
 *
 * @param {Object} spec - A valid swagger specification.
 *
 * @return {Function} function - to pass has a callback for _.map.
 * @param {Object} function path - A path object has describe in swagger documentation.
 * @param {String} function uri - The uri of the ressource to call in the test.
 */
var parsePath = function(spec){
  return function(path, uri) {
    return _.flatten(_.map(path, parseMethod({spec: spec, uri: uri})));
  };
};

/**
 * A TestCase is an object created by parsing the swagger specification. It contains a description of all tests that can
 * be made base on the x-amples property put in each request.
 *
 * @typedef {Object} TestCase
 * @property {String} description - The test description. Take x-amples[].description by default. Generate a default
 *      definition otherwise.
 * @property {Object} request - The definition of the request to perform in this test.
 * @property {String}] request.baseUri - The base uri of the request.Take x-amples[].baseUri by default. Generate a
 *      default baseUri otherwise base on the specification host and basePath.
 * @property {String} request.scheme - The scheme to use to perform the request (i.e. http, https, ...). Can be empty.
 * @property {String} request.method - The method to use to perform the request.
 * @property {String} request.verb - The verb to call in this test
 * @property {Object} response - The response return by the API. Take x-amples[].response.
 */

/**
 * Parse a Swagger specification to find all test case define in it thanks to the x-amples element.
 *
 * @param {Object} spec - A valid swagger specification.
 *
 * @return {TestCase[]} All test case find in this specification.
 */
var parse = function(spec) {
  return _.flatten(_.map(spec.paths || {}, parsePath(spec)));
};

module.exports.parse = parse;
