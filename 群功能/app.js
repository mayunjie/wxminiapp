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
    var that = this;
    // 登录,发送 res.code 到后台换取 openId, sessionKey, unionId
    wx.login({
      success: res => {
        var code = res.code;
        wx.request({
          url: that.globalData.host + '/login/wx_login',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: "POST",
          success: function (res) {
            console.log(res);
            if (res.data.code == '200') {
              //记录token
              that.globalData.token = res.data.token;
              //回调页面方法
              if (that.tokenReadyCallback){
                that.tokenReadyCallback();
              }
              that.getUserInfo();
            } else {
              //todo 弹出模态框
            }
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
          that.globalData.userInfo = res.userInfo
          wx.request({
            url: that.globalData.host + '/user/regist',
            data: {
              encryptedData: res.encryptedData,
              iv: res.iv
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded', // 默认值
              'token': that.globalData.token
            },
            method: "POST",
            success: function (res) {
              if (res.data.code == '200') {
                //判断如果从群组进入，则
                if (that.globalData.opts.scene == 1044) {
                  that.getGroupInfo();
                }
              } else {
                //todo 弹出模态框
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
        wx.request({
          url: that.globalData.host + '/group/id',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'token': that.globalData.token
          },
          method: "POST",
          success: function (res) {
            that.globalData.openGId = res.data.openGId
            if (openGIdReadyCallback){
              that.openGIdReadyCallback();
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
    host: 'http://localhost:8080',
    opts: '',
    openGId: ''
  }
})