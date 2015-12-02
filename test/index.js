'use strict';

var expect = require('must');
var index = require('../lib/index');
var testGenerator = require('../lib/test-generation');
var testLauncher = require('../lib/test-launcher');


describe('The global interface', function(){

  it('should contain a parse function', function(){
    expect(index).to.include(testGenerator.parse);
    expect(index).to.include(testLauncher.launch);
  });

});
