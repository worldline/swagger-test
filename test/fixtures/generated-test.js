'use strict';

exports.petsXample = {
  description: 'get /pets',
  request: {
    scheme: 'http',
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/pets'
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
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/pets/fido4',
    path: {
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
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/pets/fido7',
    path: {
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

exports.advancedPetsXample = {
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/advancedPets'
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: [{
      name: 'Goofy',
      birthday: 2008
    }, {
      name: 'Andy',
      birthday: 2010
    }, {
      name: 'Kitty',
      birthday: 1999
    }, {
      name: 'Chick',
      birthday: 2013
    }, {
      name: 'Cat',
      birthday: 2011
    }]
  }
};

exports.advancedPetsWithQueryParamXample = {
  description: 'get /advancedPetsWithQueryParam',
  request: {
    scheme: 'http',
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/advancedPetsWithQueryParam',
    query: {
      limit: 1
    }
  },
  response: {
    status: 200,
    headers: {
      'content-type': 'application/json'
    },
    body: [{
      name: 'Goofy',
      birthday: 2008
    }]
  }
};
