Page({
    data: {
        precent:0
    },
    onReady:function(){
        this.complish()
    },
    complish:function(x){
        var that = this
        var timer = setInterval(function(){
            console.log(that.data.precent)
            if(that.data.precent >= 100) {
                clearInterval(timer)
                return that.setData({
                    precent: 100
                })
            }
            that.setData({
                precent: that.data.precent + 2.5
            }) 
        }, 1000)   
    }

})