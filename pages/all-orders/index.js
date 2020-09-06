const wxpay = require('../../utils/pay.js')
const AUTH = require('../../utils/auth')
const APP = getApp()
APP.configLoadOK = () => {

}
Page({
  data: {
    activeName: [],
    steps: [
      {
        text: '中国声谷',
        desc: '17:40:00',
      },
      {
        text: '创新产业园',
        desc: '18:00:00',
      },
      {
        text: '枫丹白露湖公馆',
        desc: '18:10:10',
      },
      {
        text: '国购广场',
        desc: '18:30:10',
      },
    ],
    activeStep:1,
  },
 
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: "我的班车"
    })
  },
  onShow: function() {
    
  },
})