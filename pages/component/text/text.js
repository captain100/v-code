var key = '0c15aa399a5d6d8a0d569df7fdd925f7'
var domId = ''
Page({
    data: {
        list: [],
        page: 1,
        index: 1,
        styleCss:''
    },
    onLoad(){
        const {page, list} = this.data
        this.requestFun(page, list)
    },
    requestFun(page, list){
        var that = this
        // 请求数据
        wx.request({
            url:'http://japi.juhe.cn/joke/content/list.from',
            data: {
                page,
                key,
                pageSize:1,
                sort:'desc',
                time: Date.now().toString().substr(0,10)
            },
            success(e){
                console.log(e)
                that.setData({
                    list: e.data.result.data
                })
            }
        })
    },
    touchstart(e) {
        console.log('开始 ：', e)
        domId = e.currentTarget.Id
        
    },
    touchmove(e) {
        // console.log('移动 ：', e)
        const touch = e.touches[0]
        const touchX = touch.clientX
        const touchY = touch.clientY
        var styleCss = `position: absolute; top: ${touchX}px; left:${touchY}px;z-index:2;`
        console.log('移动 ：', styleCss)
        this.setData({
            styleCss
        })

    },
    touchend(e) {
        console.log('结束 ：', e)
    }


})