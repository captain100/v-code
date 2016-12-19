Page({
    data:{
        touchPoint:'',
        index:''
    },
    onLoad:function(){
        console.log('onLoad')
    },
    touchstart: function(e) {
        this.setData({
            index:''
        })
        const { pageX, pageY } = e.touches[0]
        const { offsetLeft, offsetTop, id} = e.currentTarget
        console.log(`top: ${pageY - offsetTop - 50}px ;left: ${pageX - offsetLeft - 50}px;`)
        this.setData({
            touchPoint: `top: ${pageY - offsetTop - 50}px ;left: ${pageX - offsetLeft - 50}px;`,
            index: id
        })
    },
    onPullDownRefresh: function(){
        console.log('下拉刷新')
        this.onLoad()
    }
    
})  