'use strict';

exports.petsXample = {
  description: 'get /pets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/pets'
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  }
};

exports.petsFido4Xample = {
  description: 'get /pets/{id}',
  request: {
    scheme: 'https',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/pets/fido4',
    params: {
      id: 'fido4'
    }
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  }
};

exports.petsFido7Xample = {
  description: 'get /pets/{id}',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/pets/fido7',
    params: {
      id: 'fido7'
    }
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  }
};
