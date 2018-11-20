var app = getApp()
Page({
  data: {
    currentTab: 0,
    //群通知数据
    groupData: '',
    //我创建的数据
    createData: '',
  },
  onLoad: function () {
    
  },
  onShow: function () {
    this.getMyCreateData();
  },
  
  getGroupData: function(){
    var that = this;
    if (app.globalData.openGId == ''){
      return;
    }
    //获取群组公告
    // wx.request({
    //   url: '',
    //   data:{
    //     openGroupId: app.globalData.openGId
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded', // 默认值
    //     'token': app.globalData.token
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     that.setData({
    //       groupData: res.data.noticeList
    //     })
    //   }
    // })
  },

  getMyCreateData: function(){
    var that = this;
    //获取群组公告
    wx.request({
      url: app.globalData.host + '/notice/my/list',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        that.setData({
          createData: res.data.noticeList
        })
        console.log(that.data)
      }
    })
  },

  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
    })
  },
  creat: function () {
    var that = this;
    wx.navigateTo({
      url: '../create/create'
    })
  },
  gotoEnroll: function (e) {
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?noticeId=' + e.currentTarget.dataset.noticeid
    })
  }
})