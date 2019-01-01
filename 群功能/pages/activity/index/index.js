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
    app.Util.callbackData(that.getData);
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
        console.log(res.data.group)
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
  create: function () {
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
  },
  deleteActivity: function(e){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定删除？',
      success(res) {
        if (res.confirm) {
          var activityId = e.currentTarget.dataset.activityid;
          app.Util.ajax({
            url: '/activity/delete',
            data: {
              activityId: activityId
            },
            resolve: function (res) {
              that.setData({
                createData: res.data.myCreate,
                joinData: res.data.myJoin
              })
              if (res.data.group) {
                that.setData({
                  groupData: res.data.group
                })
              }
            }
          })
        }
      }
    })
  }
})