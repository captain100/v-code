Page({
    data: {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        indicatorDots:true,
        autoplay: false,
        current: 0,
        interval: 2000,
        duration: 1000,
        vertical: false
    },
    changeIndicatorDots: function(){
        this.setData({
            indicatorDots: !this.data.indicatorDots
        })
    },
    changeAutoplay: function(){
        this.setData({
            autoplay: !this.data.autoplay
        })
    },
    changeVertical: function(){
        this.setData({
            vertical: !this.data.vertical
        })
    },
    intervalChange:function(e){
        this.setData({
            interval: e.detail.value
        })
    },
    durationChange: function(e) {
        this.setData({
            duration: e.detail.value
        })
    }
    

})