'use strict';

var fs = require('fs');
var swaggerTest = require('../lib/swagger-test');
var expect = require('chai').expect;

describe('test generation', function () {

  var testDir = __dirname;
  var buffer  = fs.readFileSync(testDir + '/swagger.json');
  var spec    = JSON.parse(buffer);

  var xamples = swaggerTest.parse(spec, { inferXamples: true });

  describe('with inference', function(){

    it('should contain three test cases', function () {
      expect(xamples.length).to.equal(3);
    });

    it('should test GET /pets first', function () {
      expect(xamples[0]).to.deep.equal({
        description: 'get /pets',
        request: {
          scheme: 'http',
          method: 'get',
          uri: 'http://localhost/v1/pets'
        },
        response: {
          status: 200,
          headers: {
            'content-type': 'application/json'
          }
        }
      });
    });

    it ('should test GET /pets/fido4 second', function () {
      expect(xamples[1]).deep.equal({
        description: 'get /pets/{id}',
        request: {
          params: {
            id: 'fido4'
          },
          scheme: 'http',
          method: 'get',
          uri: 'http://localhost/v1/pets/fido4'
        },
        response: {
          status: 200,
          headers: {
            'content-type': 'application/json'
          }
        }
      });
    });

    it ('should test GET /pets/fido7 last', function () {
      expect(xamples[2]).deep.equal({
        description: 'get /pets/{id}',
        request: {
          params: {
            id: 'fido7'
          },
          scheme: 'http',
          method: 'get',
          uri: 'http://localhost/v1/pets/fido7'
        },
        response: {
          status: 200,
          headers: {
            'content-type': 'application/json'
          }
        }
      });
    });
  });
});
