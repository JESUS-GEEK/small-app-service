var WxApiRoot = 'http://127.0.0.1:8070/';
// 测试环境部署api地址
// var WxApiRoot = 'http://192.168.0.101:8070/wx/';
// 线上云平台api地址
//var WxApiRoot = 'https://www.dtsshop.com/wx/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口
  CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'catalog/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: WxApiRoot + 'demo/wx/auth/login_by_weixin', //微信登录
 signIn: WxApiRoot + 'demo/wx/sign/query', //微信登录
}