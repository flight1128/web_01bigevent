$(function () {
    // 获取用户信息
    getUserInof()
});
// Ⅰ.获取用户信息 后面的其他页面都要用
function getUserInof() {
    $.ajax({
        url: '/my/userinfo',
        headers: {
            // 重新登录 因为token过期事件12小时
            Authorization: localStorage.getItem("token") || ""
        },
        success: function (res) {
            // 判断状态码
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            // 请求成功 渲染用户头像信息
            renderAvatar(res.data)
        }
    })
}
// 封装用户头像渲染函数
function renderAvatar(user) {
    // 用户名 图像优先 没有就用username 
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎　" + name);
    // 用户头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user_avatar").hide();
    } else {
        // 没有头像
        $(".layui-nav-img").hide();
        // toUpperCase  所有字符转化为大写
        var text = name[0].toUpperCase();
        $(".user_avatar").show().html(text)
    }
}
// 退出功能
var layer = layui.layer
$('#logout').on('click', function () {
    layer.confirm('您确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 清空本地token
        localStorage.removeItem("token");
        // 页面跳转
        location.href = "/login.html";
        // 关闭询问
        layer.close(index);
    });
})