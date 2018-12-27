var app = getApp()
Page({
  data: {
    currentTab: 0,
    //群通知数据
    groupData: '',
    //我创建的数据
    createData: '',
  },
  
  onShow: function(){
    var that = this;
    //群组进入
    app.Util.callbackData(that.getData);
  },

  getData : function(){
    wx.showLoading({
      mask: "true"
    })
    var that = this;
    app.Util.ajax({
      url: '/notice/list',
      data: {
        openGId: app.globalData.openGId
      },
      resolve:function(res){
        wx.hideLoading();
        if (res.data.groupList){
          that.setData({
            groupData: res.data.groupList
          })
        }
        if (res.data.myCreateList){
          that.setData({
            createData: res.data.myCreateList
          })
        }
      }
    })
  },

  swichNav: function (e) {
    var that = this;
    that.setData({
      currentTab: e.target.dataset.current,
    })
  },
  create: function () {
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
  },
  onPullDownRefresh() {
    var that = this
    app.Util.ajax({
      url: '/notice/list',
      data: {
        openGId: app.globalData.openGId
      },
      resolve:function(res){
        if (res.data.groupList){
          that.setData({
            groupData: res.data.groupList
          })
        }
        if (res.data.myCreateList){
          that.setData({
            createData: res.data.myCreateList
          })
        }
        wx.stopPullDownRefresh() //停止下拉刷新
      }
      
    })
  }
})