//index.js
//获取应用实例

const app = getApp()
import http from '../../api/api'


Page({
  data: {
    url: app.globalData.url,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    show: false,
    city: [],
    index: 0,
    haveCity: false,
    hysList: [],
  },
  /*事件处理函数*/
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /*
  getMore() {
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 2000
    })
  },*/
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this;
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    /*that.login();
    that.getHysList();*/
  },
  /*登陆
  login() {
    var that = this;
    http.login({
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        if (res.message == '登录失败') {
          // that.complete();
        } else {
          that.setData({
            userId: res.data[0].userId
          })
        }

      }, fail() {

      }
    })
  },*/
  onShow: function () { 
    var that = this;
    that.checkOpenId();
    that.getHysList();
  },
  navTo(e) {
    wx.navigateTo({
      url: '/pages/order/index?roomId=' + e.currentTarget.dataset.roomid + "&&roomName=" + e.currentTarget.dataset.roomname
    })
  },
  getHysList() {
    var that = this;
    http.rooms({
      success(res) {
        that.data.city.push(res.data[0].city)
        // for (var i = 0; i < res.data.length; i++) {
        //   that.data.city.push(res.data[i].city)
        // }
        that.setData({
          hysList: res.data,
          city: that.data.city,
          haveCity: true
        })
      }
    });
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  change() {
    this.setData({
      show: !this.data.show
    })
  },
  //防止网络延迟获取不到openid
  checkOpenId() {
    setTimeout(res, 1000)
    function res() {
      if (app.globalData.openId) {

      } else {
        wx.login({
          success: res => {
            http.info({
              data: {
                code: res.code
              },
              success(res) {
                app.globalData.openId = res.data.openid
              },
              fail(err) {
                console.log(err)
              }
            })
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
          }
        })
      }
    }
  },
  onGetShow(e) {
    this.setData({
      show: !e
    })
  },
  click() {
    var showTwo = this.selectComponent('#bots');
    showTwo.showModal()
  }
})
