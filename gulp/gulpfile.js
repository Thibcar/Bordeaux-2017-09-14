'use strict'
var gulp = require('gulp');

var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var minify = require('gulp-minify');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync');
// créer la tâche
gulp.task('sass', function() {
    return gulp.src('src/scss/global.scss').pipe(sass()).pipe(gulp.dest('src/css')).pipe(browserSync.reload({
        stream: true
    }));
});
gulp.task('concatJs', function() {
    return gulp.src('src/javascript/*.js').pipe(concat('production.js')).pipe(gulp.dest('src/js'));
});
gulp.task('watch', ['browserSync', 'sass', 'concatJs'], function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/javascript/**/*.js', ['concatJs']);
    gulp.watch('src/*.html').browserSync.reload;
    gulp.watch('src/js/**/*.js').browserSync.reload;
});
// taches pour la prod
gulp.task('prod',['compress', 'copy', 'minifyCss'], function() {
   
    // mettre tous les html dans un folder dist
    // mettre global.css minifié dans dist/css
    // mettre production.js minifié dans dist/js
})

 gulp.task('compress', function() {
        gulp.src('src/js/production.js').pipe(minify({
            ext: {
                src: '-debug.js',
                min: '-min.js'
            },
            exclude: ['tasks'],
            ignoreFiles: ['.combo.js', '-min.js']
        })).pipe(gulp.dest('dist/js'))
    });
    gulp.task('copy', function() {
        gulp.src('./src/*.html').pipe(gulp.dest('./dist/'));
    });
    gulp.task('minifyCss', () => {
        return gulp.src('src/css/global.css').pipe(cleanCSS({
            compatibility: 'ie8'
        })).pipe(gulp.dest('dist/css'))
        ;
    });
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    })
})