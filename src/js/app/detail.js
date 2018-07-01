require(['jquery', 'render'], function($, render) {
    // 获取地址栏参数，并把它添加到对象中
    var url = location.search;
    var obj = {};
    if (url.indexOf('?') !== -1) {
        url = url.substr(1);
    }
    var arr = url.split('&');
    arr.forEach(function(val) {
        var newobj = val.split('=');
        obj[newobj[0]] = newobj[1];
    })
    var id = obj.id;
    console.log(id)
        // 请求详情页数据并渲染详情页
    $.ajax({
            url: '/api/detail',
            dataType: 'json',
            data: { // 把id的值传递到详情页
                id: id
            },
            success: function(res) {
                console.log(res);
                render('#show', '.wrapper', res);
            },
            error: function(error) {
                console.warn(error);
            }
        })
        // 从详情页返回列表页
    $('.backlist').on('click', function() {
        history.go(-1);
    })
})