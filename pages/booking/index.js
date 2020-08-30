const APP = getApp()
const AUTH = require('../../utils/auth')
const WXAPI = require('apifm-wxapi')

// fixed首次打开不显示标题的bug
APP.configLoadOK = () => {
  
}
Page({
  data: {
    show: false,
    line:'',
    actions: [
      {
        name: '枫丹白露湖公馆线路',
        value:0,
      },
      {
        name: '枫丹白露湖公馆线路',
        value:1,
      },
      {
        name: '枫丹白露湖公馆线路',
        value:2,
      
      },
    ],

  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: "我的签约"
    })
  },
  onShow: function () {

  },
  changePersionNum(e) {
    this.setData({
      persionNumIndex: e.currentTarget.dataset.idx
    })
  },
  onClose() {
    this.setData({ show: false });
  },
  onDisplay(e) {
    console.log(e,'e');
    this.setData({
      show:true,
      // line:
    });
  },
  onSelect(event) {
    console.log(event.detail);
    this.setData({
      line:event.detail.name
    })
  },
  async submit() {
    if (!this.data.name) {
      wx.showToast({
        title: '请填写姓名',
        icon: 'none'
      })
      return
    }
    if (!this.data.mobile) {
      wx.showToast({
        title: '请填写联系电话',
        icon: 'none'
      })
      return
    }
    if (!this.data.time) {
      wx.showToast({
        title: '请选择到店时间',
        icon: 'none'
      })
      return
    }
    const extJsonStr = {}
    extJsonStr['姓名'] = this.data.name
    extJsonStr['联系电话'] = this.data.mobile
    extJsonStr['到店时间'] = this.data.time
    extJsonStr['用餐人数'] = this.data.persionNum[this.data.persionNumIndex]
    const res = await WXAPI.yuyueJoin({
      token: wx.getStorageSync('token'),
      yuyueId: wx.getStorageSync('zxdz'),
      extJsonStr: JSON.stringify(extJsonStr)
    })
    if (res.code != 0) {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    } else {
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      })
      setTimeout(() => {
        wx.navigateBack()
      }, 1000);
    }
  },
  showDatetimePop() {
    this.setData({
      showDatetimePop: true
    })
  },
  hideDatetimePop() {
    this.setData({
      showDatetimePop: false
    })
  },
  confirm(e) {
    const newDate = new Date(e.detail)
    this.setData({
      time: newDate.toLocaleString()
    })
    this.hideDatetimePop()
  },
})