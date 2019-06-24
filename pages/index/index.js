//index.js
//获取应用实例
const app = getApp()
import http from '../../api/api'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show:false
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
  },
  //页面展示时
  onShow() {
    //防止网络延迟获取不到openid
    var that = this
    setTimeout(res, 1000)
    function res() {
      if (!app.globalData.openId) {
        wx.login({
          success: res => {
            http.info({
              data: {
                code: res.code
              },
              success(res) {
                console.log("openid获取失败重新获取")
                that.globalData.openId = res.data.openid
              },
              fail(err) {
                console.log(err)
              }
            })
            console.log(res)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      } else {
        console.log("已经获取")
      }
    }
  },
  change(){
     console.log(this.data.show)
     this.setData({
       show :!this.data.show
     })
  },
  click(){
    var showTwo = this.selectComponent('#bots');
    showTwo.showModal()
  }
})
