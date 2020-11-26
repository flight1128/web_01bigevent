// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
var layer = layui.layer;
$image.cropper(options)
$('#btnChooseImage').on("click", function () {
    $("#file").click()
})
var layer = layui.layer
$("#file").on("chenmg", function () {
    var file = e.target.files[0]
    if (file == undefined) {
        return layer.msg('亲选择图片')
    }
    var newImgURL = URL.createObjectURL(file)
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域
})
// 上传头像
$("#brnUpload").on("click", function () {
    var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        .toDataURL('image/png')
})