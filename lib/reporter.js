'use strict';

var _ = require('lodash');
var colors = require('colors/safe');

var printToConsole = function(text){
  console.log(text);
};

var report = function(tests){
  var reportResult = {
    'OK': function(content){
      printToConsole(colors.green('\u2713') + ' ' + content.description);
    },
    'WARN': function(content){
      printToConsole(colors.yellow('-' + ' ' + content.description));
      printToConsole('    ' + content.result.error);
    },
    'KO': function(content){
      printToConsole(colors.red('\u2717' + ' ' + content.description));
      printToConsole('    ' + content.result.error);
    }
  }
  _.forEach(tests, function(testContent){
    reportResult[testContent.result.status](testContent);
  });
};

module.exports.report = report;
