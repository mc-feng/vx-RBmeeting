// pages/personal/history/history.js
const app = getApp()
import http from '../../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result: [{
      name: "会议名称",
      orderIds: "3",
      roomId: "4",
      path: "1504会议室10F",
      userName: "李白",
      week: "周三",
      startTime: "10:00",
      endTime: "11:30",
      status: "0",
      orderDate: "6月19日"
    }, {
      name: "会议名称",
      orderIds: "5",
      roomId: "6",
      path: "1502会议室12F",
      userName: "李白",
      week: "周四",
      startTime: "15:00",
      endTime: "16:30",
      status: "0",
      orderDate: "6月20日"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // http.history({
    //   data: {
    //     openId: app.globalData.openId,
    //     status:1,
    //     status2:2
    //   },
    //   success(res) {
    //     that.setData({
    //       result: res.data
    //     })
    //     console.log(res)
    //   },
    //   fail(err) {
    //     console.log(err)
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})