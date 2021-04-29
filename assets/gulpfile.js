const gulp = require('gulp'),
	chalk = require('chalk'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify'),
	rename = require("gulp-rename"),
	log = require('fancy-log'),
	sourcemaps = require('gulp-sourcemaps'),
	gulpif = require('gulp-if'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	es = require('event-stream'),
	glob = require('glob'),
	imagemin = require('gulp-imagemin'),
	clean = require('gulp-clean');

const options = {
	src: "./src",
	dist: "./dist",
	isProd: process.env.NODE_ENV === "production", // check if env is Prod or not
	//isProd: true  // testing purposes
};

gulp.task('clean', () =>
	gulp.src(options.dist, { read: false, allowEmpty: true })
		.pipe(clean())
);

// Styles
gulp.task('styles', () =>
	gulp
		.src(options.src + '/styles/' + (process.argv[2] === "--style" ? process.argv[3] : '*') + '.scss')
		//.pipe(gulpif(!options.isProd, sourcemaps.init()))  // don't create source maps in Prod env
		.pipe(sass({ outputStyle: options.isProd ? "compressed" : "" }).on('error', sass.logError))
		.pipe(prefix({
			overrideBrowserslist: ['last 30 versions', '> 1%', 'ie 8', 'ie 9'],
			cascade: false
		}))
		.pipe(plumber())
		.pipe(rename({
			suffix: ".min",
		}))
		//.pipe(gulpif(!options.isProd, sourcemaps.write('.'))) // don't write source maps in Prod env
		.pipe(gulp.dest(options.dist + '/styles'))
);

// Javascript
gulp.task('scripts', done => {
	//glob(options.src + '/scripts/*.js', function (err, entries) {
	glob(options.src + '/scripts/' + (process.argv[4] === "--script" ? process.argv[5] : '*') + '.js', function (err, entries) {
		if (err) done(err);
		let tasks = entries.map(entry =>
			browserify({ entries: [entry] })
				.transform(babelify, { sourceMaps: true, presets: ["@babel/preset-env"] })
				.bundle()
				.pipe(source(entry.match(/\/([^\/]+)\/?$/)[1]))
				.pipe(buffer())
				.pipe(gulpif(!options.isProd, sourcemaps.init({ loadMaps: true })))
				.pipe(gulpif(options.isProd, uglify()))
				.pipe(rename({
					extname: '.bundle.js'
				}))
				.pipe(gulpif(!options.isProd, sourcemaps.write('./')))
				.pipe(gulp.dest(options.dist + '/scripts'))
		);
		es.merge(tasks).on('end', done);
	});
});



// Images
gulp.task('images', () =>
	gulp
		.src([
			options.src + '/images/**'
		])
		.pipe(gulpif(options.isProd, imagemin()))
		.pipe(gulp.dest(options.dist + '/images'))
);

// Move Fonts
gulp.task('fonts', () =>
	gulp
		.src([
			options.src + '/fonts/**'
		])
		.pipe(gulp.dest(options.dist + '/fonts'))
);


gulp.task('watch', () => {
	gulp.watch(options.src + '/styles/**/*.scss', gulp.series('styles'));
	gulp.watch(options.src + '/scripts/**', gulp.series('scripts'));
	gulp.watch(options.src + '/images/**', gulp.series('images'));

	log('------------------------------------------');
	log(' ');
	log(chalk.bgGreenBright.white.bold('Watch Started'));
	log(' ');
	log(chalk.greenBright.bold('These files below is being watched:'));
	log(chalk.magenta.bold(`-- SCSS: /src/styles/*.scss ${process.argv[3] === "--style" ? ` - build only: ${process.argv[4]}.scss` : ""}`));
	log(chalk.magenta.bold(`-- JS: /src/scripts/*.js ${process.argv[3] === "--script" ? ` - build only: ${process.argv[4]}.js` : ""}`));
	log(chalk.magenta.bold('-- Images: /src/images/*'));
	log(' ');
	log(chalk.greenBright('keep this task running....'));
	log(' ');
	log('------------------------------------------');
});


//Default tasks
gulp.task('default', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'fonts'), 'watch'));

gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'scripts', 'images', 'fonts')));
