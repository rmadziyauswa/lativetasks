var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');


gulp.task('browserify',function(){
	browserify('./public/src/js/main.js')
	.transform('reactify')
	.bundle()
	.pipe(source('main.js'))
	.pipe(gulp.dest('./public/dist/js/'));

});


gulp.task('copy',function(){

	//the html files
	gulp.src('./public/src/*.*')
	.pipe(gulp.dest('./public/dist/'));

	//the js files
	gulp.src('./public/src/js/*.*')
	.pipe(gulp.dest('./public/dist/js'));



	gulp.src('./public/src/js/vendors/*.*')
	.pipe(gulp.dest('./public/dist/js'));



	//the css

	gulp.src('./public/src/stylesheets/*.*')
	.pipe(gulp.dest('./public/dist/css'));

	//the images

	gulp.src('./public/src/images/*.*')
	.pipe(gulp.dest('./public/dist/images/'));



	//the fonts

	gulp.src('./public/src/fonts/*.*')
	.pipe(gulp.dest('./public/dist/fonts/'));

});



gulp.task('default',['browserify','copy'],function(){
	return gulp.watch('./public/src/*.*',['browserify','copy']);
});