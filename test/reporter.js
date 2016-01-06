'use strict';

var expect = require('must');
var testResult = require('./fixtures/test-result');
var rewire = require('rewire');
var colors = require('colors/safe');

var reporter = rewire('../lib/reporter');

describe('Test Reporting', function () {
  var consoleText = [];
  beforeEach(function(){
    reporter.__set__('printToConsole', function(text){
      consoleText.push(text);
    });
  });

  it('should contain one result ok', function () {
    reporter.report(testResult.petsXampleOnlyOk);
    expect(consoleText).to.eql([
      colors.green('\u2713') + ' '+ testResult.petsXampleOnlyOk[0].description
    ]);
  });

  it('should contain one result warn', function () {
    reporter.report(testResult.petsXampleOnlyWarn);
    expect(consoleText).to.eql([
      colors.yellow('-' + ' '+ testResult.petsXampleOnlyWarn[0].description),
      '    '+ testResult.petsXampleOnlyWarn[0].result.error
    ]);
  });

  it('should contain one result ko', function () {
    reporter.report(testResult.petsXampleOnlyKo);
    expect(consoleText).to.eql([
      colors.red('\u2717' + ' '+ testResult.petsXampleOnlyKo[0].description),
      '    '+ testResult.petsXampleOnlyKo[0].result.error
    ]);
  });

  it('should all result ok', function () {
    reporter.report(testResult.allXampleOK);
    expect(consoleText).to.eql([
      colors.green('\u2713') + ' '+ testResult.allXampleOK[0].description,
      colors.green('\u2713') + ' '+ testResult.allXampleOK[1].description,
      colors.green('\u2713') + ' '+ testResult.allXampleOK[2].description
    ]);
  });

  afterEach(function(){
    consoleText = [];
  });
});
