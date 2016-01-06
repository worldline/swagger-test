'use strict';

exports.petsXampleOnlyOk = [{
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];

exports.petsXampleOnlyWarn = [{
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
  },
  result:{
    status: 'WARN',
    error: 'There is no body defined in the test but a body response has been received'
  }
}];

exports.petsXampleOnlyKo = [{
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
  },
  result:{
    status: 'KO',
    error: new Error('expected \"content-type\" of \"application/json\", got \"application/json\"')
  }
}];

exports.allXampleOK = [{
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
  },
  result:{
    status: 'OK',
    error: null
  }
},
{
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
  },
  result:{
    status: 'OK',
    error: null
  }
},
{
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];
