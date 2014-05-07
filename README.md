# gulp-peaches

Peaches plugin for gulp.

## Install

```
$ npm install gulp-peaches
```

## Usage

```
var peaches = require('gulp-peaches');

gulp.task('peaches', function() {
  gulp.src('./src/*.css')
    .pipe(peaches())
    .pipe(gulp.dest('./build/'))
});
```

## LISENCE

(MIT License)

Copyright (c) 2014 ChenCheng sorrycc@gmail.com
