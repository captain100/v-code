Page({
    data: {
        nowDate: new Date().toString()
    },

    onLoad: function(query) {
        console.log(11111, query)
        this.timer()
    },
    timer: function() {
        console.log(222)
        setInterval(() => {
            this.setData({
                nowDate: new Date().toString()
            })
        }, 1000)
    },

    onShareAppMessage: function() {
        return {
            title: '自定义分享标题',
            desc: '自定义分享描述',
            path: '/pages/share/share?id=test'
        }
    } 
})