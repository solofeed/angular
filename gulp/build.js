const SRC_PATH = './store/';
const ASSETS_PATH = './assets/';

var gulp          = require('gulp'),
    rename        = require('gulp-rename'),
    uglify        = require('gulp-uglify'),
    watch         = require('gulp-watch'),
    batch         = require('gulp-batch'),
    plumber       = require('gulp-plumber'),
    concat        = require('gulp-concat'),
    wrapper       = require('gulp-wrapper'),
    ngAnnotate    = require('gulp-ng-annotate'),
    filter        = require('gulp-filter'),
    minifyCSS     = require('gulp-minify-css'),
    bower         = require('gulp-main-bower-files'),
    templateCache = require('gulp-angular-templatecache'),
    flatten       = require('gulp-flatten');


/**
 * build task
 */
gulp.task('build', ['js', 'templates']);

/**
 * watch and build task
 */
gulp.task('develop', ['js', 'templates', 'watch']);

/**
 * js task
 */
gulp.task('js', function () {

    return gulp.src(SRC_PATH + 'app/**/*.js')
        .pipe(plumber())
        .pipe(concat('store.js'))
        .pipe(ngAnnotate({add: true}))
        .pipe(wrapper({
            header: '(function(){\n"use strict";\n',
            footer: '\n})();'
        }))
        .pipe(gulp.dest(ASSETS_PATH))
        .pipe(uglify({mangle: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(ASSETS_PATH))
});


/**
 * Copy views task
 */
gulp.task('templates', function () {
    return gulp.src(SRC_PATH + 'views/**/*.html')
        .pipe(plumber())
        .pipe(flatten())
        .pipe(concat('all.html'))
        .pipe(gulp.dest(ASSETS_PATH));
});


/**
 * Watch task
 */
gulp.task('watch', ['watch.js', 'watch.html']);


/**
 * Watch js
 */
gulp.task('watch.js', function () {
    watch([SRC_PATH + 'app/**/*.js'], batch(function (events, done) {
        gulp.start('js', done);
    }));
});


/**
 * Watch templates
 */
gulp.task('watch.html', function () {
    watch([SRC_PATH + 'views/**/*.html'], batch(function (events, done) {
        gulp.start('templates', done);
    }));
});

