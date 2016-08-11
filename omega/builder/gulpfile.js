var gulp = require('gulp'),
		stylus = require('gulp-stylus'),
		jade = require('gulp-jade'),
		watch = require('gulp-watch'),
		concat = require('gulp-concat'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber'),
		imagemin = require('gulp-imagemin'),
		pngquant = require('imagemin-pngquant'),
		jpegtran = require('imagemin-jpegtran'),
		sourcemaps = require('gulp-sourcemaps'),
		spritesmith = require("gulp.spritesmith"),
		browserSync = require('browser-sync');
/*
# ===============================================
# Конфиг
# ===============================================
*/
var paths = {
		publicDir: '../public',
		stylusSrc: '../src/stylus',
		jadeSrc: '../src/templates',
		jsSrc: '../src/js',
		imgSrc : '../src/images',
		iconsSrc : '../src/icons'
}
/*
# ===============================================
# Сжатие картинок
# ===============================================
*/
gulp.task('pngopt', function () {
    return gulp.src(paths.imgSrc + '/*.png')
		.pipe(plumber())
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(paths.publicDir + '/images'))
		.pipe(notify("PNG optimized"));
});
gulp.task('jpgopt', function () {
    return gulp.src(paths.imgSrc + '/*.jpg')
        .pipe(jpegtran({ progressive: true })())
        .pipe(gulp.dest(paths.publicDir + '/images'))
        .pipe(notify("JPG optimized"));
});
/*
# ===============================================
# Спрайты
# ===============================================
*/
gulp.task('sprite', function() {
    var spriteData =
        gulp.src(paths.iconsSrc + '/*.*')     // путь, откуда берем картинки для спрайта
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.styl',
                imgPath: '../images/sprite.png',//Путь прописаный в CSS как Background-image
                cssFormat: 'stylus',
                cssTemplate: 'stylus.template.mustache',
                padding: 10,
                algorithm: 'top-down',
                cssVarMap: function(sprite) {
                    sprite.name = 's-' + sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest(paths.imgSrc)); // путь, куда сохраняем картинку (сохраняем в imgSrc для последующей оптимизации )
	spriteData.css.pipe(gulp.dest(paths.stylusSrc)); // путь, куда сохраняем стили
});
/*
# ===============================================
# Конкатенация JavaScript файлов
# ===============================================
*/
gulp.task('concat', function(){
	return gulp.src([
			paths.jsSrc + '/jquery.js',
            paths.jsSrc + '/jquery-ui.js',
			paths.jsSrc + '/bootstrap.js',
			paths.jsSrc + '/vendor/*.js',
			paths.jsSrc + '/custom.js'
		])
		.pipe(concat('frontend.js'))
		/*.pipe(uglify())*/
		.pipe(gulp.dest(paths.publicDir + '/js/'))
		.pipe(browserSync.reload({stream: true}))
		.pipe(notify("JavaScript Concatenated"));
});
/*
# ===============================================
# Компиляция Jade в HTML
# ===============================================
*/
gulp.task('jade', function () {
	gulp.src(paths.jadeSrc + '/index.jade')
	.pipe(plumber())
		.pipe(jade({pretty: true}))
		.pipe(gulp.dest(paths.publicDir))
	.pipe(browserSync.reload({stream: true}))
	.pipe(notify("Jade Compiled"));
});
/*
# ===============================================
# Компиляция Stylus в CSS
# ===============================================
*/
gulp.task('stylus', function () {
  gulp.src(paths.stylusSrc + '/main.styl')
	.pipe(plumber())
	.pipe(sourcemaps.init())
    .pipe(stylus())
	.pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.publicDir + '/css/'))
	.pipe(browserSync.reload({stream: true}))
	.pipe(notify("Stylus Compiled"));
});

/*
# ===============================================
# Перезагрузка страницы
# ===============================================
*/
gulp.task("browser-sync", function() {
		browserSync.init(["css/*.css", "js/*.js","*.html"], {
			server: {
				baseDir: paths.publicDir
			}
		});
	});
/*
# ===============================================
# Отслеживание изменения файлов
# ===============================================
*/
gulp.task('watch', function() {
	gulp.watch(paths.jadeSrc + '/**/*.jade', ['jade']);
	gulp.watch(paths.stylusSrc + '/**/*.styl', ['stylus']);
	gulp.watch(paths.jsSrc + '/**/*.js', ['concat']);
	/*gulp.watch(paths.imgSrc + '/*.png', ['pngopt']);
	gulp.watch(paths.imgSrc + '/*.jpg', ['jpgopt']);*/
});
/*
# ===============================================
# Группы тасков
# ===============================================
*/
gulp.task('img', ['pngopt','jpgopt']);// Групировка тасков по оптимизациии картинок
gulp.task('default', ['jade','stylus','concat','browser-sync','watch']);
