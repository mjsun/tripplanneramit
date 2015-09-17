var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', function() {
  console.log("Gulp is running...")
})

gulp.task('sass', function () {
  gulp.src('assets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public'));
});

gulp.task('sass:watch', ['sass'], function () {
  gulp.watch('assets/**/*.scss', ['sass']);
});
