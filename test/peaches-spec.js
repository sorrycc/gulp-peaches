'use strict';

var File = require('gulp-util').File;
var fs = require('fs');
var resolve = require('path').resolve;
var gulpPeaches = require('../');

describe('peaches', function() {

  it('main', function(done) {
    var stream = gulpPeaches();

    stream
    .on('data', function(file) {
      var code = file.contents.toString();

      code.should.startWith('.ui-example, .ui-example-sub{background-image:url(');
      code.should.endWith(');}.ui-example{background-position:0 -82px;width:55px;height:54px;}.ui-example-sub{background-position:0 0;width:180px;height:80px;}');
      code.match(/http:\/\/gtms\d{2}.alicdn.com\/tps\/i\d\/[a-zA-Z0-9\-]+\.png/g)
        .length.should.eql(1);
    })
    .on('end', done);

    var fakeFile = new File({
      path: resolve('./test/fixtures/a.css'),
      contents: fs.readFileSync(resolve('./test/fixtures/a.css'))
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('ignore', function(done) {
    var stream = gulpPeaches({
      ignore: [resolve('./test/fixtures/a.css')]
    });
    var buf = fs.readFileSync(resolve('./test/fixtures/a.css'));

    stream
    .on('data', function(file) {
      var code = file.contents.toString();
      code.should.eql(buf.toString());
    })
    .on('end', done);

    var fakeFile = new File({
      path: resolve('./test/fixtures/a.css'),
      contents: buf
    });

    stream.write(fakeFile);
    stream.end();
  });
});
