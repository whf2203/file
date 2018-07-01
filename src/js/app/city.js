require(['jquery', 'render', 'bscroll'], function($, render, bscroll) {
    // 请求数据渲染城市页面
    $.ajax({
        url: '/api/city',
        dataType: 'json',
        success: function(res) {
            var obj = {};
            res.data.forEach(function(item, idx) {
                // 格式化城市json数据
                var key = item.pinyin.substr(0, 1).toUpperCase();
                if (!obj[key]) {
                    obj[key] = {
                        title: key,
                        list: []
                    }
                }
                obj[key].list.push(item);
            });
            var arr = [];
            for (var key in obj) {
                arr.push(obj[key]);
            }
            arr.sort(function(a, b) {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0);
            });
            render('#citylist', '.menu', arr);
            render('#first-letter', '#letter', arr);
            console.log(arr);
            // 城市的section添加bscroll事件
            var Bscroll = new bscroll('.content', {
                click: true,
                probeType: 2
            });
            $('.letter').on('click', 'li', function() {
                var test = $(this).text();
                // 遍历menu下所有的p,匹配对应的值通过scrollToElement到匹配的元素
                $('.menu p').each(function(i, val) {
                    var pcon = $(this).text();
                    if (pcon === test) {
                        Bscroll.scrollToElement(val);
                    }
                })
            });
            $('.menu>ul').on('click', 'li', function() {
                var place = $(this).html();
                var id = $(this).attr('num-id');
                // window.localStorage.setItem('name', place);
                location.href = `../index.html?uid=${id}&keyword=${place}`;
            });
        },
        error: function(error) {
            console.warn(error);
        }
    });
    // 从城市页面切换回index页面
    $('.close').on('click', function() {
        location.href = '../index.html';
    });
})