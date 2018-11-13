// pages/setting/setting.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: {
    
    },
    grade: {
     
    }
  },

  //性别选择框
  openGender: function(){
    var that = this;
    var itemList = ['男', '女'];
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            gender:{
              name: itemList[res.tapIndex],
              value: res.tapIndex
            }
          })
        }
      }
    });
  },
  //年级选择框
  openGrade: function () {
    var that = this;
    var itemList = ['初一','初二','初三','高一','高二', '高三']
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            grade:{
              name: itemList[res.tapIndex],
              value: res.tapIndex
            }
          })
        }
      }
    });
  }



})