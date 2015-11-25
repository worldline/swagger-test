'use strict';

var expect = require('chai').expect;
var index = require('../lib/index');
var testGenerator = require('../lib/test-generation');

describe('The global interface', function(){

  it('should contain a parse function', function(){
    expect(index).to.include.keys('parse');
    expect(index.parse).to.equal(testGenerator.parse);
  });

});
