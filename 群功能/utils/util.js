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
const ajax = (url, data, resolve, reject) => {
  console.log("wxRequest")
  var app = getApp();
  var contentType = 'application/x-www-form-urlencoded'; // 默认值
  var token = app.globalData.token;
  var method = 'POST';
  wx.request({
    url: url,
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
      if (res.data.code == '501') {
        wx.showToast({
          title: '登录超时，请重新启动小程序'
        })
      } else {
        //失败处理
        if(reject!=undefined){
          reject(res)
        }else{
          wx.showToast({
            title: res.data.msg
          })
        }
      }
    },
    fail: function (res) {
      if (reject != undefined) {
        reject(res);
      }else{
        wx.showToast({
          title: '请求异常！'
        })
      }
    }
  })
}

module.exports = {
  formatTime: formatTime,
  ajax, ajax
}
