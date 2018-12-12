// pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAuth: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
        app.Util.ajax({
          url: '/login/wx_login',
          data: {
            code: code
          },
          resolve: function (res) {
            //记录token
            wx.hideLoading();
            app.globalData.token = res.data.token;
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
        //没有授权则先引导用户授权
        if (!res.authSetting['scope.userInfo']) {
          that.setData({
            userAuth: false
          })
        } else {
          that.getUserInfo();
        }
      }
    })
  },

  getUserInfo: function(){
    var that = this;
    wx.getUserInfo({
      success: res => {
        that.setUserInfo(res)
      }
    })
  },

  setUserInfo(res){
    var that = this;
    // 可以将 res 发送给后台解码出 unionId
    var useInfo = res.userInfo
    app.Util.ajax({
      url: '/user/regist',
      data: {
        encryptedData: res.encryptedData,
        iv: res.iv,
        nickName: useInfo.nickName
      },
      resolve: function (res) {
        app.globalData.userInfo = useInfo
        //判断如果从群组进入，则
        if (app.globalData.opts.scene == 1044) {
          that.getGroupInfo();
        } else {
          //页面函数回调
          that.switchToNotice();
        }
      }
    })
  },
  //获取群组信息
  getGroupInfo: function () {
    var that = this
    wx.getShareInfo({
      shareTicket: app.globalData.opts.shareTicket,
      success: function (res) {
        app.Util.ajax({
          url: '/group/id',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          resolve: function (res) {
            app.globalData.openGId = res.data.openGId
            that.switchToNotice();
          }
        })
      }
    })
  },
  switchToNotice: function(){
    wx.switchTab({
      url: '../notice/index/index',
    })
  }
})