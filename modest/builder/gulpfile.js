var gulp = require('gulp'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	plumber = require('gulp-plumber'),
	spritesmith = require('gulp.spritesmith');

/*---------------------TASKS----------------------------*/


gulp.task('less', function() {
  	gulp.src('../src/less/main.less')
		.pipe(plumber()) 
	    .pipe(less())
	    .pipe(gulp.dest('../site/css'));
});

gulp.task('sprite', function() {
    var spriteData = 
        gulp.src('../src/sprite-output/*.*') // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: 'sprite.less',
                imgPath: '../images/design/sprite.png',//Путь прописаный в CSS как Background-image
                cssFormat: 'less',
                padding: 4,
                algorithm: 'binary-tree',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('../site/images/design')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('../src/LESS')); // путь, куда сохраняем стили
});

gulp.task('watch', function() {
  gulp.watch('../src/less/*.less', ['less']);
})

gulp.task('default', ['less','watch']);