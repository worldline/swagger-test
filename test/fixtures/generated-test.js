'use strict';

exports.petsXample = {
  description: 'get /pets',
  request: {
    scheme: 'https',
    method: 'get',
    uri: 'https://localhost/v1/pets'
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
};

exports.petsFido7Xample = {
  description: 'get /pets/{id}',
  request: {
    params: {
      id: 'fido7'
    },
    scheme: 'https',
    method: 'get',
    uri: 'https://localhost/v1/pets/fido7'
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    }
  }
};
