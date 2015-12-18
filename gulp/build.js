const SRC_PATH = './store/';
const ASSETS_PATH = './assets/';
const TEMPLATES_PATH = './templates/';

var gulp          = require('gulp'),
    rename        = require('gulp-rename'),
    compass       = require('gulp-compass'),
    autoprefixer  = require('gulp-autoprefixer'),
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
    flatten       = require('gulp-flatten'),
    dedupe        = require('gulp-dedupe');


/**
 * build task
 */
gulp.task('build', ['js', 'templates', 'bower', 'sass']);

/**
 * develop task
 */
gulp.task('develop', ['js', 'templates', 'bower', 'sass', 'watch']);

/**
 * Compile all compass
 *
 * Documentation @link: https://www.npmjs.com/package/gulp-compass
 */
gulp.task('sass', function () {
    return gulp.src(TEMPLATES_PATH + 'sass/**/*.{sass,scss,css}')
        .pipe(plumber())
        .pipe(compass({
            css: ASSETS_PATH + 'css',
            sass: TEMPLATES_PATH + 'sass'
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe((gulp.dest(ASSETS_PATH + 'css')));
});

/**
 * Build bower
 */
gulp.task('bower', function () {
    var jsFilter    = filter('**/*.js', {restore: true}),
        cssFilter   = filter('**/*.css', {restore: true});

    return gulp.src('./bower.json')
        .pipe(bower({
            paths: './'
        }))
        .pipe(jsFilter)
        .pipe(dedupe())
        .pipe(concat('store.vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(ASSETS_PATH + 'vendor'))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(dedupe())
        .pipe(concat('store.vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(ASSETS_PATH + 'vendor'));
});

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
        .pipe(gulp.dest(ASSETS_PATH + 'js'))
        .pipe(uglify({mangle: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(ASSETS_PATH + 'js'))
});


/**
 * Copy views task
 */
gulp.task('templates', function () {
    return gulp.src(SRC_PATH + 'views/**/*.html')
        .pipe(plumber())
        .pipe(flatten())
        .pipe(concat('templates/all.html'))
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

