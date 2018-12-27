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
  

  getUserInfo: function(){
    app.getUserInfo();
    wx.navigateBack();
  }
})