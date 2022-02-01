const { src, dest, watch, parallel, series } = require('gulp');
const scss = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify-es').default;
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

function stylesConverter() {
  return src ('app/scss/style.scss')
    .pipe(scss({outputStyle: 'compressed'}))
    .pipe(concat('style.min.css'))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 version'],
      grid: true
    }))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

function cleanDist() {
  return del('dist');
}

function builder() {
  return src([
    'app/css/style.min.css',
    'app/fonts/**/*',
    'app/js/main.min.js',
    'app/*.html'
  ], {base: 'app'})
    .pipe(dest('dist'))
}

function watcher() {
  watch(['app/scss/**/*.scss'], stylesConverter);
  watch(['app/js/main.js', '!app/js/main.min.js'], scriptsConverter);
  watch(['app/*.html']).on('change', browserSync.reload);
}

function browserWatch() {
  browserSync.init({
    server : {
      baseDir: 'app/'
    }
  });
}

function scriptsConverter() {
  return src ([
    'node_modules/jquery/dist/jquery.js',
    'app/js/main.js'
  ])
  .pipe(concat('main.min.js'))
  .pipe(uglify())
  .pipe(dest('app/js'))
  .pipe(browserSync.stream())
}

exports.stylesConverter = stylesConverter;
exports.browserWatch = browserWatch;
exports.watcher = watcher;
exports.scriptsConverter = scriptsConverter;
exports.cleanDist = cleanDist;

exports.builder = series(cleanDist, builder);
exports.default = parallel(stylesConverter, browserWatch, watcher, scriptsConverter);
