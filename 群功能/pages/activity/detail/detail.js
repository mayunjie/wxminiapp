var app = getApp()

Page({
  data: {
    activityId: '',
    activityData: '',  //任务详细数据，如标题，发起人等
    enrollType: '',//当前用户报名还是请假
    enrollList: '',//报名列表
    leaveList: '',//请假列表
    enrollNumber: '',
    leaveNumber: '',
    enrollColor: 'green',
    leaveColor: 'red',
  },
  onLoad: function (opt) {
    var that = this;
    wx.showShareMenu({
      withShareTicket: true
    })
    
    that.setData({
      activityId: opt.activityId,
    })
    wx.showLoading({
      title: '加载中...',
    })
    
  },
  onShow: function(){
    app.Util.callbackData(this.getActivityInfo)
  },
  getActivityInfo: function(){
    var that = this;
    //加载活动信息
    app.Util.ajax({
      url: '/activity/info',
      data: {
        activityId: that.data.activityId,
      },
      resolve: function(res){
        wx.hideLoading();
        that.setData({
          activityData: res.data.activity,
          enrollList: res.data.enrollList,
          enrollType: res.data.enrollType,
          leaveList: res.data.leaveList,
          enrollNumber: res.data.enrollList.length,
          leaveNumber: res.data.leaveList.length
        })
        that.setButtonColor(res.data.enrollType, that)
      }
    })
  },  
  //报名
  enroll: function (e) {
    var type = e.currentTarget.dataset.type;
    if (this.data.enrollType == type){
      console.log("重复动作")
      return;
    }
    if (type == 1 && this.data.enrollNumber && this.data.enrollNumber >= this.data.activityData.limitNumber){
      wx.showToast({
        title: '达到人数上限',
      })
      return;
    }
    var that = this;
    app.Util.ajax({
      url: '/activity/enroll',
      data: {
        activityId: that.data.activityId,
        enrollType: type,
      },
      resolve: function(res){
        that.setData({
          enrollType: res.data.enrollType,
          enrollList: res.data.enrollList,
          leaveList: res.data.leaveList,
          enrollNumber: res.data.enrollList.length,
          leaveNumber: res.data.leaveList.length
        })
        that.setButtonColor(res.data.enrollType, that)
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
            app.Util.ajax({
              url: '/activity/relate/group',
              data: {
                activityId: that.data.activityId,
                encryptedData: res.encryptedData,
                iv: res.iv
              }
            })
          }
        })
      }
    }
  },

  setButtonColor: function (enrollType, that){
    if (enrollType) {
      //已报名，则报名按钮置灰
      if (enrollType == 1) {
        that.setData({
          enrollColor: "gray",
          leaveColor: "red"
        })
      } else {
        that.setData({
          enrollColor: "green",
          leaveColor: "gray"
        })
      }
    }
  },
  home: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  openMap: function(){
    var that = this;
    wx.openLocation({
      latitude: that.data.activityData.latitude,
      longitude: that.data.activityData.longitude,
    })
  }
})

