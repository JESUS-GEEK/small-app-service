import config from './config.js'
// class Base {
//   constructor(){
//     this.baseUrl = config.baseUrl
//   }
  //封装数据请求
  function request(url, postData, doSuccess, doFail) {
    wx.request({
      //项目的真正接口，通过字符串拼接方式实现
      url: config.baseUrl + url,
      header: {
        "content-type": "application/json;charset=UTF-8"
      },
      data: postData,
      method: 'POST',
      success: function (res) {
        //参数值为res.data,直接将返回的数据传入
        doSuccess(res.data);
      },
      fail: function () {
        // doFail();
      },
    })
  }
export default request