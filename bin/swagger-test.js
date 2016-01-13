'use strict';

var program = require('commander');
var swaggerTest = require('../');
var yaml = require('js-yaml');
var fs = require('fs');
var path = require('path');

var isYaml = function(specFile){
  return specFile.indexOf('.yaml') === specFile.length - 5 || specFile.indexOf('.yml') === specFile.length - 4;
};

var loadSpec = function(specFile){
  if(isYaml(specFile)){
    return yaml.safeLoad(fs.readFileSync(specFile));
  }

  return require(specFile);
};

var specFile;

program
  .version(require('../package.json').version)
  .arguments('<specification>')
  .action(function(specification){
    specFile = specification;
  });

program.parse(process.argv);

if(!specFile){
  program.outputHelp();
  process.exit(1);
}

specFile = path.join(process.cwd(), specFile);

var spec;
try {
  spec = loadSpec(specFile);
} catch(error){
  console.log('Cannot load file ', specFile);
  console.log(error.message);
  process.exit(2);
}

var parsedSpec = swaggerTest.parse(spec);
swaggerTest.launch(parsedSpec, swaggerTest.report);
