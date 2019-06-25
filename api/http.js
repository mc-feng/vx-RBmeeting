module.exports = {
  http(url, method, params) {
    // let token = 'token' // 获取token，自行获取token和签名，token和签名表示每个接口都要发送的数据
    // let sign = 'sign' // 获取签名
    // let data = {
    //   token,
    //   sign
    // }暂时不需要

    if (method == "PUT"||"DELETE"){
      var headers = "application/x-www-form-urlencoded"
    }else{
      var headers = "application/json"
    }
    let baseUrl = "http://192.168.31.109:8080/yjjk"//模拟数据接口

    let data ={}
    if (params.data) { // 在这里判断一下data是否存在，params表示前端需要传递的数据，params是一个对象，有三组键值对，data：表示请求要发送的数据，success：成功的回调，fail：失败的回调，这三个字段可缺可无，其余字段会忽略
      for (let key in params.data) { // 在这里判断传过来的参数值为null，就删除这个属性
        if (params.data[key] == null || params.data[key] == 'null') {
          delete params.data[key]
        }
      }
      data = { ...data, ...params.data }
    }

    wx.request({
      url: baseUrl + url, // 就是拼接上前缀,此接口域名是开放接口，可访问
      method: method, // 判断请求类型，除了值等于'post'外，其余值均视作get
      data,
      header: {
        'content-type': headers
      },
      success(res) {
        params.success(res.data)
      },
      fail(err) {
        params.fail(err)
      }
    })
  }
}