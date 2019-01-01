var app = getApp()
Page({
  data: {
    title: '',
    content: '',
    nickName: '',
    screenHeight: ''
  },
  onLoad: function () {
    var sys = wx.getSystemInfoSync();
    //没有授权，先引导用户授权
    if(!app.globalData.userInfo){
      wx.redirectTo({
        url: '/pages/login/login?url=' + '/pages/notice/create/create',
      })
    }else{
      console.log("create")
      this.setData({
        nickName: app.globalData.userInfo.nickName,
        screenHeight: sys.screenHeight
      })
    }
    
  },
  bindTitleInput: function (e) {
    this.setData({
      title: e.detail.value,
    });
  },
  bindContentInput: function (e) {
    this.setData({
      content: e.detail.value,
    });
  },
  bindNameInput: function (e) {
    this.setData({
      nickName: e.detail.value,
    });
  },
  ok: function () {
    var that = this;
    if (that.data.title == '') {
      wx.showModal({
        title: '警告!',
        content: '投票标题必需填写',
      })
    } else if (that.data.content == '') {
      wx.showModal({
        title: '警告!',
        content: '通知内容必需填写',
      })
    } else {
      wx.showLoading({
        title: '创建中...',
      })
      app.Util.ajax({
        url: '/notice/create',
        data: {
          title: that.data.title,
          content: that.data.content,
          nickName: that.data.nickName
        },
        resolve: function (res) {
          wx.hideLoading();
          console.log(res)
          wx.redirectTo({
            url: '../detail/detail?noticeId=' + res.data.noticeId
          })
        }
      })
    }
  }
})