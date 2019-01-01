var app = getApp()
Page({
  data: {
    noticeId: '',
    baseData: '',
    year: '',
    date: '',
    screenHeight: ''
  },
  onLoad: function (opt) {
    var sys = wx.getSystemInfoSync();
    console.log(sys)
    console.log(opt)
    this.setData({
      screenHeight: sys.screenHeight,
      noticeId: opt.noticeId
    })
    //从分享进入
    if (opt.share) {
      //从群分享进入，关联群信息
      this.setData({
        share: opt.share
      })
    }
    wx.showShareMenu({
      withShareTicket: true
    })
    app.Util.callbackData(this.getData);
    
  },

  getData: function(){
    var that = this;
    //先关联群组信息
    if (that.data.share && app.globalData.openGId) {
      that.relateGroup()
    }
    app.Util.ajax({
      url: '/notice/info',
      data: { noticeId: that.data.noticeId },
      resolve: (res) => {
        that.setData({
          baseData: res.data.notice,
          year: res.data.notice.createTime.substring(0, 4)
        })
      }
    })
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      path: '/pages/notice/detail/detail?noticeId=' + that.data.noticeId + '&share=true',
      // success: function (res) {
      //   var shareTickets = res.shareTickets;
      //   if (!shareTickets) {
      //     return false;
      //   }
      //   wx.getShareInfo({
      //     shareTicket: shareTickets[0],
      //     success: function (res) {
            
      //     }
      //   })
      // }
    }
  },
  home: function(){
    wx.switchTab({
      url: '../index/index',
    })
  },
  relateGroup(){
    //关联群组与公告
    var that = this
    app.Util.ajax({
      url: '/notice/relate/group',
      data: {
        noticeId: that.data.noticeId,
        openGId: app.globalData.openGId
      },
      resolve: function (res) {
        // console.log(res.data.msg);
      }
    })
  }
})