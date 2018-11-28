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
    if (app.globalData.opts.scene == "1044"){
      if(app.globalData.openGId){
        that.getData();
      }else{
        app.paramReadyCallBack = () =>{
          that.getData()
        }
      }
    }else{
      if (app.globalData.userInfo) {
        that.getData();
      } else {
        app.paramReadyCallBack = () => {
          that.getData()
        }
      }
    }
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