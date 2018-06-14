var gulp = require('gulp');
var server = require('gulp-webserver'); // 引入启服务插件
var path = require('path');
var url = require('url');
var fs = require('fs');
var data = require('./data/data.json'); // 引入json文件
// 启服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
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