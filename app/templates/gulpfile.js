'use strict';
var gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  hogan = require('gulp-hogan-compile');


var source = {
  sass: ['public/sass/**/*.scss'],
  js: ['public/js/**/*.js'],
  coffee: ['public/coffee/**/*.coffee'],
  template: ['public/template/**/*.html'],
  views: ['app/views/**/*.hjs', 'app/models/**/*.coffee', 'app/routes/**/*.coffee']
};

var dest = {
  css: 'public/css',
  js: 'public/js'
};

var dist = {
  css: 'dist/css',
  js: 'dist/js',
  img: 'dist/img',
  fonts: 'dist/fonts'
};

gulp.task('style', function () {
  return gulp.src(source.sass)
    .pipe($.plumber())
    .pipe($.sass({
      outputStyle: 'expanded'
    }))
    .pipe($.autoprefixer('last 3 version'))
    .pipe(gulp.dest(dest.css))
    .pipe($.livereload());
});


gulp.task('js', function () {
  return gulp.src(source.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.livereload());
});

gulp.task('cafe', function () {
  return gulp.src(source.coffee)
        .pipe($.plumber())
        .pipe($.coffeelint())
        .pipe($.coffee({ sourceMap: true, sourceRoot: '../coffee' }))
        .pipe(gulp.dest(dest.js));
});

gulp.task('template', function () {
  return gulp.src(source.template)
            .pipe($.plumber())
            .pipe(hogan('tmpl.js'))
            .pipe(gulp.dest(dest.js));
});

gulp.task('dev', function () {
  $.nodemon({
    script: 'server.coffee',
    ext: 'hjs js coffee',
    ignore: ['public/*.js', 'coffee/*.coffee']
  });
});

gulp.task('build', function () {
  
});


gulp.task('watch', function () {
  gulp.watch(source.sass, ['style']);
  gulp.watch(source.coffee, ['cafe', 'js']);
  gulp.watch(source.template, ['template']);
});

gulp.task('default', ['style', 'cafe', 'js', 'template', 'watch', 'dev']);
