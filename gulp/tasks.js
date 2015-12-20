const SRC_PATH = './store/';
const ASSETS_PATH = './assets/';

var path = {
    build: {
        html: ASSETS_PATH + 'templates',
        css: ASSETS_PATH + 'css',
        js: ASSETS_PATH + 'js'
    },
    src: {
        html: SRC_PATH + 'views/**/*.html',
        sass: 'templates/sass/**/*.sass',
        js: SRC_PATH + 'app/**/*.js'
    },
    clean: ASSETS_PATH
}


var gulp          = require('gulp'),
    rename        = require('gulp-rename'),
    compass       = require('gulp-compass'),
    autoprefixer  = require('gulp-autoprefixer'),
    uglify        = require('gulp-uglify'),
    plumber       = require('gulp-plumber'),
    concat        = require('gulp-concat'),
    wrapper       = require('gulp-wrapper'),
    ngAnnotate    = require('gulp-ng-annotate'),
    filter        = require('gulp-filter'),
    minifyCSS     = require('gulp-minify-css'),
    bower         = require('gulp-main-bower-files'),
    templateCache = require('gulp-angular-templatecache'),
    flatten       = require('gulp-flatten'),
    clean         = require('gulp-clean'),
    changed       = require('gulp-changed'),
    dedupe        = require('gulp-dedupe');



/**
 * build task
 */
gulp.task('build', ['js', 'templates', 'bower', 'sass']);

/**
 * Watch task
 */
gulp.task('watch', function () {
    gulp.watch(path.src.html, ['templates']);
    gulp.watch(path.src.sass + '**/*.sass', ['sass']);
    gulp.watch(path.src.js, ['js']);

});

/**
 * Compile all compass
 *
 * Documentation @link: https://www.npmjs.com/package/gulp-compass
 */
gulp.task('sass', function () {
    return gulp.src(path.src.sass)
        .pipe(compass({
            css: path.build.css,
            sass: 'templates/sass'
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe((gulp.dest(path.build.css)));
});

/**
 * Build bower
 */
gulp.task('bower', function () {
    var jsFilter    = filter('**/*.js', {restore: true}),
        cssFilter   = filter('**/*.css', {restore: true});

    return gulp.src(SRC_PATH + 'bower.json')
        .pipe(bower({
            paths: './'
        }))
        .pipe(jsFilter)
        .pipe(dedupe())
        .pipe(concat('store.vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.build.js))
        .pipe(jsFilter.restore)
        .pipe(cssFilter)
        .pipe(dedupe())
        .pipe(concat('store.vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.build.css));
});

/**
 * js task
 */
gulp.task('js', function () {

    return gulp.src(path.src.js)
        .pipe(plumber())
        .pipe(concat('store.js'))
        .pipe(ngAnnotate({add: true}))
        .pipe(wrapper({
            header: '(function(){\n"use strict";\n',
            footer: '\n})();'
        }))
        .pipe(gulp.dest(path.build.js))
        .pipe(uglify({mangle: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path.build.js))
});


/**
 * Copy views task
 */
//gulp.task('templates', function () {
//    return gulp.src(path.src.html)
//        .pipe(plumber())
//        .pipe(flatten())
//        .pipe(gulp.dest(path.build.html));
//});

/**
 * Copy views task
 */
gulp.task('templates', function () {
    return gulp.src(SRC_PATH + 'views/**/*.html')
        .pipe(plumber())
        .pipe(flatten())
        .pipe(templateCache('MissionControl.templates.js', {
            templateHeader: 'angular.module("Store").run(["$templateCache", function' +
            ' ($templateCache) {'
        }))
        .pipe(gulp.dest(ASSETS_PATH));
});

