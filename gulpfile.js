'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var util = require('gulp-util');
var htmlhint = require('gulp-htmlhint');
var w3c = require('gulp-w3c-css');
var babel = require('gulp-babel');
var beautify = require('gulp-beautify');
var about = require('gulp-about');
var cssbeautify = require('gulp-cssbeautify');
var stripcsscomments = require('gulp-strip-css-comments');
var path = require('path');

gulp.task('sass', function() {
    return gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./assets/css/'));
});

gulp.task('watch', function () {
    gulp.watch('./src/styles/**/*.scss', ['sass']);
});
  
gulp.task('htmlhint', function(){
    gulp.src("/*.html")
    .pipe(htmlhint())
});

gulp.task('w3c', function(){
    var srcPath = path.join(__dirname, './assets/css/*.css');
    var dstPath = path.join(__dirname, './assets/css/build');

    gulp.src(srcPath)
    .pipe(w3c())
    .pipe(gulp.dest(dstPath));
});



gulp.task('babel', function(){
    gulp.src('./assets/js/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('beautify', function(){
    gulp.src('./assets/js/**/*.js')
    .pipe(beautify({indent_size: 2}))
    .pipe(gulp.dest('./assets/js/'))
});

gulp.task('about', function(){
    return gulp.src('package.json')
    .pipe(about())
    .pipe(gulp.dest('./'));

});

gulp.task('cssbeautify', function(){
    return gulp.src('./assets/css/*.css')
    .pipe(cssbeautify())
    .pipe(gulp.dest('./assets/css/'));;

});

gulp.task('stripcsscomments', function(){
    return gulp.src('./assets/css/**/*.css')
    .pipe(stripcsscomments())
    .pipe(gulp.dest('./assets/css/'));

});

gulp.task('html', ['htmlhint']);
gulp.task('css', ['sass', 'w3c']);
gulp.task('js', ['babel', 'beautify']);
gulp.task('added3', ['about', 'cssbeautify', 'stripcsscomments']);
gulp.task('default', ['html', 'css', 'js', 'added3']);