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
    this.setData({
      screenHeight: sys.screenHeight,
      noticeId: opt.noticeId
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    app.Util.callbackData(this.getData);
  },

  getData: function(){
    var that = this;
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
      path: '/pages/notice/detail/detail?noticeId=' + that.data.noticeId,
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
              url: '/notice/relate/group',
              data: {
                noticeId: that.data.noticeId,
                encryptedData: res.encryptedData,
                iv: res.iv
              },
              resolve: function (res) {
                console.log(res.data.msg);
              }
            })
          }
        })
      }
    }
  },
  home: function(){
    wx.switchTab({
      url: '../index/index',
    })
  }
})