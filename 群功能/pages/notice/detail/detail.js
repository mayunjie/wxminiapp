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
      screenHeight: sys.screenHeight
    })
    wx.showShareMenu({
      withShareTicket: true
    })
    wx.request({  //请求群通知任务的详情数据
      url: app.globalData.host + '/notice/info',
      data: { noticeId: opt.noticeId },
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "POST",
      success: (res) => {
        this.setData({
          noticeId: opt.noticeId,
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
            wx.request({
              url: app.globalData.host + '/notice/relate/group',
              data: {
                noticeId: that.data.noticeId,
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