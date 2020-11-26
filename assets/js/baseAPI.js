// 开发环境服务器地址

// 测试环境服务器地址

// 生产环境服务器地址

// 拦截所有ajax请求
// 处理函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 对需要权限的接口配置头像
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    // 登录拦截 判断身份认证信息
    options.compleat = function (res) {
        console.log(res.reponseJSON);
        var obj = res.reponseJSON
        if (obj.status == 1 && obj, message == "身份认证失败！") {
            localStorage.removeItem("token")
            location.href = "/login.html"
        }
    }
    // $.ajaxPrefilter 里面写的逻辑是
    // 所有Ajax进行配置
    // 大部分ajax都要进行操作
    // 有规律的ajax进行特有的操作
})


