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
    //群组进入
    if (app.globalData.opts.scene == "1044") {
      if (app.globalData.openGId) {
        that.getData();
      } else {
        app.paramReadyCallBack = () => {
          that.getData()
        }
      }
    } else {
      if (app.globalData.userInfo) {
        that.getData();
      } else {
        app.paramReadyCallBack = () => {
          that.getData()
        }
      }
    }
  },
  

  getData: function(){
    wx.showLoading({
      mask: true,
    })
    var that = this;
    var data = {
      openGId: app.globalData.openGId
    }
    app.Util.ajax({
      url: '/activity/list',
      data: data,
      resolve: function(res){
        wx.hideLoading();
        that.setData({
          createData: res.data.myCreate,
          joinData: res.data.myJoin
        })
        if (res.data.group){
          that.setData({
            groupData: res.data.group
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