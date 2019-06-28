// pages/order/index.js
const app = getApp();
import http from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    systemInfo:{},
    url: app.globalData.url,
    name:'',
    phoneNumbers: app.globalData.phoneNumber,
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
    timePeriod:[],
    openId: app.globalData.openId,
    changeStatusThemeIpt:true,
    changeStatusUserIpt:true,
    theTheme:'请添加会议主题',
    theUser:'请添加使用人',
    bfcolorTheme:true,
    bfcolorUser: true,
    // animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var now = new Date();
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          systemInfo: res
        })
      }
    })
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
      month_choose: month,
      day_choose:day,
      orderDate: year + '-' + month_td + '-' + day_td
    })
    this.getDay(year,month,day,week);
    this.getTimeList(year,month,day);
    this.login();
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
  var now = new Date();
  var year_s = now.getFullYear();
  var month_s = now.getMonth() + 1;
  var day_s = now.getDate();
  if (month_s < 10) {
    month_s = "0" + month_s;
  }
  if (day_s < 10) {
    day_s = "0" + day_s;
  }
    http.orderList({
      data:{
        orderDate: orderDate,
        roomId: that.data.roomId
      },
      success(res){
        that.setData({
          orderList: res.data
        })
        for (var n = 0; n < that.data.timesList.length; n++) {
          var timestamp1 = new Date().getTime();
          if (year == year_s && month == month_s && day == day_s) {  /*如果是当前日期则判断过时*/
            
            if (that.data.systemInfo.platform == "ios") {
              var q = that.data.year + '/' + month_s + '/' + day_s + ' ' + that.data.timesList[n].timestamp;
            } else {
              var q = that.data.year + '-' + month_s + '-' + day_s + ' ' + that.data.timesList[n].timestamp;
            }
            var timestamp2 = new Date(q).getTime();
            if ((timestamp1 - timestamp2) > 0) {
              that.data.timesList[n].canSelect = false;
            }
          }
        }
        that.setData({
          timesList: that.data.timesList
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
    
    var per = that.data.time_period_number;/*选中时间段的集合*/
      if (per.length == 0) {/*第一次点击 加入选中集合，样式改变*/
        per.push(e.currentTarget.dataset.index);
        // that.data.timePeriod.push(e.currentTarget.dataset.period);
        that.data.time_period.push(e.currentTarget.dataset.timesid);
        that.data.timesList[index].isSelect = 1;
      } 
      /*// else if(per.length==1){
      //   that.data.timesList[index].isSelect = 0;
      //   per.pop(e.currentTarget.dataset.index);
      //   that.data.time_period.pop(e.currentTarget.dataset.timesid);
      // }*/
      else {/*第多次点击*/
        if (per.indexOf(e.currentTarget.dataset.index)>-1){/*点击已点*/
          if (e.currentTarget.dataset.index == per[0] ) { /*如果点击的是第一个数据，取消*/
            console.log(e.currentTarget.dataset.index)
            that.data.timesList[index].isSelect = 0;
            per.splice(0,1);
            that.data.time_period.splice(0,1);
          } else if (e.currentTarget.dataset.index == per[per.length - 1]) {/*如果点击的是最后一个数据，取消*/
            that.data.timesList[index].isSelect = 0;
            per.splice(per.length-1,1);
            that.data.time_period.splice(that.data.time_period.length-1);
          } 
          else {/*点的是已点且非两头数据*/

          }
        }else{/*点击未点*/
          if (per[per.length - 1] - Number(e.currentTarget.dataset.index) == 1 || per[per.length - 1] - Number(e.currentTarget.dataset.index) == -1){/*点击的是连续的*/
            that.data.timesList[e.currentTarget.dataset.index].isSelect = 1;
             per.push(e.currentTarget.dataset.index);
             that.data.time_period.push(e.currentTarget.dataset.timesid);
          }else{/*点击的是不连续的*/
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
          // if (per[per.length - 1] - Number(e.currentTarget.dataset.index) == 1 || per[per.length - 1] - Number(e.currentTarget.dataset.index) == -1) {/*点击新时间段*/
          // }
          //  else if (e.currentTarget.dataset.index == per[0] || e.currentTarget.dataset.index == per[per.length - 1]) {

          //    that.data.timesList[index].isSelect = 0;
          //    per.pop(e.currentTarget.dataset.index);
          //    that.data.time_period.pop(e.currentTarget.dataset.timesid);
          //  }
          // else if (per.indexOf(Number(e.currentTarget.dataset.index))>-1){/*当前点击的时间段如果是刚刚已点过的*/
          // console.log('aaa')
          //   for (var i = 0; i < per.length; i++) {
          //     that.data.timesList[i].isSelect = 0;/*样式改变 未被选中*/
          //   }
          //   per = [];
          //   that.data.time_period = [];
          // }
          // else {/*第多次点击但不连续*/
          //   for (var i = 0; i < that.data.timesList.length; i++) {
          //     that.data.timesList[i].isSelect = 0;
          //   }/*把所有的样式清空*/
          //   that.data.timesList[index].isSelect = 1;/*当前样式改变*/
          //   wx.showToast({
          //     title: '多选时段请连续～',
          //     icon: 'none'
          //   })
          //   per = [];/*清空选中时间段的集合*/
          //   that.data.time_period = [];
          //   per.push(e.currentTarget.dataset.index)/*把当中选中时间段加入集合*/
          //   that.data.time_period.push(e.currentTarget.dataset.timesid);
          // }
        }
      }
      console.log(per)
    console.log(that.data.time_period)
    that.setData({
      time_period_number:per,
      time_period: that.data.time_period,
      timesList: that.data.timesList,
    })
  },
  changeStatusTheme(){
    var that = this;
    that.setData({
      changeStatusThemeIpt: !that.data.changeStatusThemeIpt
    })
  },
  changeStatusThemeBlur(){
    var that = this;
    if (that.data.theme==''){
      that.setData({
        changeStatusThemeIpt: !that.data.changeStatusThemeIpt,
        theTheme: '请添加会议主题',
        bfcolorTheme:true
      })
    }else{

      that.setData({
        changeStatusThemeIpt: !that.data.changeStatusThemeIpt,
        theTheme: that.data.theme,
        bfcolorTheme: false
      })
    }
  },
  changeStatusUserBlur(){
    var that = this;
    if (that.data.userName == '') {
      that.setData({
        changeStatusUserIpt: !that.data.changeStatusUserIpt,
        theUser: '请添加使用人',
        bfcolorUser:true
      })
    } else {
      that.setData({
        changeStatusUserIpt: !that.data.changeStatusUserIpt,
        theUser: that.data.userName,
        bfcolorUser: false
      })
    }
  },
  changeStatusUser(){
    var that = this;
    that.setData({
      changeStatusUserIpt: !that.data.changeStatusUserIpt
    })
  },
  /*登陆*/
  login() {
    var that = this;
    http.login({
      data: {
        openId: app.globalData.openId
      },
      success(res) {
        if (res.message == '登录失败') {
          that.complete();
        } else {
          that.setData({
            userId: res.data[0].userId
          })
        }

      }, fail() {

      }
    })
  },
  /*预约成功弹窗弹出*/
  success() {
    this.setData({
      success: !this.data.success
    })
  },
  success_ok(){
    wx.switchTab({
      url: '/pages/index/index',
    })
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
      var reg = /^\d{11}$/;
      if (!reg.test(that.data.phoneNumber)) {
        wx.showToast({
          title: '手机号码格式错误，请重输',
          icon: "none"
        })
      } else {
        var that = this;
        http.banding({
          data: {
            name: that.data.name,
            phone: that.data.phoneNumber,
            openId: app.globalData.openId,
          },
          success(res) {
            if (res.message == '用户不存在') {
              that.wrong();
            } else {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
              http.login({
                data: {
                  openId: app.globalData.openId
                },
                success(res) {
                  if (res.message == '登录失败') {
                   
                  } else {
                    that.setData({
                      userId: res.data[0].userId
                    })
                  }

                }, fail() {

                }
              })
            }
          },
          fail() {
            that.wrong();
          }
        })
        // setTimeout(function({
        //   http.banding({
        //     data: {
        //       name: that.data.name,
        //       phone: that.data.phoneNumber,
        //       openId: app.globalData.openId,
        //     },
        //     success(res) {
        //       if (res.message == '用户不存在') {
        //         that.wrong();
        //       } else {
        //         wx.showToast({
        //           title: res.message,
        //           icon: 'none'
        //         })
        //       }
        //     },
        //     fail() {
        //       that.wrong();
        //     }
        //   },100)
        // })
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
    // this.animation.translateY(-56).step()
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
    var that = this;
    wx.makePhoneCall({
      phoneNumber: that.data.phoneNumbers
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
    // that.getOrderList(year, month, day)
    that.setData({
      dateActive: e.currentTarget.dataset.index,
      orderDate: year + '-' + month + '-' + day,
      month_choose:month,
      day_choose:day
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
          that.data.time_period = that.data.time_period.sort();
          that.data.time_period_number = that.data.time_period_number.sort();
          if (i == that.data.time_period.length-1){
            timesIds = timesIds + that.data.time_period[i];
          }else{
            timesIds = timesIds + that.data.time_period[i] + (',');
          }
          that.data.timePeriod.push(that.data.timesList[that.data.time_period_number[i]]);
        }
        that.setData({
          timePeriod: that.data.timePeriod
        })
        http.toOrder({
          data:{
            orderDate: that.data.orderDate,
            timesIds: timesIds,
            roomId: that.data.roomId,
            userId:that.data.userId,
            userName: that.data.userName
          },
          success(res){
            if (res.message=='预约成功'){
              that.success();
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