var prePonit = {}
Page({
    data: {
        text: "一等奖",
        isTouch: false
    },
    onLoad: function() {
        this.init()
    },
    touchMove: function(e) {
        const { isTouch } = this.data
        if (e.touches.length == 1) {
            let op_x = e.touches[0].x
            let op_y = e.touches[0].y
            if (isTouch &&  (Math.abs(op_x - prePonit.x) >= 15 || Math.abs(op_y - prePonit.y) >= 15)) {
                prePonit= e.touches[0]
                this.lottery(op_x, op_y)
            }
        }
    },
    touchStart: function(e) {
        this.setData({
            isTouch: true
        })
        if (e.touches.length == 1) {
            prePonit = e.touches[0]
        }
    },
    touchEnd: function (e) {
         const { isTouch } = this.data
        if (isTouch) {
            this.setData({
                isTouch: false
            })
        }
    },

    init: function() {
        this.ctx = wx.createCanvasContext('myCanvas')
        this.ctx.setFillStyle('#cccccc')
        this.ctx.fillRect(0, 0, 280, 140)
        this.ctx.draw()
    },
    lottery: function(x, y) {
        this.ctx.clearRect(x, y, 30, 30)
        this.ctx.draw(true)
    }





})
