import store from './store'
import service from '@/service'
const host = "http://223.100.130.116:7171/ahiru"
// const mshost = ""

function get(url, data,header={'Cookie':store.state.sessionid}) {
  console.log(url)
  return request( host + url, 'GET', data,header)
}

function post(url, data) {
  console.log(url)
  // let param = {
  //   aae011:store.userInfo.aae011,
  //   aae022:store.userInfo.aae022,
  //   aae036:,
  //   aae035:store.userInfo.aae005
  // }
  console.log(service.getSessionId())
  return request( host + url, 'POST', data,{
    // 'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json' ,
    'Cookie':service.getSessionId()
  })
}

// function mspost(url, data) {
//   return request( mshost + url, 'POST', data,{
//     'content-type': 'application/x-www-form-urlencoded',
//     'Cookie':'SESSION='+store.state.sessionid
//   })
// }

function put(url, data) {
  return request( host + url, 'PUT', data,{
    'content-type': 'application/x-www-form-urlencoded',
    // 'Cookie':'SESSION='+store.state.sessionid
  })
}

function del(url, data) {
  return request( host + url, 'DELETE', data)
}

const http ={
  get: get,
  post: post,
  put: put,
  del: del,
  request: request,
  // mspost: mspost
}

// function request(url, method, data, header = {"Cookie":"SESSION="+store.state.sessionid}) {
function request(url, method, data,header={}) {
  // console.log(header)
  wx.showLoading({
    title: '加载中',
    mask: true
  })
  return new Promise((resolve, reject) => {
    wx.request({
      data,
      method,
      header,
      url:url,
      success: function (res) {
        // console.log(res)
        if(res.statusCode==401){
          console.log(401)
        }
        if (res.success=='OK') {
          wx.hideLoading()
          resolve(res.data)
        } else {
          wx.hideLoading()
          resolve(res.data)
        }
      },
      fail: (data) => {
        // 这里可以对请求超时之后。我们可以自定义的业务逻辑,这里只是简单举例
          reject(data);
            wx.hideLoading();
            wx.showModal({
                content: "请求超时...",
                showCancel: false,
                success: (res) => {
                  // 重定向会首页
                  wx.hideLoading()
                  // wx.redirectTo({
                  //     url: 'pages/home/home'
                  // })
        }
            })
      },
      complete: (res) => {
        wx.hideLoading();
      }
    })
  })
}

export default http
