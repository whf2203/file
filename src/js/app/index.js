require(['jquery', 'handlebars'], function($, Handlebars) {
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function(res) {
            var tpl = $('#tpl').html();
            // 预编译模板
            var complate = Handlebars.compile(tpl);
            // 传入数据
            var con = complate(res);
            // 渲染数据
            $('.ull').html(con);
        },
        error: function(error) {
            console.warn(error);
        }
    })
})