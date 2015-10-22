/* jshint node: true */
'use strict';

var fs = require('fs');
var Plugin = require('broccoli-plugin');
var mergeTrees = require('broccoli-merge-trees');
var path = require('path');
var log = require('broccoli-stew').log;

var customTestFilePath = 'my-custom-test-files/test-file.js';
var customJsFilePath = 'my-custom-test-files/js-file.js';

AddCustomFile.prototype = Object.create(Plugin.prototype);
AddCustomFile.prototype.constructor = AddCustomFile;
function AddCustomFile(inputNodes, options) {
  this.path = options.path;
  Plugin.call(this, inputNodes);
}

AddCustomFile.prototype.build = function() {
  var outPath = path.join(this.outputPath, this.path);
  fs.mkdirSync(path.dirname(outPath));
  fs.writeFileSync(outPath, 'window.testing123 = true;');
};

module.exports = {
  name: 'addon-test-bug',
  included: function(app) {
    app.import({
      test: customTestFilePath
    });
    app.import(customJsFilePath);
  },
  postprocessTree: function(type, tree){
    if (type === 'test') {
      return mergeTrees([tree, log(new AddCustomFile([tree], {
        path: customTestFilePath
      }))]);
    } else if (type === 'js') {
      return mergeTrees([tree, log(new AddCustomFile([tree], {
        path: customJsFilePath
      }))]);
    }
    return tree;
  }
};
