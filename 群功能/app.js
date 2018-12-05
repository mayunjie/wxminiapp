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

  login: function(){
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
          resolve: function(res){
            //记录token
            wx.hideLoading();
            that.globalData.token = res.data.token;
            that.getUserInfo();
          }
        })
      }
    })
  },

  getUserInfo: function () {
    var that = this;
    var getInfo = function(){
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          var useInfo = res.userInfo
          that.Util.ajax({
            url: '/user/regist',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv,
              nickName: useInfo.nickName
            },
            resolve: function(res){
              that.globalData.userInfo = useInfo
              //判断如果从群组进入，则
              if (that.globalData.opts.scene == 1044) {
                that.getGroupInfo();
              }else{
                //页面函数回调
                wx.hideLoading();
                if(that.paramReadyCallBack){
                  that.paramReadyCallBack()
                }
              }
            }
          })
        }
      })
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']){
          wx.authorize({
            scope: 'scope.userInfo',
            success(res) {
              getInfo();
            }
          })
        }else{
          getInfo();
        }
      }
    })
  },

  //获取群组信息
  getGroupInfo: function () {
    var that = this
    console.log("get group")
    wx.getShareInfo({
      shareTicket: that.globalData.opts.shareTicket,
      success: function (res) {
        that.Util.ajax({
          url: '/group/id',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          resolve: function(res){
            that.globalData.openGId = res.data.openGId
            wx.hideLoading();
            if (paramReadyCallBack) {
              that.paramReadyCallBack();
            }
          }
        })
      }
    })
  },

  Util:{
    ajax: util.ajax
  },
  globalData: {
    userInfo: null,
    token: '',
    // host: 'http://localhost:8080/',
    host: 'https://mlee.top/',
    opts: '',
    openGId: ''
  }
})