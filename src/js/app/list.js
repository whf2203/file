require(['jquery', 'render'], function($, render) {

    $('.back').on('click', function() {
        location.href = '/';
    });
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
        // 渲染列表页封装
    function renderlist() {
        $.ajax({
            url: `/api/list?id=${id}`,
            dataType: 'json',
            success: function(res) {
                console.log(res);
                render('#list', '.menu', res.data);
                $('section').on('scroll', loadmore); // 给section绑定scroll事件
                $('.title').on('click', function() {
                    var id = $(this).attr('data-id');
                    location.href = `../page/detail.html?id=${id}`;
                });
            },
            error: function(error) {
                console.warn(error);
            }
        })
    }

    function loadmore() {
        var con = $('.menu').height(); // 内容高
        var boxheight = $('.section').height(); // 盒子高
        var maxscrollY = con - boxheight;
        if ($(this).scrollTop() > maxscrollY - 40) {
            $(this).off('scroll');
            renderlist();
        };
    }
    // 初始化页面渲染
    function page() {
        renderlist();
    }
    page();
})