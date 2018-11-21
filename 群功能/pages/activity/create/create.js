var utils = (function () {
  var time = new Date()
  return {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    hours: time.getHours(),
    minutes: time.getMinutes()
  }
})()
var app = getApp()
Page({
  data: {
    title: '', //接龙标题
    activityDay: '', //活动日期
    activityHour: '', //活动时间
    address: '',
    nickName: '',
    phone: '',
    remark: '',
  },
  onLoad: function () {
    var that = this;
    that.setData({
      activityDay: utils.year + '-' + ('0' + utils.month).substr(-2) + '-' + ('0' + utils.date).substr(-2),
      activityHour: ('0' + utils.hours).substr(-2) + ':' + ('0' + utils.minutes).substr(-2),
      nickName: app.globalData.userInfo.nickName
    })
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
  bindAddressInput: function (e) {
    var that = this;
    that.setData({
      address: e.detail.value,
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
            address: res.name + '(' + res.address + ')'
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
        success: function (res) {

        }
      })
    } else {
      wx.showLoading({
        title: '创建中...',
      })
      wx.request({
        url: app.globalData.host + '/activity/create',
        header: {
          'content-type': 'application/x-www-form-urlencoded', // 默认值
          'token': app.globalData.token
        },
        method: "POST",
        data: {
          title: that.data.title, //接龙标题
          activityDay: that.data.activityDay, //活动日期
          activityHour: that.data.activityHour, //活动时间
          address: that.data.address,
          nickName: that.data.nickName,
          phone: that.data.phone,
          remark: that.data.remark,
        },
        success: function (res) {
          wx.hideLoading();
          console.log(res.data.activityId);
          // wx.redirectTo({
          //   url: '../enroll/enroll?taskid=' + that.data.taskid
          // })
        }
      });
    }
  }
})