'use strict';

var peaches = require('peaches');
var es = require('event-stream');
var _ = require('lodash');
var PluginError = require('gulp-util').PluginError;

// Consts
var PLUGIN_NAME = 'gulp-peaches';

module.exports = function gulpPeaches(opt) {

  var defaultOpt = {
    server: {
      "name": "tfs",
      "root": "./tmp",
      "tmp": "./tmp"
    }
  };

  opt = _.extend(defaultOpt, opt);

  return es.map(function(file, cb) {
    if (file.isNull()) return cb(null, file);
    if (file.isStream()) throw new PluginError(PLUGIN_NAME, 'gulp-peaches: Streaming not supported')

    var content = String(file.contents);
    peaches(content, opt, function(err, newContent) {
      file.contents = new Buffer(newContent);
      cb(null, file);
    });
  });
};
