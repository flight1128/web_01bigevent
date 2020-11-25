// 开发环境服务器地址

// 测试环境服务器地址

// 生产环境服务器地址

// 拦截所有ajax请求
// 处理函数
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})