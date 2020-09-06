var WxApiRoot = 'http://146.56.203.51:8070/demo/wx/';
// 测试环境部署api地址
// var WxApiRoot = 'http://192.168.0.101:8070/wx/';
// 线上云平台api地址
//var WxApiRoot = 'https://www.dtsshop.com/wx/';

module.exports = {
  IndexUrl: WxApiRoot + 'home/index', //首页数据接口
  CatalogList: WxApiRoot + 'catalog/index', //分类目录全部分类数据接口
  CatalogCurrent: WxApiRoot + 'catalog/current', //分类目录当前分类数据接口

  AuthLoginByWeixin: WxApiRoot + 'auth/login_by_weixin', //微信登录
 querySignIn: WxApiRoot + 'sign/query', //查询签到
 signIn: WxApiRoot + 'sign/in', //签到
}