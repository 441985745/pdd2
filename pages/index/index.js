//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    slides: [],
    categories: [{
      title: '乐尚国际卡丁车俱乐部',
      location: '南通市开发区永旺梦乐城4楼',
      openTime:'8:30-17:30'
    }, {
      title: '德宏广告',
      location: '南通市开发区永旺梦乐城3楼',
      openTime: '8:30-17:30'
    }, {
      title: '加速汽车服务站',
      location: '南通市开发区永旺梦乐城2楼',
      openTime: '8:30-17:30'
    }, {
      title: '唐三彩',
      location: '南通市开发区永旺梦乐城1楼',
      openTime: '8:30-17:30'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
