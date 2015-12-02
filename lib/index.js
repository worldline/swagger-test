'use strict';

var _ = require('lodash');

module.exports = _.merge({},
  require('./test-generation'),
  require('./test-launcher')
);
