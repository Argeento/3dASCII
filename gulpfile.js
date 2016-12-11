const gulp = require( 'gulp' );
const browserify = require( 'gulp-browserify' );
const eslint = require( 'gulp-eslint' );
const htmlmin = require( 'gulp-htmlmin' );
const concat = require( 'gulp-concat' );
const plumber = require( 'gulp-plumber' );
const sass = require( 'gulp-sass' );
const cssnano = require( 'gulp-cssnano' );


gulp.task( 'js', () => {

	gulp.src( [ 'src/js/**', './gulpfile.js', '!src/js/three_modules/**' ] )
		.pipe( eslint( require( './config/eslint.json' ) ) )
		.pipe( eslint.format() );

	gulp.src( './src/js/app.js' )
		.pipe( plumber() )
		.pipe( browserify() )
		.pipe( gulp.dest( './build/js' ) );
} );


gulp.task( 'css', () => {
	gulp.src( 'src/sass/ascii.scss' )
		.pipe( plumber() )
		.pipe( sass() )
		.pipe( cssnano() )
		.pipe( gulp.dest( './build/css' ) );
} );

gulp.task( 'html', () => {
	gulp.src( 'src/html/index.html' )
		.pipe( htmlmin( require( './config/htmlmin.js' ) ) )
		.pipe( gulp.dest( './build' ) );
} );

gulp.task( 'watch', () => {
	gulp.watch( 'src/js/**', [ 'js' ] );
	gulp.watch( 'src/sass/**', [ 'css' ] );
	gulp.watch( 'src/html/**', [ 'html' ] );
} );

gulp.task( 'default', [ 'css', 'js', 'html' ] );
