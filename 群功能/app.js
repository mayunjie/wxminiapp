//app.js
App({
  onLaunch: function (opts) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //从群内打开
    this.globalData.opts = opts
  },
  globalData: {
    userInfo: null,
    token: '',
    host: 'http://localhost:8080',
    opts: '',
    openGId: ''
  }
})