// pages/personal/index/index.js
const app = getApp()
import http from '../../../api/api'
var initdata = function (that) {
  var result = that.data.result
  for (var i = 0; i < result.length; i++) {
    result[i].txtStyle = ""
  }
  that.setData({ result: result })
} 
Page({
  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    result:[{
      name:"会议名称",
      orderIds:"3",
      roomId:"4",
      path:"1504会议室10F",
      userName:"李白",
      week:"周三",
      startTime:"10:00",
      endTime:"11:30",
      status:"0",
      orderDate:"6月19日"
    },{
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
    }],
    delBtnWidth: 65
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http.history({
      data:{
        openId: app.globalData.openId,
        status: 0
      },
      success(res){
        that.setData({
          result: res.data
        })
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
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
  show(){
    this.setData({
      show: !this.data.show
    })
  },
  // 删除按键
  touchS: function (e) {
    if (e.touches.length == 1) {
      this.setData({
        //设置触摸起始点水平方向位置 
        startX: e.touches[0].clientX
      });
    }
  },
  touchM: function (e) {
    var that = this
    if (e.touches.length == 1) {
      //手指移动时水平方向位置 
      var moveX = e.touches[0].clientX;
      //手指起始点位置与移动期间的差值 
      var disX = this.data.startX - moveX;
      var delBtnWidth = this.data.delBtnWidth;
      var txtStyle = "";
      if (disX == 0 || disX < 0) {//如果移动距离小于等于0，文本层位置不变 
        txtStyle = "left:0px";
      } else if (disX > 0) {//移动距离大于0，文本层left值等于手指移动距离 
        txtStyle = "left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          //控制手指移动距离最大值为删除按钮的宽度 
          txtStyle = "left:-" + delBtnWidth + "px";
        }
      }
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var result = this.data.result;
      result[index].txtStyle = txtStyle;
      //更新列表的状态 
      this.setData({
        result: result
      });
    }
  },
  touchE: function (e) {
    if (e.changedTouches.length == 1) {
      //手指移动结束后水平位置 
      var endX = e.changedTouches[0].clientX;
      //触摸开始与结束，手指移动的距离 
      var disX = this.data.startX - endX;
      var delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮 
      var txtStyle = disX > delBtnWidth / 2 ? "left:-" + delBtnWidth + "px" : "left:0px";
      //获取手指触摸的是哪一项 
      var index = e.currentTarget.dataset.index;
      var result = this.data.result;
      result[index].txtStyle = txtStyle;
      //更新列表的状态 
      this.setData({
        result: result,
        index
      });
    }
  },
  // 弹框事件
  del(){
    var index = this.data.index;
    var result = this.data.result;
    var that = this;
    var selectData = result[index]
    var orderDate = selectData.orderDate
    var roomId = selectData.roomId
    var orderIds = selectData.orderIds
    console.log(selectData)
    console.log(orderIds)
    // result.splice(index, 1);
    //     //更新列表的状态 
    // that.setData({
    //   result: result,
    //   show: !that.data.show
    // });
    http.order({
      data:{
        orderDate,
        roomId,
        orderIds
      },
      success(res){
        console.log(res)
        result.splice(index, 1);
        //更新列表的状态 
        that.setData({
          result: result,
          show: !that.data.show
        });
      },
      fail(err){
        that.setData({
          show: !that.data.show
        });
        wx.showToast({
          title:err,
          icon:"none"
        })
      }
    })
  },
  cancel(){
   var that = this;
    that.setData({
      show: !that.data.show
    });
    initdata(that)
  },
  linkToHis(){
    wx.navigateTo({
      url: '../history/history',
    })
  }
})