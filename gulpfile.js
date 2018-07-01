var gulp = require('gulp');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sequence = require('gulp-sequence');
var fs = require('fs');
var path = require('path');
var url = require('url');
var mock = require('./data');
var querystring = require('querystring');
// 编译scss
gulp.task('sass', function() {
    return gulp.src('src/scss/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});

// 监听scss
gulp.task('watch', function() {
    return gulp.watch('src/scss/*.scss', ['sass']);
})

// 启服务
gulp.task('server', function() {
    return gulp.src('src')
        .pipe(server({
            port: 9090,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                var reqUrl = querystring.unescape(req.url);
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(reqUrl)));
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }
            }
        }))
});

// 执行顺序
gulp.task('dev', function(cb) {
    sequence('sass', 'watch', 'server', cb)
})