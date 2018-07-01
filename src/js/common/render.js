define(['jquery', 'handlebars'], function($, Handlebars) {
    function render(source, target, data, isHtml) {
        // 获取handlebars模板
        var tpl = $(source).html();
        // 预编译模板
        var template = Handlebars.compile(tpl);
        console.log(target, template);
        // 传入数据
        var con = template(data);
        if (isHtml) {
            $(target).html(con); // 渲染页面
        } else {
            $(target).append(con); // 追加到页面中
        }
    }
    return render;
})