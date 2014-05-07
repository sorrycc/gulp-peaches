'use strict';

var peaches = require('peaches');
var es = require('event-stream');
var _ = require('lodash');

module.exports = function gulpPeaches(opt) {

  opt = _.extend({
    server: {
      "name": "tfs",
      "root": "./tmp",
      "tmp": "./tmp"
    }
  }, opt);

  return es.map(function(file, cb) {
    var content = String(file.contents);
    peaches(content, opt, function(err, newContent) {
      file.contents = new Buffer(newContent);
      cb(null, file);
    });
  });
};
