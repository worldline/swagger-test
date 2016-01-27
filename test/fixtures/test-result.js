'use strict';

var _ = require('lodash');

exports.petsXampleOnlyOk = [{
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
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/pets'
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

exports.petsXampleOnlyKoByBadBody= [{
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
  },
  result:{
    status: 'KO',
    error: _.merge(new Error('Responses are different'),{
      diff: [{
        headers:{
          'content-type': 'application/json'
        }}],
      unexpected: []
    })
  }
}];

exports.petsXampleOnlyKo = [{
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
  },
  result:{
    status: 'KO',
    error: new Error('Cannot connect to http://localhost/v1/pets')
  }
}];

exports.advancedPetsXampleOnlyOk = [{
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
  },
  result:{
    status: 'WARN',
    error: 'There is no body defined in the test but a body response has been received'
  }
}];

exports.advancedPetsXampleOnlyKo = [{
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
  },
  result:{
    status: 'KO',
    error: _.merge(new Error('Responses are different'), {
      diff: [{
        body:[{
          name:'Goofy',
          birthday:2008
        },{
          name:'Andy',
          birthday:2010
        },{
          name:'Kitty',
          birthday:1999
        },{
          name:'Chick',
          birthday:2013
        },{
          name:'Cat',
          birthday:2011
        }]
      }],
      unexpected: []
    })
  }
}];

exports.advancedPetsXampleOnlyOk = [{
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];

exports.advancedPetsWithQueryParamXample = [{
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
    baseUrl: 'localhost/v1',
    method: 'get',
    uri: '/pets'
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
  },
  result:{
    status: 'OK',
    error: null
  }
}];
