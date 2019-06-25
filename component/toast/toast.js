Component({
  properties: {
    flow: {
      type:Boolean,
      value:false,
      observer: function (news, olds, path) {
        console.log(news, olds)
      }
    }
  },
  /**
   * 组件的初始数据
   */
  /**
   * 组件的方法列表
   */
  methods: {
    //  toggleDialog() {
    //    console.log(this.properties.flow)
    //    this.triggerEvent('myevent', this.properties.flow)
    //  },
  }
})