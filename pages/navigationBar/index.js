// pages/navigationBar/index.js
Component({
  
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
       url:''

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
   
  },
 
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  properties:{
    title:{
      type:String,
      observer: function(newVal, oldVal) {
        this.setData({
          title:this.data.title
        })
      }
    },
    types:{
      type:String,
      observer:function(){
        this.setData({
          types:this.data.types
        })
      }
    },
    url:{
      type:String,
      observer:function(){
        this.setData({
          url:this.data.url
        })
      }
    }
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
 methods:{
  navBack:function(){
    // wx.navigateBack()
    wx.switchTab({
      url: this.data.url,
    })
  },
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

  }
})