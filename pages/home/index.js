// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') +
      'px',
      title:"云租企服",
    images:['../../images/buttom05.jpg','../../images/buttom02.jpg','../../images/swiperstudent.png'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    latitude:'',
    longitude:'',
    points: [],
    polyline: [],
    markers: [{
      // iconPath: "../../images/line.png",
      id: 0,
      latitude: 31.8512,
      longitude: 117.26061,
      width: 50,
      height: 50,
     
    }],
    active: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.setData({
    navigationBarTitle:'云租企服'
   })
    wx.setNavigationBarTitle({
      title: "云租接送"
    }),
    wx.getLocation({
      type: 'wgs84', //wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
      success: (res) => {
        this.setData({
          latitude : res.latitude,
          longitude : res.longitude,
         
          // polyline:this.polyline
        })
      },      
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setCountDown();
  },
  setCountDown:function(){
    var mydate = new Date();
    var totalSecond =parseInt(86400*10 - ((mydate.getHours() * 60 * 60) + (mydate.getMinutes() * 60) + (mydate.getSeconds())));
    var interval = setInterval(function () {
     // 秒数
     var second = totalSecond;
     // 天数位
     var day = Math.floor(second / 3600 / 24);
     var dayStr = day.toString();
     if (dayStr.length == 1) dayStr = '0' + dayStr;
    
     // 小时位
     var hr = Math.floor((second - day * 3600 * 24) / 3600);
     var hrStr = hr.toString();
     if (hrStr.length == 1) hrStr = '0' + hrStr;
    
     // 分钟位
     var min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
     var minStr = min.toString();
     if (minStr.length == 1) minStr = '0' + minStr;
    
     // 秒位
     var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
     var secStr = sec.toString();
     if (secStr.length == 1) secStr = '0' + secStr;
    
     this.setData({
      countDownDay: dayStr,
      countDownHour: hrStr,
      countDownMinute: minStr,
      countDownSecond: secStr,
     });
     totalSecond--;
     if (totalSecond < 0) {
      clearInterval(interval);
      wx.showToast({
       title: '活动已结束',
      });
      this.setData({
       countDownDay: '00',
       countDownHour: '00',
       countDownMinute: '00',
       countDownSecond: '00',
      });
     }
    }.bind(this), 1000);
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  // tab切换
  onChange(event) {
    wx.showToast({
      title: `切换到标签 ${event.detail.name}`,
      icon: 'none',
    });
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToSchool(){
    wx.reLanch({
      url: 'pages/cooperative-school/index'
    })
  }
})