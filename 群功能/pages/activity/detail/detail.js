var app = getApp()

Page({
  data: {
    activityId: '',
    activityData: '',  //任务详细数据，如标题，发起人等
    okWord: '立即报名',
    enrollType: '',//当前用户报名还是请假
    enrollList: '',//报名列表
    leaveList: '',//请假列表
    enrollNumber: '',
    leaveNumber: ''
  },
  onLoad: function (opt) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this;
    that.setData({
      activityId: opt.activityId,
    })
    wx.showLoading({
      title: '加载中...',
    })
    this.getActivityInfo();
  },

  getActivityInfo: function(){
    var that = this;
    //加载活动信息
    wx.request({
      url: app.globalData.host + '/activity/info',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "POST",
      data: {
        activityId: that.data.activityId,
      },
      success: function (res) {
        console.log("get activity")
        wx.hideLoading();
        console.log(res.data.enrollList.length)
        that.setData({
          activityData: res.data.activity,
          enrollList: res.data.enrollList,
          enrollType: res.data.enrollType,
          leaveList: res.data.leaveList,
          enrollNumber: res.data.enrollList.length,
          leaveNumber: res.data.leaveList.length
        })
      }
    });
  },  
  //报名
  enroll: function (e) {
    var type = e.currentTarget.dataset.type;
    if (this.data.enrollType == type){
      console.log("重复动作")
      return;
    }
    var that = this;
    wx.request({
      url: app.globalData.host + '/activity/enroll',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "POST",
      data: {
        activityId: that.data.activityId,
        enrollType: type,
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.code=='200'){
          that.setData({
            enrollType: res.data.enrollType,
            enrollList: res.data.enrollList,
            leaveList: res.data.leaveList,
            enrollNumber: res.data.enrollList.length,
            leaveNumber: res.data.leaveList.length
          })
        }
      }
    })
  },
  //分享
  onShareAppMessage: function (res) {
    var that = this;
    return {
      path: '/pages/activity/detail/detail?activityId=' + that.data.activityId,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (!shareTickets) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            //关联群组与公告
            wx.request({
              url: app.globalData.host + '/activity/relate/group',
              data: {
                activityId: that.data.activityId,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              header: {
                'content-type': 'application/x-www-form-urlencoded', // 默认值
                'token': app.globalData.token
              },
              method: "POST",
              success: function (res) {
                console.log(res.data.msg);
              }
            });
          }
        })
      }
    }
  }
})

