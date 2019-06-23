// pages/order/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    width:'',
    height:'',
    bottom:'',
    status:'',
    dayList:[],
    index:0,
    indexs:'',
    styleList:[],
    arr:[
      { status: 0, time: '8:00~8:30', id: '1', start: '8:00', end:'8:30',isSelect:0},
      { status: 1, time: '8:30~9:00', id: '2', isSelect: 0},
      { status: 0, time: '9:00~9:30', id: '3', isSelect: 0},
      { status: 0, time: '9:30~10:00', id: '4', isSelect: 0},
      { status: 0, time: '10:00~10:30', id: '5', isSelect: 0},
      { status: 1, time: '11:30~12:00', id: '6', isSelect: 0},
      { status: 0, time: '12:00~12:30', id: '7', isSelect: 0},
      { status: 0, time: '13:00~13:30', id: '8', isSelect: 0},
      { status: 1, time: '13:30~14:00', id: '9', isSelect: 0},
      { status: 0, time: '8:00~8:30', id: '10', isSelect: 0},
      { status: 1, time: '8:30~9:00', id: '11', isSelect: 0},
      { status: 0, time: '8:00~8:30', id: '12', isSelect: 0},
      { status: 1, time: '8:30~9:00', id: '13', isSelect: 0},
      { status: 0, time: '8:00~8:30', id: '14', isSelect: 0},
      { status: 1, time: '8:30~9:00', id: '15', isSelect: 0},
      { status: 1, time: '13:30~9:00', id: '16', isSelect: 0},
    ],
    time_period:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDay();
  },
  choose(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    var per = that.data.time_period;/*选中时间段的集合*/
      if (per.length == 0) {/*第一次点击 加入选中集合，样式改变*/
        per.push(e.currentTarget.dataset.index);
        that.data.arr[index].isSelect = 1;
      } else {/*第二次点击*/
        if (per[per.length - 1] - Number(e.currentTarget.dataset.index) == 1 || per[per.length - 1] - Number(e.currentTarget.dataset.index) == -1) {/*第多次点击且连续*/
          per.push(e.currentTarget.dataset.index);/*加入选中集合*/
          that.data.arr[index].isSelect = 1;/*样式改变*/
        } else {/*第多次点击但不连续*/
          for (var i = 0; i < that.data.arr.length; i++) {
            that.data.arr[i].isSelect = 0;
          }/*把所有的样式清空*/
          that.data.arr[index].isSelect = 1;/*当前样式改变*/
          wx.showToast({
            title: '多选时段请连续～',
            icon: 'none'
          })
          per = [];/*清空选中时间段的集合*/
          per.push(e.currentTarget.dataset.index)/*把当中选中时间段加入集合*/
        }
      }
    that.setData({
      time_period:per,
      arr:that.data.arr,
      indexs: e.currentTarget.dataset.id
    })
  },
  submit(){
    console.log('aa')
  },
  click() {
    var showTwo = this.selectComponent('#bots');
    showTwo.showModal()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  change(e){
    // console.log(e.detail.value)
  },
  getDay(){
    var that = this;
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    console.log(month)
    for (var i = 0; i < 10; i++) {
      console.log(month)
      console.log(day)
      if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 ) {
          if((day+1)==32){
            day = 1;
            month = month+1;
          } else {
            day = day + 1;
          }
      } else if (month == 4 || month == 6 || month == 9 || month==11){
          console.log('aaa')
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
      that.data.dayList.push({date:month,time:day});
    }
    that.setData({
      dayList: that.data.dayList
    })
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