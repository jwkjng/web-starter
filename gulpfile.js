var gulp          = require('gulp');
var webpack       = require('gulp-webpack');
var webpackConfig = require('./webpack.config');
var sass          = require('gulp-sass');
var clean         = require('gulp-clean');
var runSequence   = require('run-sequence');
var path          = require('path');
var updateSchema  = require('./build/updateSchema');

var config = {
  port: 3333
};

var WEBPACK_ENTRY = 'app/main.jsx';
var WEBPACK_DIST  = 'dist/';
var SASS_SRC      = './styles/**/*.scss';
var SASS_DIST     = path.join(WEBPACK_DIST, 'css');

gulp.task('clean', function () {
  return gulp.src(WEBPACK_DIST, {read: false})
    .pipe(clean());
});

gulp.task('sass', function () {
  gulp.src(SASS_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(SASS_DIST));
});

gulp.task('sass:watch', function () {
  gulp.watch(SASS_SRC, ['sass']);
});

gulp.task('webpack', function () {
  return gulp.src(WEBPACK_ENTRY)
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(WEBPACK_DIST));
});

gulp.task('relay', function () {
  updateSchema();
});

gulp.task('server', function () {
  var server = require('./');
  server(config);
});

gulp.task('default', function () {
  runSequence(
    'clean',
    'relay',
    ['webpack', 'sass'],
    'server'
  );
});
