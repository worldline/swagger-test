'use strict';

var expect = require('must');
var index = require('../lib/index');
var testGenerator = require('../lib/test-generation');
var testLauncher = require('../lib/test-launcher');
var reporter = require('../lib/reporter');

describe('The global interface', function(){

  it('should contain a parse function', function(){
    expect(index).to.include(testGenerator.parse);
  });

  it('should contain a launch function', function(){
    expect(index).to.include(testLauncher.launch);
  });

  it('should contain a report function', function(){
    expect(index).to.include(reporter.report);
  });
});
