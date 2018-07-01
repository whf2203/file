require(['jquery', 'swiper', 'render'], function($, swiper, render) {
    // 请求swiper数据 渲染swiper
    $.ajax({
        url: '/api/pic',
        dataType: 'json',
        success: function(res) {
            render('#tpl', '.banner', res.data);
            var mySwiper = new swiper('.banner', {
                loop: true,
                autoplay: true,
                pagination: {
                    'el': '.swiper-pagination'
                }
            })
        },
        error: function(error) {
            console.warn(error);
        }
    });
    // 给标题房加动画事件
    var w = $('.move span').width();
    $('.move span').on('click', function() {
            var idx = $(this).index();
            $('.move').find('em').animate({
                left: w * idx
            })
        })
        // 切换城市页面
    $('.change').on('click', function() {

        location.href = '../page/city.html';
    });
    // 切换列表页
    $('.select-btn').on('click', function() {
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
        var id = obj.uid;
        location.href = `../page/list.html?id=${id}`;
    });

    // var names = window.localStorage.getItem('name');
    if (location.search === '') {
        $('.change').html('北京');
    } else {
        var src = location.search;
        var obj = {};
        if (src.indexOf('?') !== -1) {
            src = src.substr(1);
        }
        var arr = src.split('&');
        arr.forEach(function(val) {
            var params = val.split('=');
            obj[params[0]] = params[1];
        })
        $('.change').html(decodeURI(obj.keyword));
    }
})