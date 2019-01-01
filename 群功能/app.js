//app.js
var util = require('./utils/util.js')
App({
  onLaunch: function (opts) {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //从群内打开
    this.globalData.opts = opts
    this.login();
  },
  login: function () {
    wx.showLoading({
      mask: "true"
    })
    var that = this;
    // 登录,发送 res.code 到后台换取 openId, sessionKey, unionId
    wx.login({
      success: res => {
        var code = res.code;
        that.Util.ajax({
          url: '/login/wx_login',
          data: {
            code: code
          },
          resolve: function (res) {
            //记录token
            that.globalData.token = res.data.token;
            if (that.globalData.opts.scene == 1044) {
              that.getGroupInfo();
            }else{
              if (that.tokenReadyCallBack){
                that.tokenReadyCallBack();
              }
              wx.hideLoading();
            }
            that.authUser();
          }
        })
      }
    })
  },


  authUser: function () {
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log("get setting")
        //没有授权则先引导用户授权
        if (res.authSetting['scope.userInfo']) {
          console.log("auth user")
          that.getUserInfo();
        }
      }
    })
  },

  getUserInfo: function (userCallback) {
    var that = this;
    wx.getUserInfo({
      success: res => {
        that.setUserInfo(res, userCallback)
      }
    })
  },

  setUserInfo(res, userCallback) {
    var that = this;
    // 可以将 res 发送给后台解码出 unionId
    var useInfo = res.userInfo
    that.globalData.userInfo = useInfo
    if (userCallback){
      userCallback();
    }
    that.Util.ajax({
      url: '/user/regist',
      data: {
        encryptedData: res.encryptedData,
        iv: res.iv,
        nickName: useInfo.nickName
      },
      resolve: function (res) {
        
      }
    })
  },
  //获取群组信息
  getGroupInfo: function () {
    var that = this
    wx.getShareInfo({
      shareTicket: that.globalData.opts.shareTicket,
      success: function (res) {
        that.Util.ajax({
          url: '/group/id',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          resolve: function (res) {
            that.globalData.openGId = res.data.openGId
            if (that.gIdReadyCallBack) {
              that.gIdReadyCallBack();
            }
            wx.hideLoading();
          }
        })
      }
    })
  },
  Util:{
    ajax: util.ajax,
    callbackData: util.callbackData
  },
  globalData: {
    userInfo: null,
    token: '',
    // host: 'http://localhost:8080/',
    host: 'https://mlee.top',
    opts: '',
    openGId: ''
  }
})