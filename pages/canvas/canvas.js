Page({
    data: {


    },
    onReady() {
        var context = wx.createContext()
        context.beginPath()
        context.rect(0, 0, 200, 200)
        // context.scale(0.5,0.5)
        // context.setStrokeStyle("#00ff00")
        // context.stroke()
        // context.closePath()

        // context.clearActions()
        // context.scale(3,6)
        // context.rect(10,10,300,300)
        // context.stroke()
        // context.setStrokeStyle("#ff0000")
        // context.setLineWidth(2)
        // context.moveTo(160, 100)
        // context.arc(100, 100, 60, 0, 2 * Math.PI, true)
        // context.moveTo(140, 100)
        // context.arc(100, 100, 40, 0, Math.PI, false)
        // context.moveTo(85, 80)
        // context.arc(80, 80, 5, 0, 2 * Math.PI, true)
        // context.moveTo(125, 80)
        // context.arc(120, 80, 5, 0, 2 * Math.PI, true)
        // context.stroke()

        // context.beginPath()
        // context.moveTo(100,100)
        // context.lineTo(5,8)
        // context.lineTo(100,200)
        // context.lineTo(200,300)
        // context.lineTo(100,200)
        // context.lineTo(110, 50)
        // context.lineTo(120,300)
        // context.lineTo(130,30)
        // context.lineTo(140,600)
        // context.lineTo(150,1000)


        // context.setLineWidth(1)
        // context.scale(0.5,.5)
        // context.setStrokeStyle("#00ff00")
        // context.stroke()

        // context.closePath()


        for(var i = 0 ; i < 100 ; i++) {
            var l = i * 5
            context.beginPath()
            if (l > 200 && l < 400) {
                context.rect(400 - l, l, 40, 40)
            }
            context.rect(l, l, 40, 40)
            context.setLineWidth(1)
            context.setFillStyle('rgba(105,0,0,'+ i / 100 +')')
            context.fill()
            // context.stroke()
            context.closePath()
        }



        // 在context上调用方法
        wx.drawCanvas({
            canvasId:'canvas_id',
            actions: context.getActions()
        })

    }

})