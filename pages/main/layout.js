Page({
    data:{
        myView: '',
        title: '这是一个测试',
        content: '你知道吗我好想你',
        markdown: ''
    },
    onLoad: function () {
        wx.request({
            url:'https://cnodejs.org/api/v1/topics',
            data: {
                page: 1,
                tab: 'share',
                limit: 20,
                mdrender: false
            },
            method: 'GET',
            success:function(result){
                console.log(result)
            },
            fail: function(result){
                console.log(result)
            },
            complete: function(result){
                console.log(result)
            }
        })
    }
})