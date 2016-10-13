var order = ["green", "red", "blue", "yellow", "green"];

Page({
    // 数据
    data:{
        title: '',
        toView: "red"
    },
    onLoad: function (options) {
        this.setData({
            title: 'scorll-view 应用'
        })
    },
    // 监听事件
    upper: function(e){
        console.log(e)
    },
    scroll: function(e) {
        console.log(e)
    },
    changeView: function(e){
        for(var i =0 ; i < order.length ; i++){
            if(order[i] === this.data.toView){
                console.log(this.data.toView)
                this.setData({
                    toView: order[i+1]
                })
                break;
            }
        }
    }
})