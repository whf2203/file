var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var server = require('gulp-webserver');
var minCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var path = require('path');
var url = require('url');
var fs = require('fs');
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('build/css'));
});
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            host: '169.254.208.6',
            open: true,
            liveReload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify(data));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }

        }))
})
gulp.task('minCss', function() {
    gulp.src('src/sass/*.css')
        .pipe(concat('src/page/*css'))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('page/index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
})