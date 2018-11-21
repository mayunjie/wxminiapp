var app = getApp()

Page({
  data: {
    activityId: '',
    activityData: '',  //任务详细数据，如标题，发起人等
    joinerData: '',//参与活动的人员详情列表数据
    joinerNumber: '',  //参与了该任务的人员数量
    okWord: '立即报名',
    enrollToast: false,
    joinerName: '',
    joinerTel: '',
    joinerRemark: '',
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
        wx.hideLoading();
        that.setData({
          activityData: res.data.activity
        })
      }
    });
  },

  getJoinInfo: function(){
    wx.request({  //请求任务的参与者列表
      url: `${app.globalData.host}/application/link/getTaskJoiner.php`,
      data: {
        taskid: opt.taskid,
      },
      dataType: 'JSONP',
      success: function (res) {
        var data0 = JSON.parse(res.data);
        that.setData({
          joinerData: data0
        })
      }
    });
  },
  onShareAppMessage: function (res) {
    var that = this;
    return {
      path: `/pages/link/enroll/enroll?taskid=${that.data.taskid}&fromClickId=${app.globalData.clickId}`,
      success: function (res) {
        var shareTickets = res.shareTickets;
        if (!shareTickets) {
          return false;
        }
        wx.getShareInfo({
          shareTicket: shareTickets[0],
          success: function (res) {
            var encryptedData = res.encryptedData;
            var iv = res.iv;
            wx.request({
              //url: 'https://test.hytips.com/wechat/Gold/demo.php',
              url: app.globalData.host + '/application/link/wx_xcx.php',
              data: {
                appid: app.globalData.AppID,  //小程序ID
                sessionKey: app.globalData.session_key,
                encryptedData: encryptedData,
                iv: iv
              },
              dataType: 'JSONP',
              success: function (res) {
                //此处有坑:返回的数据不是JSON字符串!
                var GId = JSON.parse(res.data.substring(res.data.indexOf('{'), res.data.lastIndexOf('}') + 1)).openGId;
                wx.request({
                  url: app.globalData.host + '/application/link/storeGId.php',
                  data: {
                    gid: GId,
                    taskid: that.data.taskid,
                  },
                  dataType: 'JSONP',
                  success: function (res) { }
                });
              }
            });
          }
        })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  ok: function () {
    var that = this;
    that.setData({
      enrollToast: true,
    })
  },
  cancel: function () {
    var that = this;
    that.setData({
      enrollToast: false,
    })
  },
  bindJoinerNameInput: function (e) {
    var that = this;
    that.setData({
      joinerName: e.detail.value,
    });
  },
  bindJoinerTelInput: function (e) {
    var that = this;
    that.setData({
      joinerTel: e.detail.value,
    });
  },
  bindJoinerRemarkInput: function (e) {
    var that = this;
    that.setData({
      joinerRemark: e.detail.value,
    });
  },
  join: function () {
    var that = this;
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({  //加入此活动，并将用户更多信息存入数据库
      url: app.globalData.host + '/application/link/joinjielongtask.php',
      data: {
        openid: app.globalData.openid,
        taskid: that.data.taskid,
        joinerName: that.data.joinerName,
        joinerTel: that.data.joinerTel,
        joinerRemark: that.data.joinerRemark,
      },
      dataType: 'JSONP',
      success: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 2000
        });
        that.setData({
          okWord: '已报名',
          joinerNumber: Number(that.data.joinerNumber) + 1,
          enrollToast: false,
        });
        wx.redirectTo({ //刷新页面
          url: '../enroll/enroll?taskid=' + that.data.taskid
        })
      }
    });
  },
})

