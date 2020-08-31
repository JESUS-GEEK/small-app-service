// pages/signIn/index.js
var api = require('../../config/api.js');
var util = require('../../utils/request.js');
var user = require('../../utils/user.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //img_url: config.imgUrl, //图片地址

    //签到模块
    signNum: 1,  //签到数
    signScore:0, 
    signState: false, //签到状态
    min: 1,  //默认值日期第一天1
    max: 7,  //默认值日期最后一天7
    be: 0,  //默认倍数
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // let _this = this;

    // var a = wx.getStorageSync("userInfo");
    // a ? this.setData({
    //   uInfo: a
    // }) : wx.showModal({
    //   title: "提示",
    //   content: "您未登陆，请先登陆！",
    //   success: function (t) {
    //     if (t.confirm) {
    //       var a = encodeURIComponent("/sqtg_sun/pages/public/pages/myorder/myorder?id=0");
    //       app.reTo("/sqtg_sun/pages/home/login/login?id=" + a);
    //     } else t.cancel && app.lunchTo("/sqtg_sun/pages/home/index/index");
    //   }
    // });

    //接收后端数据
   this.getSignInfo();
  },
  // 查询签到
  getSignInfo(e){
    let that = this;
    util.request(
      api.querySignIn,{
        userId:wx.getStorageSync('openId'),
      },"GET"
      // data: {
      //   id:this.data.uInfo.id
        
      // },
      // success: function (res) {
      //   console.log('连接成功')
      //   that.setData({
      //     signNum: res.data.signNum,
      //     min: res.data.min //接收到的数据，页面调用的是这里的数据
      //   })
      // },
      // fail: function (res) {
      //   console.log("连接失败")
      // }
    ).then((res)=>{
         that.setData({
          signNum: res.data.signDay,
          signScore:res.data.signScore,
          min: res.data.signDay //接收到的数据，页面调用的是这里的数据
        })
    })

  },

  //签到
  bindSignIn(e) {
    var that = this,
      num = e.currentTarget.dataset.num;
      num++
      console.log(num,e.currentTarget.dataset,'num');
      util.request(api.signIn,{
           userId:wx.getStorageSync('openId'),
      },"GET").then(res=>{
        if(res.errno== -2){
          wx.showToast({
            title: res.errmsg,
            icon:'none',
          })
          return
        }else{
          that.setData({
            signNum: num,
            // signState: false //点击后是否继续允许点击，true为不允许，false为允许，正式使用时应为true
          })
          wx.showToast({
            title: res.data,
            icon: 'success'
          })
          this.getSignInfo();
           var min = e.currentTarget.dataset.min,
            max = e.currentTarget.dataset.max,
            be = e.currentTarget.dataset.be;
  
          if (num % 7 == 0) {
            be += 1;
            that.setData({
              be: be
            })
          }
  
          if (num == 7 * be + 1) {
            that.setData({
              min: 7 * be + 1,
              max: 7 * be + 7
            })
          }
        
        }
      })
      // success: function (res) {

      //       that.setData({
      //         signNum: num,
      //         // signState: false //点击后是否继续允许点击，true为不允许，false为允许，正式使用时应为true
      //       })
      //        var min = e.currentTarget.dataset.min,
      //         max = e.currentTarget.dataset.max,
      //         be = e.currentTarget.dataset.be;

      //       if (num % 7 == 0) {
      //         be += 1;
      //         that.setData({
      //           be: be
      //         })
      //       }

      //       if (num == 7 * be + 1) {
      //         that.setData({
      //           min: 7 * be + 1,
      //           max: 7 * be + 7
      //         })
      //       }

      //   // wx.showToast({
      //   //   icon: 'success',
      //   //   title: res.msg,
      //   // })

      //   console.log('连接成功1')
      //   that.setData({
      //     // signNum: res.data,
      //     // min: res.data, //接收到的数据，页面调用的是这里的数据
      //     // signState: res.data//点击后是否继续允许点击，true为不允许，false为允许，正式使用时应为true
      //   })
      // },
      // fail: function (res) {
      //   console.log("连接失败")
      // }
    // })
  },
})