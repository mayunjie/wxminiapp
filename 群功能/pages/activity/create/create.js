var utils = (function () {
  var time = new Date()
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    hours: time.getHours(),
    minutes: time.getMinutes(),
    
  }
})()
var app = getApp()
Page({
  data: {
    title: '', //接龙标题
    activityDay: '', //活动日期
    activityHour: '', //活动时间
    position: '',
    nickName: '',
    phone: '',
    remark: '',
    limitNumber: '',
    latitude: '',
    longitude: ''
  },
  onLoad: function () {
    var that = this;
    //没有授权，先引导用户授权
    if (!app.globalData.userInfo) {
      wx.redirectTo({
        url: '/pages/login/login?url=' + '/pages/activity/create/create',
      })
    } else {
      that.setData({
        activityDay: utils.year + '-' + ('0' + utils.month).substr(-2) + '-' + ('0' + utils.date).substr(-2),
        activityHour: ('0' + utils.hours).substr(-2) + ':' + ('0' + utils.minutes).substr(-2),
        nickName: app.globalData.userInfo.nickName
      })
    }
  },
  bindDayChange: function (e) {
    var that = this;
    that.setData({
      activityDay: e.detail.value,
    })
  },
  bindHourChange: function (e) {
    var that = this;
    that.setData({
      activityHour: e.detail.value,
    })
  },
  bindTitleInput: function (e) {
    var that = this;
    that.setData({
      title: e.detail.value,
    });
  },
  bindLimitInput:function(e) {
    var that = this;
    that.setData({
      limitNumber: e.detail.value,
    });
  },
  bindAddressInput: function (e) {
    var that = this;
    that.setData({
      position: e.detail.value,
    });
  },
  bindNameInput: function (e) {
    var that = this;
    that.setData({
      nickName: e.detail.value,
    });
  },
  bindPhoneInput: function (e) {
    var that = this;
    that.setData({
      phone: e.detail.value,
    });
  },
  bindRemarkInput: function (e) {
    var that = this;
    that.setData({
      remark: e.detail.value,
    });
  },
  getMap: function () {
    var that = this;
    var chooseAddress = function () {
      wx.chooseLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success: function (res) {
          var latitude = res.latitude
          var longitude = res.longitude
          that.setData({
            position: res.name,
            latitude: latitude,
            longitude: longitude
          })
        }
      })
    }
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userLocation'] == false) {
          wx.openSetting({
            success: (res) => {
              console.log('成功打开设置')
              chooseAddress()
            }
          })
        } else {
          chooseAddress()
        }
      }
    })
  },
  ok: function () {
    var that = this;
    if (that.data.title == '') {
      wx.showModal({
        title: '警告!',
        content: '活动标题必需填写',
      })
    } else if (that.data.limitNumber && !/^[1-9]\d*$/.test(that.data.limitNumber)){
      wx.showModal({
        title: '警告!',
        content: '人数限制必须是正整数',
      })
    } else {
      wx.showLoading({
        title: '创建中...',
      })
      app.Util.ajax({
        url: '/activity/create',
        data: {
          title: that.data.title, //活动标题
          activityDay: that.data.activityDay, //活动日期
          activityHour: that.data.activityHour, //活动时间
          position: that.data.position,
          nickName: that.data.nickName,
          phone: that.data.phone,
          remark: that.data.remark,
          limitNumber: that.data.limitNumber,
          latitude: that.data.latitude,
          longitude: that.data.longitude
        },
        resolve: function (res) {
          wx.hideLoading();
          wx.redirectTo({
            url: '../detail/detail?activityId=' + res.data.activityId
          })
        }
      });
    }
  },

  //整数判断
  isInteger: function (obj) {
    return(obj | 0) === obj
  }
})