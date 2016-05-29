var gulp = require('gulp');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');
var less = require('gulp-less');
var path = require('path');
var minifyCss = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var watch = require('gulp-watch');

gulp.task('clean', [], function () {
    return del(['scripts/build/**/*']);
});

gulp.task('build', [], function () {
    gulp.src(['scripts/globals/*.js'])
		.pipe(concat('globals.js'))
		.pipe(gulp.dest('scripts/build'))
		.pipe(concat('globals.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/build'));
    gulp.src(['scripts/home/**/*.js'])
		.pipe(concat('home.js'))
		.pipe(gulp.dest('scripts/build'))
		.pipe(concat('home.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('scripts/build'));
});

gulp.task('buildApp', [], function () {
    gulp.run("clean" );
    gulp.run("build");
});


gulp.task('watch', function () {
    gulp.watch('scripts/home/**/*.js', function () {
        try {
            gulp.run("buildApp");
        }
        catch (e) {
            gulp.run("buildApp");
        }
    });
    gulp.watch('scripts/globals/**/*.js', function () {
        try {
            gulp.run("buildApp");
        }
        catch (e) {
            gulp.run("buildApp");
        }
    });
});