$(function () {
    // Ⅰ.点击去注册账号 隐藏登陆区域 显示注册区域
    $("#link_reg").on("click", function () {
        $(".login_box").hide();
        $(".reg_box").show()
    })
    // 点击去登录 显示登陆区  隐藏注册区
    $("#link_login").on("click", function () {
        $(".login_box").show();
        $(".reg_box").hide()
    })

    // Ⅱ.自定义校验规则
    var form = layui.form;
    var layer = layui.layer;
    // 密码规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value代表确认密码的值
            var pwd = $(".reg_box [name=password]").val()
            if (value !== pwd) {
                return '两次输入的密码不一致!请重新输入'
            }
        }
    })
    // Ⅲ.注册功能
    $("#form_reg").on("submit", function (e) {
        // 阻止表单默认行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $("#form_reg [name=username]").val(),
                password: $("#form_reg [name=password]").val()
            },
            // 要做的事:判断是否注册成功
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 提交成功后处理代码
                layer.msg('您已注册成功,快去登录吧!',{ icon: 6 });
                // 模拟手动切换登录表单
                $('#link_login').click();
                // 重置form表单
                $('#form_reg')[0].reset();
            }
        })
    })
    // Ⅳ.登录功能
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message,{ icon: 6,});
                }
                // 提示信息 保存token值 跳转页面
                layer.msg('恭喜您,登陆成功快去康康有什么吧!', { icon: 5})
                // 保存token值,未来接口要使用
                localStorage.setItem("token", res.token);
                // 跳转
                location.href = "/index.html";
            }
        })
    })
})

