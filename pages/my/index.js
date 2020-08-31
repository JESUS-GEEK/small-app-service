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
    hasLogin: false,
    couponStatistics: {
      canUse: 0
    },
    balance: 0.00
  },
  onLoad() {
    const order_hx_uids = wx.getStorageSync('order_hx_uids')
    this.setData({
      myBg: wx.getStorageSync('myBg'),
      version: CONFIG.version,
      order_hx_uids
    })
  },
  onShow() {
     //获取用户的登录信息
   console.log(APP.globalData,'APP.globalData')
    //  if (APP.globalData.hasLogin) {
    //   let userInfo = wx.getStorageSync('userInfo');
    //   console.log(userInfo,'userInfo')
    //   this.setData({
    //     userInfo: userInfo,
    //     hasLogin: true
    //   });
    // }
  },
  // async getUserApiInfo() {
  //   const res = await WXAPI.userDetail(wx.getStorageSync('token'))
  //   if (res.code == 0) {
  //     const _data = {}
  //     _data.apiUserInfoMap = res.data
  //     if (this.data.order_hx_uids && this.data.order_hx_uids.indexOf(res.data.base.id) != -1) {
  //       _data.canHX = true // 具有扫码核销的权限
  //     }
  //     this.setData(_data)
  //   }
  // },
  async couponStatistics() {
    const res = await WXAPI.couponStatistics(wx.getStorageSync('token'))
    if (res.code == 0) {
      this.setData({
        couponStatistics: res.data
      })
    }
  },
  async getUserAmount() {
    const res = await WXAPI.userAmount(wx.getStorageSync('token'))
    if (res.code == 0) {
      this.setData({
        balance: res.data.balance
      })
    }
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
          APP.globalData.hasLogin = true;
            //存储用户信息
          wx.setStorageSync('userInfo', res.data.userInfo);
          wx.setStorageSync('token', res.data.token);
          wx.setStorageSync('openId', res.data.openId);
          // wx.navigateBack({
          //   delta: 1
          // })
        }).catch((err) => {
          APP.globalData.hasLogin = false;
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