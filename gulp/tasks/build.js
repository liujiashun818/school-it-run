var gulp = require('gulp');

gulp.task('build', ['convertJS', 'markup', 'less', 'browserify']);
gulp.task('uglify',['minifyjs','minifycss']);
