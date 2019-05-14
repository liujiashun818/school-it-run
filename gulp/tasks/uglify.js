var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  config = require('../config').markup;


gulp.task('minifyjs', function () {
  gulp.src(config.dest+'/app.js')
  	.pipe(concat('main.js'))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.dest));
});

gulp.task('minifycss', function () {
  gulp.src(config.dest+'/main.css')
    .pipe(rename('main.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest(config.dest));
});

