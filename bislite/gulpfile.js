var gulp = require('gulp'),
	watch = require('gulp-watch'),
    less = require('gulp-less'),
	plumber = require('gulp-plumber');

gulp.task('less', function() {
  gulp.src('less/main.less')
	.pipe(plumber()) // plumber
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('less/*.less', ['less']);
})

gulp.task('default', ['less','watch']);