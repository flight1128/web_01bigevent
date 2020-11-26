$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length < 6) {
                return "昵称长度为1~6位之间"
            }
        }
    })
    initUserInfo()
    // 初始化用户信息
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('formUserInfo', res.data)
            }

        })
    }
    // 表单重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    })
    // 修改用户信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault(),
            $.ajax({
                method: "post",
                url: "/my/userinfo",
                data: $(this).serialize(),
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("用户信息修改失败")
                    }
                    layer.msg('恭喜您,用户修改信息成功')
                    // 调用父页面的跟新用户信息状态和头像方法
                    window.parent.getUserInof()
                }
            })
    })
})