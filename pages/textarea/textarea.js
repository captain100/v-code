Page({
  data: {
    height: 20,
    focus: false,
    content: ''
  },
  bindButtonTap: function() {
    this.setData({
      focus: true
    })
  },
  bindTextAreaBlur: function(e) {
    console.log(e.detail.value)
  },
  // 输入
  changeContent: function(e) {
    console.log(e)
    const { value : content } = e.detail
    console.log(content)
  } 
})