const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//wxrequest 封装
const ajax = (config) => {
  var app = getApp();
  let {
    url = "",
    data = {},
    contentType = 'application/x-www-form-urlencoded',
    method = 'POST',
    token = app.globalData.token,
    resolve,
    reject,
    ...other
  } = { ...config }
  wx.request({
    url: app.globalData.host + url,
    data: data,
    header: {
      'content-type': contentType, // 默认值
      'token': token,
    },
    method: method,
    success: function (res) {
      //成功
      if (res.data.code == '200') {
        if (resolve != undefined) {
          resolve(res);
        } else {
          wx.showToast({
            title: '请求成功'
          })
        }
      }
      //session异常
      else if (res.data.code == '501') {
        app.login();
      } else {
        //失败处理
        if (reject != undefined) {
          reject(res)
        } else if(res.data.msg){
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else{
          wx.showToast({
            title: "请求异常！",
            icon: 'none'
          })
        }
      }
    },
    fail: function (res) {
      if (reject != undefined) {
        reject(res);
      } else {
        wx.showToast({
          title: '请求异常！',
          icon: 'none'
        })
      }
    }
  })
}

const callbackData = (getData) =>{
  var app = getApp();
  //群组进入
  if (app.globalData.opts.scene == "1044") {
    if (app.globalData.openGId) {
      getData();
    } else {
      app.gIdReadyCallBack = () => {
        getData()
      }
    }
  } else {
    if (app.globalData.token){
      getData();
    }else{
      app.tokenReadyCallBack = () => {
        getData()
      }
    }
  }
}
module.exports = {
  formatTime: formatTime,
  ajax: ajax,
  callbackData: callbackData
}
