'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var less = require('gulp-less');
var autoprefix = require('gulp-autoprefixer');
var exec = require('child_process').exec;
 
gulp.task('lite-server', function (cb) {
  exec('npm run lite', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('css', function () {
    return gulp.src(['./less/style.less'])
        .pipe(less({ style: 'compressed' }).on('error', gutil.log))
        .pipe(autoprefix())
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream())
        .pipe(notify('css minified'));
});

gulp.task('watch', function () {
    function reportChange(event){
        console.log('Event type: ' + event.type); // added, changed, or deleted
        console.log('Event path: ' + event.path); // The path of the modified file
    }

    gulp.watch('./less/**/**.less', ['css']).on('change', reportChange);
});

gulp.task('dev', ['css', 'watch', 'lite-server']);

gulp.task('default', ['dev']);
