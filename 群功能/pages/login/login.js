// pages/login/login.js
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userAuth: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function(opt){
    if(opt.url){
      this.setData({
        url: opt.url
      })
    }
  },
  getUserInfo: function(){
    var that = this
    app.getUserInfo(that.userCallback);
  },

  userCallback:function(){
    var that = this
    if (that.data.url){
      wx.redirectTo({
        url: that.data.url,
      })
    }else{
      wx.navigateBack({})
    }
  }
})