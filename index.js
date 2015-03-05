'use strict';

var peaches = require('peaches');
var path = require('path');
var rimraf = require('rimraf');
var through = require('through2');
var debug = require('debug')('gulp-peaches');
var PluginError = require('gulp-util').PluginError;
var _ = require('lodash');

// Consts
var PLUGIN_NAME = 'gulp-peaches';

module.exports = function gulpPeaches(options) {

  var defaultOpt = {
    server: {
      'name': 'tfs',
      'root': './tmp',
      'tmp': './tmp'
    },
    clean: false,
    ignore: []
  };

  options = _.extend(defaultOpt, options);

  return through.obj(function transform(file, enc, callback) {
    if (file.isNull()) return callback(null, file);
    if (file.isStream()) return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported.'));

    if (options.ignore.indexOf(file.path) > -1) {
      return callback(null, file);
    }

    var that = this;
    var code = file.contents.toString();
    peaches(code, options, function(err, styleText) {
      if (err) {
        debug('file %s error %s', file.path, err);
        return callback(new PluginError(err));
      }

      debug('file %s success', file.path);
      file.contents = new Buffer(styleText);
      that.push(file);

      if (options.server.tmp && options.clean) {
        var tmp = path.resolve(options.server.tmp);
        debug('remove tmp %s', tmp);
        rimraf(tmp, callback);
      } else {
        callback();
      }
    });
  });
};
