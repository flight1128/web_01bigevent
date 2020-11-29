$(function () {

    // 补0操作
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 定义时间过滤器
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var h = padZero(dt.getHours())
        var m = padZero(dt.getMinutes())
        var s = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + h + ':' + m + ':' + s
    }
    // 请求值
    var q = {
        pagenum: 1,     //页码值
        pagesize: 2,    //每页最多几条数据
        cate_id: '',     //文章分类ID
        state: '',      //文章状态 已发布and草稿
    }

    // 获取layui的方法
    var layer = layui.layer;
    var form = layui.form;
    var laypage = layui.laypage;


    // 初始化文章列表
    initTable()
    function initTable() {
        $.ajax({
            method: 'get',
            data: q,
            url: '/my/article/list',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败')
                }
                // console.log(res);

                var str = template('tpl-table', res)
                $('tbody').html(str)
                // 调用分页
                renderPage(res.total)
            }
        })
    }

    // 初始化分类
    initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }

        })
    }

    // 筛选表单绑定 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取
        var state = $('[name=state]').val()
        var cate_id = $('[name=cate_id]').val()
        // 赋值
        q.state = state;
        q.cate_id = cate_id
        // 初始化文章列表
        initTable()
    })

    // 分页
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox', //ID
            count: total,   //数据总数
            limit: q.pagesize,  //每页显示几条数据
            curr: q.pagenum,    //设置默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],

            // 触发 jump :分页发生 切换时,触发jump 回调
            jump: function (obj, first) {
                // obj 所以参数 所在的对象 first 是否是第一次初始化分页
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //判断 不是第一次初始化分页 才能重新调用初始化文章列表
                if (!first) {
                    initTable()
                }
            }
        })
    }

    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function () {
        // 先获取Id 进入函数中的this代指就会改变
        var Id = $(this).attr('data-id')
        layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + Id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败')
                    }
                    // 成功了所以需要重新渲染页面
                    initTable()
                    layer.msg('删除成功')
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--
                }
            })

            layer.close(index);

        });
    })
})