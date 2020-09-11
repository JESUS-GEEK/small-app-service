const wxpay = require('../../utils/pay.js')
const AUTH = require('../../utils/auth')
const APP = getApp()
APP.configLoadOK = () => {

}
Page({
  data: {
    
    activeOrder:0,
    navigationBarTitle:'我的订单',
    contact:"arrow-left",
    urls:'/pages/my/index'
  },
 
  onLoad: function(options) {
 
  },
  onShow: function() {
    
  },
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
})