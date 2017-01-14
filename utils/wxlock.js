var wxlocker = function () {
    this.chooseType = 3
}
// 设置初始面板
wxlocker.prototype.drawCle = function(x, y){
    this.ctx.setStrokeStyle('#10aeff')
    this.ctx.setLineWidth(1)
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.r, 0, Math.PI * 2 ,true)
    this.ctx.closePath()
    this.ctx.stroke()
}
// 初始化圆心
wxlocker.prototype.drawPoint = function () {
    for(var i = 0; i < this.lastPoint.length; i++ ){
        this.ctx.setFillStyle('#10Aeff')
        this.ctx.beginPath()
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r / 2, 0, Math.PI * 2, true)
        this.ctx.closePath()
        this.ctx.fill()
    }
}


// 初始化状态线条
wxlocker.prototype.drawStatusPoint = function (type) {
    for (var i = 0; i < this.lastPoint.length; i++) {
        this.ctx.setStrokeStyle(type)
        this.ctx.beginPath()
        this.ctx.arc(this.lastPoint[i].x, this.lastPoint[i].y, this.r, 0, Math. PI * 2, true)
        this.ctx.closePath()
        this.ctx.stroke()
    }
    wx.drawCanvas({
        canvasId: "locker",
        actions: this.ctx.getActions(),
        reserve: true
    })
}

// 解锁轨迹
wxlocker.prototype.drawLine = function (po, lastPoint) {
    this.ctx.beginPath()
    this.ctx.setLineWidth(1)
    this.ctx.moveTo(this.lastPoint[0].x, this.lastPoint[0].y)
    for(var i = 1; i< this.lastPoint.length; i++) {
        this.ctx.lineTo(this.lastPoint[i].x, this.lastPoint[i].y)
    }
    this.ctx.lineTo(po.x, po.y)
    this.ctx.stroke()
    this.ctx.closePath()
}

// 创建解锁点的坐标，根据canvas的大小来平均分配半径
wxlocker.prototype.createCircle = function() {
    var canW = this.setCanvasSize().w
    var canH = this.setCanvasSize().H
    var n = this.chooseType
    var count = 0
    this.r = canW / (2 + 4 * n)
    this.lastPoint = [];
    this.arr = [];
    this.restPoint = [];
    var r  = this.r

    for(var i = 0; i < n; i++) {
        for(var j = 0; j < n ; j++) {
            count++
            var obj = {
                x: j * 4 * r + 3 * r,
                y: i * 4 * r + 3 * r,
                index: count
            }
            this.arr.push(obj)
            this.restPoint.push(obj)
        }
    }
    for (var i = 0; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y)
    }

    wx.drawCanvas({
        canvasId: 'locker',
        actions: this.ctx.getActions(),
        reserve: false
    })

}

// 获取touch点相对于canvas的坐标
wxlocker.prototype.getPostion = function (e) {
    var po = {
        x: e.touches[0].x,
        y: e.touches[0].y
    }
    return po
}

// 核心变换方法在touchmove时候调用
wxlocker.prototype.update = function (po) {
    var cavW = this.setCanvasSize().w
    var cavH = this.setCanvasSize().h
    this.ctx.clearRect(0,0,cavW,cavH)
    for (var i = 0 ; i < this.arr.length; i++) {
        this.drawCle(this.arr[i].x, this.arr[i].y)
    }
    this.drawPoint()
    this.drawLine(po, this.lastPoint)
    for (var i = 0 ; i < this.restPoint.length; i++ ) {
        if (Math.abs(po.x - this.restPoint[i].x) < this.r && Math.abs(po.y - this.restPoint[i].y) < this.r) {
            this.drawPoint()
            this.lastPoint.push(this.restPoint[i])
            this.restPoint.splice(i, 1)
            break;
        }
    }
}

// 检测密码
wxlocker.prototype.checkPass = function (pwd1, pwd2) {
    var p1 = '', p2 = '';
    for (var i = 0; i < pwd1.length; i++) {
        p1 += pwd1[i].index + pwd1[i].index
    }

    for (var i = 0; i < pwd2.length; i++) {
        p2 += pwd2[i].index + pwd2[i].index
    }
    console.log('p1 ', p1, 'p2 ', p2)
    return p1 === p2

}

// touchend结束之后对密码和状态的处理
wxlocker.prototype.storePass = function(pwd, cb) {
    if (this.pwdObj.step == 1) {
        if (this.checkPass(this.pwdObj.fpassword, pwd)) {
            this.pwdObj.step = 2
            this.pwdObj.spassword = pwd
            this.resetHidden = false
            this.title = '保存密码成功'
            this.titleColor = 'succ'
            this.drawStatusPoint('#09bb07')
            wx.setStorageSync('passwordxx', JSON.stringify(this.pwdObj.spassword))
        } else {
            this.title = "两次绘制不一致，重新绘制"
            this.titleColor = "error"
            this.drawStatusPoint('#09bb07')
            wx.getStorageSync('passwordxx', JSON.stringify(this.pwdObj.spassword))
        }
    } else if (this.pwdObj.step === 2) {
        if (this.checkPass(this.pwdObj.spassword,pwd)) {
            this.title = "成功解锁"
            this.titleColor = 'succ'
            this.drawStatusPoint('#09bb07')
            cb()
        } else {
            this.title = "解锁失败"
            this.titleColor = "error"
            this.drawStatusPoint('#e64340')
        }
    } else {
        if (this.lastPoint.length < 4) {
            this.title = "密码过于简单，请至少连接四个节点"
            this.resetHidden = true
            return false
        } else {
            this.pwdObj.step = 1
            this.pwdObj.fpassword = pwd
            this.titleColor = ""
            this.title = "再输入一次"
        }
    }
}

// 
wxlocker.prototype.makeState = function () {
    if (this.pwdObj.step == 2) {
        this.resetHidden = false
        this.title = '请解锁'
        this.titleColor = ""
    } else if (this.pwdObj.step ==1) {
        this.title = '请设置手势密码'
        this.resetHidden = true
        this.titleColor = ""
    } else {
        this.title = "请设置手势密码"
        this.resetHidden = true
        this.titleColor = ""
    }
}


wxlocker.prototype.updatePassword = function () {
    wx.removeStorageSync('passwordxx')
    this.pwdObj = {}
    this.title = "请设置手势密码"
    this.resetHidden = true
    this.titleColor = ""
    this.reset()
}

// 初始化锁盘
wxlocker.prototype.init = function () {
    this.pwdObj = wx.getStorageSync('passwordxx') ? {
        step: 2,
        spassword: JSON.parse(wx.getStorageSync('passwordxx'))
    }: {}
    this.lastPoint = []
    this.makeState()
    this.touchFlag = false
    this.ctx = wx.createContext()
    this.createCircle()

}

wxlocker.prototype.reset = function () {
    this.createCircle()
}
// 适配不同屏幕大小的canvas
wxlocker.prototype.setCanvasSize = function () {
    var size = {}
    try {
        var res = wx.getSystemInfoSync()
        var scale = 750 / 686
        var width = res.windowWidth / scale
        var height = width
        size.w = width
        size.h = height
    } catch (e) {
        console.log("获取设备信息失败" + e)
    }   
    return size
}

wxlocker.prototype.bindtouchstart = function (e) {
    if (e.touches.length == 1) {
        var self = this
        var po = self.getPostion(e)
        for (var i = 0; i< self.arr.length; i++) {
            if (Math.abs(po.x - self.arr[i].x) < self.r && Math.abs(po.y - self.arr[i].y) < self.r) {
                self.touchFlag = true
                self.drawPoint()
                self.lastPoint.push(self.arr[i])
                self.restPoint.splice(i, 1)
                break;
            }
        }
    }
    wx.drawCanvas({
        canvasId: "locker",
        actions: this.ctx.getActions(),
        reserve: true
    })
}

wxlocker.prototype.bindtouchmove = function (e) {
    if (e.touches.length == 1) {
        var self = this
        if (self.touchFlag) {
            self.update(self.getPostion(e))
        }
    }
    wx.drawCanvas({
        canvasId: 'locker',
        actions: this.ctx.getActions(),
        reserve: true
    })
}

wxlocker.prototype.bindtouchend = function (e, cb) {
    var self = this
    if (self.touchFlag) {
        self.touchFlag = false
        self.storePass(self.lastPoint, cb)
        setTimeout(function() {
            self.reset()
        }, 50)
    }
}



module.exports = {
    lock: new wxlocker()
}