'use strict';

var template = require('url-template');

var buildUri = function(scheme, host, basePath, path){
  return scheme + '://' + host + basePath + path;
};

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

var parseXample = function(spec, uri, method, xample) {
  var uriTemplate = template.parse(uri);
  var expandedUri = uriTemplate.expand(xample.request.params);
  var scheme = findScheme(spec, xample);
  xample.request.scheme = scheme;
  xample.request.method = method;
  xample.request.uri = buildUri(scheme, spec.host, spec.basePath, expandedUri);
  return {
    description: method + ' ' + uri,
    request: xample.request,
    response: xample.response
  };
};

var inferXample = function(spec, uri, method, operation, statusString) {
  var scheme = findSchemeFromSpec(spec);
  var request = {
    scheme: scheme,
    method: method,
    uri: buildUri(scheme, spec.host, spec.basePath, uri)
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
