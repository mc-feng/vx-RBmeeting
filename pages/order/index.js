// pages/order/index.js
const app = getApp();
import http from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: app.globalData.url,
    name:'',
    phoneNumber:'',
    success:'',
    wrong:'',
    complete:'',
    dayList:[],
    index:0,
    weekend:'',
    time_period_number:[],
    styleList:[],
    orderList:[],
    dateActive:0,
    roomId:'',
    theme:'',
    week:'',
    userName:'',
    time_period:[],
    openId: 'oV0mB4lrdf12AaMaJ8MJ-ZNIXYXK'
    // animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date();
    console.log(options)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var week = new Date().getDay();
    var month_td = month;
    var day_td = day;
    if (month < 10) {
      month_td = "0" + month;
    }
    if (day < 10) {
      day_td = "0" + day;
    }
    this.setData({
      roomId: options.roomId,
      roomName: options.roomName,
      year:year,
      month:month,
      day:day,
      week: week,
      orderDate: year + '-' + month_td + '-' + day_td
    })
    this.getDay(year,month,day,week);
    this.getTimeList(year,month,day);
    this.login();
    // this.getOrderList(year, month, day);
  },
  /*登陆*/
  login(){
    var that = this;
    http.login({
      data: { 
        openId: that.data.openId
        },
      success(res){
        console.log(res)
        if (res.message=='登录失败'){
          that.complete();
          console.log('aaa')
        }else{
          console.log('bbb')
          that.setData({
            userId: res.data[0].userId
          })
        }
        
      },fail(){
        
      }
    })
  },
  /*获取时间段列表*/
  getTimeList(year,month,day){
    var that = this;
    http.timesList({
      success(res) {
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].canSelect = true;
          res.data[i].isSelect = 0;
        }
        that.getOrderList(year, month, day);
        that.setData({
          timesList: res.data
        })
      }, fail() {

      }
    })
  },
  /*获取当前日期的已预约列表*/
getOrderList(year, month,day) {
    var that = this;

    if(month<10){
      month = "0"+month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    var orderDate = year+'-'+month+'-'+day;
    http.orderList({
      data:{
        orderDate: orderDate,
        roomId: that.data.roomId
      },
      success(res){

        that.setData({
          orderList: res.data
        })
        
        if (that.data.orderList.length==0){
          
        }else{
          for (var i = 0; i < that.data.orderList.length;i++){
            for (var j = 0; j < that.data.timesList.length; j++) {
              if (that.data.orderList[i].timesId == that.data.timesList[j].timesId){
                that.data.timesList[j].canSelect = false;
              }
            }
          }
          that.setData({
            timesList: that.data.timesList
          })
          
        }
      }
    })
  },
  /*选中某/某些时间段*/
  choose(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index)
    var per = that.data.time_period_number;/*选中时间段的集合*/
      if (per.length == 0) {/*第一次点击 加入选中集合，样式改变*/
        per.push(e.currentTarget.dataset.index);
        that.data.time_period.push(e.currentTarget.dataset.timesid);
        that.data.timesList[index].isSelect = 1;
      } else {/*第二次点击*/
        if (per[per.length - 1] - Number(e.currentTarget.dataset.index) == 1 || per[per.length - 1] - Number(e.currentTarget.dataset.index) == -1) {/*第多次点击且连续*/
          per.push(e.currentTarget.dataset.index);/*加入选中集合*/
          that.data.time_period.push(e.currentTarget.dataset.timesid);
          that.data.timesList[index].isSelect = 1;/*样式改变 被选中*/
        } 
        else if (per.indexOf(Number(e.currentTarget.dataset.index))>-1){/*当前点击的时间段如果是刚刚已点过的*/
          for (var i = 0; i < per.length; i++) {
            that.data.timesList[i].isSelect = 0;/*样式改变 未被选中*/
          }
          per = [];
          that.data.time_period = [];
          console.log(that.data.timesList)
        }
        else {/*第多次点击但不连续*/
          for (var i = 0; i < that.data.timesList.length; i++) {
            that.data.timesList[i].isSelect = 0;
          }/*把所有的样式清空*/
          that.data.timesList[index].isSelect = 1;/*当前样式改变*/
          wx.showToast({
            title: '多选时段请连续～',
            icon: 'none'
          })
          per = [];/*清空选中时间段的集合*/
          that.data.time_period = [];
          per.push(e.currentTarget.dataset.index)/*把当中选中时间段加入集合*/
          that.data.time_period.push(e.currentTarget.dataset.timesid);
        }
      }
    that.setData({
      time_period_number:per,
      time_period: that.data.time_period,
      timesList: that.data.timesList,
    })
    console.log(that.data.time_period)
    console.log(that.data.timesList)
  },
  /*预约成功弹窗弹出*/
  success() {
    this.setData({
      success: !this.data.success
    })
  },
  /*错误弹窗弹出*/
  wrong(){
    this.setData({
      wrong: !this.data.wrong
    })
  },
  /*完善信息弹窗弹出*/
  complete() {
    var that = this;
    that.setData({
      complete: !this.data.complete
    })
  },
  /*检查完善信息弹窗内容*/
  checkComplete(){
    var that = this;
    if (that.data.name == '') {
      wx.showToast({
        title: '请输入姓名',
        icon: "none"
      })
    } else if (that.data.phoneNumber == '') {
      wx.showToast({
        title: '请输入手机号码',
        icon: "none"
      })
    } else {
      var reg = /^(130|131|132|133|134|135|136|137|138|139|150|153|157|158|159|180|187|170|177|188|189)\d{8}$/;
      if (!reg.test(that.data.phoneNumber)) {
        wx.showToast({
          title: '手机号码格式错误，请重输',
          icon: "none"
        })
      } else {
        http.banding({
          data: {
            name: that.data.name,
            phone: that.data.phoneNumber,
            openId:that.data.openId,
          },
          success(res){
            if(res.message=='用户不存在'){
              that.wrong();
            }else{
              wx.showToast({
                title: res.message,
                icon:'none'
              })
            }
          },
          fail(){
            that.wrong();
          }
        })
        that.complete();
      }
    }
  },
  /*点击再次输入*/
  reInput(){
    this.wrong();
    this.complete();
  },
  /*填写会议主题*/
  inputTheme(e){
    var that = this;
    that.setData({
      theme:e.detail.value
    })
  },
  scrollDown(){

    // console.log('aaaaa')
    // var animation = wx.createAnimation({
    //   duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
    //   timingFunction: 'ease',//动画的效果 默认值是linear
    // })
    // this.animation = animation
    // this.animation.translateY(-112).step()
    // this.setData({
    //   animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    // })
  },
  /*退出*/
  exit(){
    wx.switchTab({
      url:'/pages/index/index'
    })
  },
  /*填写使用人*/
  inputUserName(e){
    var that = this;
    that.setData({
      userName: e.detail.value
    })
  },
  /*填写完善信息的姓名*/
  nameIpt(e){
    var that = this;
    that.setData({
      name: e.detail.value
    })
  },
  /*填写完善信息的手机*/
  phoneIpt(e){
    var that = this;
    that.setData({
      phoneNumber: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /*今天向后推十天的日期显示*/
  getDay(year,month,day,week){
    var that = this;
    var weekend; 
    for (var i = 0; i < 10; i++) {
      console.log(month)
      switch (week) {
        case 7:
          weekend = "日";
          break;
        case 1:
          weekend = "一";
          break;
        case 2:
          weekend = "二";
          break;
        case 3:
          weekend = "三";
          break;
        case 4:
          weekend = "四";
          break;
        case 5:
          weekend = "五";
          break;
        case 6:
          weekend = "六";
      } 
      that.data.dayList.push({ year: year, date: month, time: day, week: weekend});
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 ) {
          if((day+1)==32){
            day = 1;
            month = month+1;
          } else {
            day = day + 1;
          }
      } else if (month == 4 || month == 6 || month == 9 || month==11){
          
          if ((day + 1) == 31) {
            day = 1;
            month = month + 1;
          }else{
            day = day+1;
          }
        } else if(month==2){
          if ((year % 4 == 0) && (year % 100 != 0) && (year % 400 == 0)) {
            if ((day + 1) == 30) {
              day = 1;
              month = month + 1;
            } else {
              day = day + 1;
            }
          }else{
            if ((day + 1) == 29) {
              day = 1;
              month = month + 1;
            } else {
              day = day + 1;
            }
          }
        }else if(month==12){
          if ((day + 1) == 32) {
            day = 1;
            month = 1;
            year = year+1;
          } else {
            day = day + 1;
          }
        }else{
          
        }
      if (week == 7) {
        week = 1;
      } else {
        week = week + 1;
      }
    }
    that.setData({
      dayList: that.data.dayList
    })
  },
  /*打电话*/
  makePhone(){
    wx.makePhoneCall({
      phoneNumber: '021-21343523'
    })
  },
  /*点击日期进行切换*/
  chooseDate(e){
    var that = this;
    that.setData({
      time_period: [],
      time_period_number: []
    })
    var year = e.currentTarget.dataset.year;
    var month = e.currentTarget.dataset.month;
    var day = e.currentTarget.dataset.day;
    that.getTimeList(year,month,day);
    that.getOrderList(year, month, day)
    that.setData({
      dateActive: e.currentTarget.dataset.index,
      orderDate: year + '-' + month + '-' + day
    })
  },
  /*预约*/
  confirm(){
    var that = this;
    if (that.data.theme==''){
      wx.showToast({
        title: '请输入会议主题',
        icon:'none'
      })
    } else if (that.data.userName==""){
      wx.showToast({
        title: '请输入使用人',
        icon: 'none'
      })
    }else{
      if (that.data.time_period.length==0){
        wx.showToast({
          title: '请选择时间段',
          icon:'none'
        })
      }else{
        var timesIds = '';
        for (var i = 0; i < that.data.time_period.length;i++){
          timesIds = timesIds + that.data.time_period[i]+(',');
        }
        http.order({
          data:{
            orderDate: that.data.orderDate,
            timesIds: timesIds,
            roomId: that.data.roomId,
            userId:that.data.userId,
            userName: that.data.userName
          },
          success(res){
            if (res.message=='预约成功'){
              wx.showToast({
                title: res.message,
                icon:'none'
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }, 1000)
            }
          },fail(){

          }
        })
      }
    }
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