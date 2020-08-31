const APP = getApp()
var api = require('../../config/api.js');
var util = require('../../utils/request.js');

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
  },
  onShow: function () {

  },
  onClose() {
    this.setData({ show: false });
  },
  onDisplay(e) {
    console.log(e,'e');
    this.setData({
      show:true,
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
        title: '请填写孩子姓名',
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
    if (!this.data.valueParent) {
      wx.showToast({
        title: '请填写父母姓名',
        icon: 'none'
      })
      return
    }
    if(!this.data.address) {
      wx.showToast({
        title:'请填写家庭地址',
        icon:'none'
      })
      return
    }
    if(!this.data.schoolName) {
      wx.showToast({
        title:'请填写学校名称',
        icon:'none'
      })
      return
    }
    if(!this.data.schoolAddress) {
      wx.showToast({
        title:'请填写学校地址',
        icon:'none'
      })
      return
    }
    if(!this.data.afterClass) {
      wx.showToast({
        title:'请填写下课时间',
        icon:'none'
      })
      return
    }
    if(!this.data.line) {
      wx.showToast({
        title:'请选择班车路线',
        icon:'none'
      })
      return
    }
    // 提交签约信息接口
    const extJsonStr = {}
    extJsonStr['孩子姓名'] = this.data.name
    extJsonStr['联系电话'] = this.data.mobile
    extJsonStr['父母姓名'] = this.data.valueParent
    extJsonStr['家庭住址'] = this.data.address
    extJsonStr['学校名称'] = this.data.schoolName
    extJsonStr['学校地址'] = this.data.schoolAddress
    extJsonStr['下课时间'] = this.data.afterClass
    extJsonStr['班车路线'] = this.data.line
    
    // const res = await WXAPI.yuyueJoin({
    //   token: wx.getStorageSync('token'),
    //   yuyueId: wx.getStorageSync('zxdz'),
    //   extJsonStr: JSON.stringify(extJsonStr)
    // })
    util.request(api.info,{
      extJsonStr
    },"POST").then((res) => {
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
    })
  
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