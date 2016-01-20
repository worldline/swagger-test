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
    error: new Error('expected \'content-type\' of \'application/json\', got \'application/json\'')
  }
}];

exports.advancedPetsXampleOnlyOk = [{
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/advancedPets'
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];

exports.advancedPetsXampleOnlyWarn = [{
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/advancedPets'
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
  },
  result:{
    status: 'WARN',
    error: 'There is no body defined in the test but a body response has been received'
  }
}];


var error = new Error('');
error.expected = [{
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
      }];
error.actual = {};
error.showDiff = true;
exports.advancedPetsXampleOnlyKo = [{
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/advancedPets'
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
  },
  result:{
    status: 'KO',
    error: error
  }
}];

exports.advancedPetsXampleOnlyOk = [{
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/advancedPets'
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
  },
  result:{
    status: 'OK',
    error: null
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
},
{
  description: 'get /advancedPets',
  request: {
    scheme: 'http',
    baseUri: 'localhost/v1',
    method: 'get',
    verb: '/advancedPets',
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];
