const APP = getApp()
const AUTH = require('../../utils/auth')
const WXAPI = require('apifm-wxapi')

// fixed首次打开不显示标题的bug
APP.configLoadOK = () => {
  wx.setNavigationBarTitle({
    title: wx.getStorageSync('mallName')
  })
}

Page({
  data: {
    latitude:'',
    longitude:'',
    points: [],
    polyline: [],
    // polyline: [{
    //   points:[{
    //       longitude: 117.129045,
    //       latitude:31.825284
    //     },
    //     {
    //       longitude: 117.150438,
    //       latitude:31.837456
    //     },{
    //       longitude:117.165134,
    //       latitude:31.870335
    //     },
    //   ],
    //   color: "orange",
    //   width: 20,
    //   dottedLine: true,
    // }],
    markers:[],
    show:false,
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
    ],
    activeStep:1,
  },  
  onLoad: function () {
    // 设置标题
    const mallName = wx.getStorageSync('mallName')
    if (mallName) {
      wx.setNavigationBarTitle({
        title: "线路图"
      })
    }
    var temp = [{
      longitude: 117.129045,
      latitude:31.825284
    },
    {
      longitude: 117.150438,
      latitude:31.837456
    },{
      longitude:117.165134,
      latitude:31.870335
    },
  ]
  var polyline = [{
    color: "orange",
    width: 20,
    dottedLine: true,
    points:temp,  
  }]
  this.setData({
    polyline:polyline,
    points:temp
  })
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
  onShow: function(){

  },
  showDetails(){
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  onChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },
 
})
