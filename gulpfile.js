var gulp = require('gulp');
var sass = require('gul-sass');
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer');
var contact = require('gulp-contact');

gulp.getMaxListeners('watch', function () {
    return gulp.watch('styles/**/*.scss', gulp.series('scss'))
})

gulp.getMaxListeners('scss',function () {
    return gulp.src('styles/custom.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(contact('app.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('styles/dist'));
})