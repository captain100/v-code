var startX, startY, endX, endY;
var isTouchmove = true
var viewId = ''
var leftMove = []
Page({
    data:{
        windowWidth:'',
        windowHeight:'',
        list: [{
            title: '段誉',
            moblie: '186xxxx1234',
            isShow: false
        },{
            title: '元芳',
            moblie: '186xxxx3334',
            isShow: false
        },{
            title: '元芳2',
            moblie: '186xxxx3334',
            isShow: false
        },{
            title: '元芳3',
            moblie: '186xxxx3334',
            isShow: false
        },{
               
            title: '元芳4',
            moblie: '186xxxx3334',
            isShow: false
        },{    
            title: '元芳',
            moblie: '186xxxx3334',
            isShow: false
        },{ 
            title: '元芳',
            moblie: '186xxxx3334',
            isShow: false
        },{
            title: '小明',
            moblie: '186xxxx9990',
            isShow: false
        }]
    },
    onLoad(){
        var that = this   
        wx.getSystemInfo({
            success: function(res){
                const {model, pixelRatio, windowWidth, windowHeight, language, version} = res
                that.setData({
                    windowWidth,
                    windowHeight
                })
            }
        })
    },
    bindtouchstart(e){
        const {clientX, clientY} = e.touches[0]
        const id = e.currentTarget.id 
        isTouchmove = true
        viewId = id
        startX = clientX
        startY = clientY
    },
    touchmove(e){
        var that = this
        if (isTouchmove) {
            const id = e.currentTarget.id 
            const index = leftMove.indexOf(id)
            console.log('index', index)
            const {clientX, clientY} = e.touches[0]
            endX = clientX
            endY = clientY
            // 向左滑
            if(endX - startX < 0 && index == -1) {
                console.log('向左滑')
                leftMove.push(id)
                const i = id.split('-')[2]
                let list = that.data.list
                list[i].isShow = true
                this.setData({
                    list
                })
            }
            // 向右滑

            if(endX - startX > 0 && index !== -1) {
                console.log('向右滑')
                leftMove.splice(index, 1)
                const i = id.split('-')[2]
                let list = that.data.list
                list[i].isShow = false
                this.setData({
                    list
                })
            }
        }
        isTouchmove = false
        // console.log('touchmove',e)
    },
    deleteData(e){
        var index = e.currentTarget.id.split('-')[2]
        var list = this.data.list
        list.splice(index, 1)
        this.setData({
            list
        })
    }

})