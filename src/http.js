import store from './store'

const host = "http://223.100.130.116:7171/ahiru"
// const mshost = ""

function get(url, data,header={}) {
  return request( host + url, 'GET', data,header)
}

function post(url, data) {
  return request( host + url, 'POST', data,{
    // 'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json' 
    // 'Cookie':'SESSION='+store.state.sessionid
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
        console.log(res)
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
      }
    })
  })
}

export default http
