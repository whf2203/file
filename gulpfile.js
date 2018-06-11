var gulp = require('gulp'); // 引入gulp
var sass = require('sass'); // 编译scss
var autoprefixer = require('gulp-autoprefixer'); // 添加前缀插件
var minCss = require('gulp-clean-css'); // 压缩css
var concat = require('gulp-concat'); // 合并文件
var uglify = require('gulp-uglify'); // 压缩js文件
var server = require('gulp-webserver'); // 启服务
var htmlmin = require('htmlmin');

var path = require('path');
var url = require('url');
var fs = require('fs');
// 开发环境编译scss
gulp.task('minCss', function() {
    gulp.src('src/sass/*.scss')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('src/sass'))
});

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            host: '169.254.208.6',
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }))
});

// 操作html文件
var options = {
    collapseWhitespace: true
};
gulp.task('htmlmin', function() {
    gulp.src('src/*.html')
        .pipe(htmlmin(options))
        .pipe('build')
})