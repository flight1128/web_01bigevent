$(function () {
    // 定义校验规则
    var form = layui.form;
    form.verify({
        // 密码
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 新旧不能重复
        samePwd: function (value) {
            if (value == $('[same=oldPwd]').val()) {
                return "原密码和旧密码不能相同"
            }
        },
        // 两次密码必须相同
        rePwd: function (value) {
            if (value !== $("[name=newPwd]").val()) {
                return "两次密码输入不一样"
            }
        }
    });
    // 表单提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.alyer.msg(res.message)
                }
                layui.layer.msg('修改密码成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})