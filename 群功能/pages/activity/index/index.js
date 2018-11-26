var app = getApp()
Page({
  data: {
    currentTab: 0,
    joinData: '',
    createData: '',
    groupData: ''
  },
  onShow: function () {
    var that = this;
    that.getData();
  },
  

  getData: function(){
    var that = this;
    var data = {};
    if(app.globalData.scene = '1044'){
      data = {
        openGId: app.globalData.openGId
      }
    }
    wx.request({  //请求我参加的活动列表
      url: app.globalData.host + '/activity/list',
      header: {
        'content-type': 'application/x-www-form-urlencoded', // 默认值
        'token': app.globalData.token
      },
      data:data,
      method: "POST",
      success: function (res) {
        wx.hideLoading();
        that.setData({
          createData: res.data.myCreate,
          groupData: res.data.group,
          joinData: res.data.myJoin
        })
      }
    });
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
      url: '../detail/detail?activityId=' + e.currentTarget.dataset.activityid
    })
  }
})