'use strict';

var template = require('url-template');
var _ = require('lodash');

var findSchemeFromSpec = function(spec){
  var scheme = '';
  if(spec.schemes){
    if(spec.schemes.length >= 1){
      scheme = spec.schemes[0];
    }
  }

  return scheme;
};

var findScheme = function(spec, xample){
  var scheme = xample.request.scheme;
  if(!scheme){
    scheme = findSchemeFromSpec(spec);
  }

  return scheme;
};

var expandUri = function(uri, params){
  var uriTemplate = template.parse(uri);
  return uriTemplate.expand(params);
};

var parseXample = function(spec, uri, method, xample) {
  var request = _.merge({}, xample.request);

  request.baseUri = spec.host + spec.basePath;
  request.scheme = findScheme(spec, xample);
  request.method = method;
  request.verb = expandUri(uri, xample.request.params);

  return {
    description: method + ' ' + uri,
    request: request,
    response: xample.response
  };
};

var inferXample = function(spec, uri, method, operation, statusString) {
  var scheme = findSchemeFromSpec(spec);
  var request = {
    scheme: scheme,
    method: method,
    baseUri: spec.host + spec.basePath,
    verb: uri
  };
  var response = {
    status: parseInt(statusString)
  };
  if (operation.produces && operation.produces[0]) {
    response.headers = {
      'content-type':  operation.produces[0]
    };
  }
  return {
    description: method + ' ' + uri,
    request: request,
    response: response
  };
};

var parse = function(spec, options) {

  options = options || {};

  var xamples = [];

  Object.keys(spec.paths || {}).forEach(function (uri) {
    var path = spec.paths[uri];
    Object.keys(path).forEach(function (method) {
      var operation = path[method];
      if (operation['x-amples']) {
        operation['x-amples'].forEach(function (xample) {
          xamples.push(parseXample(spec, uri, method, xample));
        });
      } else if (options.inferXamples) {
        Object.keys(operation.responses || {}).forEach(function (statusString) {
          xamples.push(inferXample(spec, uri, method, operation, statusString));
        });
      }
    });
  });

  return xamples;
};

module.exports.parse = parse;
