// pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 登录,发送 res.code 到后台换取 openId, sessionKey, unionId
    wx.login({
      success: res => {
        var code = res.code;
        wx.request({
          url: 'http://localhost:8080/login/wx_login',
          data: {
            code: code
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          method: "POST",
          success: function (res) {
            console.log(res);
            if(res.data.code == '200'){
              //记录token
              app.globalData.token = res.data.token;
              that.getUserInfo();
            }else{
              //todo 弹出模态框
            }
          }
        })
      }
    })
  },

  getUserInfo: function(){
    var that = this;
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              wx.request({
                url: 'http://localhost:8080/user/regist',
                data: {
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded', // 默认值
                  'token': app.globalData.token
                },
                method: "POST",
                success: function (res) {
                  if(res.data.code == '200'){
                    //判断如果从群组进入，则
                    if(app.globalData.opts.scene == 1044){
                      that.getGroupInfo();
                    }
                    wx.redirectTo({
                      url: '../notice/index/index',
                      // url: '../notice/detail/detail?noticeId=4'
                    })
                  }else{
                    //todo 弹出模态框
                  }
                }
              })
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回, 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  //获取群组信息
  getGroupInfo: function (){
    console.log("get group")
    wx.getShareInfo({
      shareTicket: app.globalData.opts.shareTicket,
      success: function (res) {
        wx.request({
          url: 'http://localhost:8080/group/id',
          data: {
            encryptedData: res.encryptedData,
            iv: res.iv
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded', // 默认值
            'token': app.globalData.token
          },
          method: "POST",
          success: function (res) {
            app.globalData.openGId = res.data.openGId
          }
        })
      }
    })
  }
})