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
  data: {
    showDialog: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
     toggleDialog() {
       this.setData({
         showDialog: this.properties.flow
       });
     },
  },
  ready: function () {
    console.log("liuliu组件中的数据:", this.data)
  }
})