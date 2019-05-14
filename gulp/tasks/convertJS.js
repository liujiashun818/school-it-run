var gulp = require('gulp');
var babel = require('gulp-babel');
var config = require('../config').convertJS;

gulp.task('convertJS', function(){
  return gulp.src(config.src)
    .pipe(babel({
      presets: ['es2015', 'react']
    }))
    .pipe(gulp.dest(config.dest))
})
