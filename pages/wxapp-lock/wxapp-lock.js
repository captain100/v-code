var wxlocker = require('../../utils/wxlock.js')

Page({
    data: {
        resetHidden: false,
        title: '请设置手势密码',
        titleColor: ""
    },
    onLoad: function(options){
        wxlocker.lock.init()
        this.initState()
    },
    initState: function () {
        var resetHidden = wxlocker.lock.resetHidden
        var title = wxlocker.lock.title
        var titleColor = wxlocker.lock.titleColor
        this.setData({
            resetHidden,
            title,
            titleColor
        })
    },
    touchS: function (e) {
        wxlocker.lock.bindtouchstart(e)
    },
    touchM: function (e) {
        wxlocker.lock.bindtouchmove(e)
    },
    touchE: function (e){
        wxlocker.lock.bindtouchend(e, this.lockSucc)
        this.initState()
    },
    lockSucc: function () {
        console.log('解锁成功！！！')
    },
    lockreset: function() {
        console.log('重置密码')
        wxlocker.lock.updatePassword()
        this.initState()
    }
})