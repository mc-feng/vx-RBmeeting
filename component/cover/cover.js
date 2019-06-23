// component/bottom/bottom.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    width: {
      type: String,
      value: '300rpx'
    },
    height: {
      type: String,
      value: '300rpx'
    },
    bottom: {
      type: String,
      value: '0'
    },
    status: {
      type: String,
      value: '0'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    hideModal:true,
  },
  /**
    * 启用插槽
    */
  // options: {
  //   multipleSlots: true
  // },
  /**
   * 组件的方法列表
   */
  methods: {
    onTap: function () {
      this.triggerEvent('submit', {}) // 只会触发 pageEventListener2
      // this.triggerEvent('customevent', {}, { bubbles: true }) // 会依次触发 pageEventListener2 、 pageEventListener1
      // this.triggerEvent('customevent', {}, { bubbles: true, composed: true }) // 会依次触发 pageEventListener2 、 anotherEventListener 、 pageEventListener1
    },
    showModal: function () {
      var that = this;
      that.setData({
        hideModal: false
      })
      var animation = wx.createAnimation({
        duration: 600,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      setTimeout(function () {
        that.fadeIn();//调用显示动画
      }, 200)
    },
    hideModal: function () {
      var that = this;
      var animation = wx.createAnimation({
        duration: 800,//动画的持续时间 默认400ms   数值越大，动画越慢   数值越小，动画越快
        timingFunction: 'ease',//动画的效果 默认值是linear
      })
      this.animation = animation
      that.fadeDown();//调用隐藏动画   
      setTimeout(function () {
        that.setData({
          hideModal: true
        })
      }, 720)//先执行下滑动画，再隐藏模块
    },
    fadeIn: function () {
      this.animation.translateY(-500).step()
      this.setData({
        animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
      })
    },
    fadeDown: function () {
      this.animation.translateY(500).step()
      this.setData({
        animationData: this.animation.export(),
      })
    }, 
  }
})
