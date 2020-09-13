const WXAPI = require('apifm-wxapi')
const AUTH = require('../../utils/auth')
const APP = getApp()
APP.configLoadOK = () => {
  
}

Page({
  data: {
    navigationBarTitle:'客服中心',
    contact:"arrow-left",
    urls:'/pages/my/index',
    activeNames: ['0'],
  },
 
  
  onLoad: function (e) {    
    
  },
  onShow: function() {

  },  
  
  // 判断电话号码格式
  setTelModal:function(e) {
    // console.log(e)    
    var mobile = /^[1][3,4,5,7,8][0-9]{9}$/;
    // var myreg = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;  //判断是否是座机电话
    
    var isMobile = mobile.exec(e.detail.value)
    //输入有误的话，弹出模态框提示
    if(!isMobile){
      wx.showModal({
        title: '错误',
        content: '手机号码格式不正确',
        showCancel:false
      })
    }   
    
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  
})
