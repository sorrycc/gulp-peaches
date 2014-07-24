# gulp-peaches

Peaches plugin for gulp.

## Install

```bash
$ npm install gulp-peaches
```

## Usage

```javascript
var peaches = require('gulp-peaches');
var options = {};

gulp.task('peaches', function() {
  gulp.src('./src/*.css')
    .pipe(peaches(options))
    .pipe(gulp.dest('./build/'))
});
```

## Options

* `server`, server option, will pass through to peaches
* `clean`, clean tmp folder after peaches is done, default false

## LISENCE

(MIT License)

Copyright (c) 2014 ChenCheng sorrycc@gmail.com
