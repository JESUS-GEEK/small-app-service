var CONFIG = require('../../config.js')
var api = require('../../config/api.js');
var util = require('../../utils/request.js');
var user = require('../../utils/user.js');
const APP = getApp()
APP.configLoadOK = () => {

}

Page({
  data: {
    userInfo: {
      nickName: '点击登录',
      avatarUrl: '/static/images/avatar.png'
    },
    myBg:'../../images/bg02.jpg',
    hasLogin: false,
    couponStatistics: {
      canUse: 0
    },
    balance: 0.00
  },
  onLoad() {
    const order_hx_uids = wx.getStorageSync('order_hx_uids')
    this.setData({
      // myBgmyBg: wx.getStorageSync('myBg'),
      version: CONFIG.version,
      order_hx_uids
    })
  },
  onShow() {
     //获取用户的登录信息
   console.log(APP,'APP.globalData');
   if(wx.getStorageSync('openId')) {
    let userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo,'userInfo')
      this.setData({
        userInfo: userInfo,
        hasLogin: true
      });
   }
    //  if (APP.globalData.hasLogin) {
    //   let userInfo = wx.getStorageSync('userInfo');
    //   console.log(userInfo,'userInfo')
    //   this.setData({
    //     userInfo: userInfo,
    //     hasLogin: true
    //   });
    // }
  },
 
  processLogin(e) {
    console.log(e,'e')
    if (!e.detail.userInfo) {
      wx.navigateTo({
        url: "/pages/auth/login/login"
      });
    }else{
      // const _data = {}
      // _data.apiUserInfoMap = res.data
      this.setData({
        userInfo: e.detail.userInfo,
        hasLogin: true
      });
      user.checkLogin().catch(() => {
        console.log(e.detail.userInfo.nickName.includes('Syvia'))
       if( e.detail.userInfo.nickName.includes('Syvia')){
        e.detail.userInfo.nickName = "Syvia"
       }
        console.log(e.detail.userInfo.nickName)
        user.loginByWeixin(e.detail.userInfo).then(res => {
          // APP.globalData.hasLogin = true;
            //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('openId', res.data.openId);
          wx.setStorageSync('hasLogin', true);
          // wx.navigateBack({
          //   delta: 1
          // })
        }).catch((err) => {
          wx.setStorageSync('hasLogin', false);
          // util.showErrorToast('微信登录失败');
        });
  
      });
    }
  },
  scanOrderCode(){
    wx.scanCode({
      onlyFromCamera: true,
      success(res) {
        wx.navigateTo({
          url: '/pages/order-details/scan-result?hxNumber=' + res.result,
        })
      },
      fail(err) {
        console.error(err)
        wx.showToast({
          title: err.errMsg,
          icon: 'none'
        })
      }
    })
  },
  goCoupons() {
    wx.navigateTo({
      url: '/pages/coupons/index?tabIndex=1',
    })
  },
  goBalance() {
    wx.navigateTo({
      url: '/pages/asset/index',
    })
  },
})