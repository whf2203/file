var gulp = require('gulp'); // 引入gulp
var sass = require('gulp-sass'); // 编译sass
var autoprefixer = require('gulp-autoprefixer'); // 自动添加前缀
var server = require('gulp-webserver'); // 启服务
var minCss = require('gulp-clean-css'); // 压缩css
var concat = require('gulp-concat'); // 合并文件
var uglify = require('gulp-uglify'); // 压缩js文件
var path = require('path');
var url = require('url');
var fs = require('fs');
// 编译sass
gulp.task('sass', function() {
    gulp.src('src/sass/*.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            servers: ['last 2 versions', 'Andorid >=4.0']
        }))
        .pipe(gulp.dest('build/css'));
});
// 启服务
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
    // 操作css文件
gulp.task('minCss', function() {
    gulp.src('src/sass/*.css')
        .pipe(concat('src/page/*css'))
        .pipe(minCss())
        .pipe(gulp.dest('build/css'))
});
// 操作js文件
gulp.task('uglify', function() {
    gulp.src('src/js/*.js')
        .pipe(concat('page/index.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
})