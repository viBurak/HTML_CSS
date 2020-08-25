const gulp = require('gulp');
const iconfont = require('gulp-iconfont');
const iconfontCss = require('gulp-iconfont-css');
const del = require('del');
const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cache = require('gulp-cache');
const changed = require('gulp-changed');
const sass = require('gulp-sass');
const htmlmin = require('gulp-htmlmin');

var fontName = 'icons';

gulp.task('minify', () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public'));
});

gulp.task('iconfont', async function () {
	gulp.src(['source/images/icon/*.svg'])
	.pipe(iconfontCss({
		fontName: fontName,
		path: 'source/scss/utils/_icons.scss',
		targetPath: '../../scss/utils/_icons-list.scss',
		fontPath: '../fonts/icons/',
		centerHorizontally: true
	}))
	.pipe(iconfont({
		fontName: fontName,
		formats: ['svg', 'ttf', 'eot', 'woff', 'woff2'],
		fontHeight: 1001,
		normalize: true,
	}))
	.pipe(gulp.dest('source/fonts/icons/'));
});

gulp.task('fonts', function () {
	return gulp.src('source/fonts/**/*')
		 .pipe(newer('public/fonts'))
		 .pipe(gulp.dest('public/fonts'));
});

gulp.task('styles', function () {
	return gulp.src('source/scss/**/*.scss')
		 .pipe(changed('public/css', {extension: '.css'}))
		 .pipe(sass())
		 .pipe(concat('all.min.css'))
		 .pipe(gulp.dest('public/css'))
});

gulp.task('images', function () {
	return gulp.src('source/images/**/*.{jpg,jpeg,png,gif,svg}')
		 .pipe(newer('public/images'))
		 .pipe(gulp.dest('public/images'));
});


gulp.task('js', function () {
	return gulp.src('source/js/**/*')
		 .pipe(concat('all.min.js'))
		 .pipe(gulp.dest('public/js'));
});


gulp.task('clean', function () {
	return del('public/*');
});

gulp.task('clear', function () {
	return cache.clearAll();
});


gulp.task('build', gulp.series(
	'clean',
	gulp.parallel( 'styles', 'js', 'images', 'fonts', 'iconfont', 'minify'))
);

gulp.task('watch', function () {
	gulp.watch('source/scss/**/*.*', gulp.series('styles'));
	gulp.watch('source/images/**/*.*', gulp.series('images'));
	gulp.watch('source/js/**/*.*', gulp.series('js'));
	gulp.watch('source/fonts/**/*.*', gulp.series('fonts'));
	gulp.watch('source/images/icons/**/*.*', gulp.series('iconfont'));
	gulp.watch('source/*.html', gulp.series('minify'));
});

gulp.task('server', function () {
	browserSync.init({
		 server: 'public'
	});
	browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
	gulp.series('build', gulp.parallel('watch', 'server'))
);

