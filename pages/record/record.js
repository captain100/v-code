Page({
  data:{
    tempFilePath:null
  },
  startRecord: function () {
    var self = this
    console.log('开始录音')
    wx.startRecord({
      success: function (res) {
        console.log('success', res)
        var tempFilePath = res.tempFilePath
        console.log(222, tempFilePath)
        self.setData({
          tempFilePath
        })
        console.log(111)
      },
      fail(err) {
        console.log('err', err)
      }
    })
    setTimeout(function() {
      //结束录音  
      wx.stopRecord()
    }, 10000)
  },
  stopRecord() {
    wx.stopRecord()
  },
  playVoice() {
    const { tempFilePath } = this.data
    if(tempFilePath) {
      wx.playVoice({
        filePath: tempFilePath,
        success(res) {
          console.log('play success')
        },
        fail(err) {
          console.log(' play error')
        }
      })
    }
  },
  pauseVoice() {
    wx.pauseVoice()
  },
  stopVoice() {
    wx.stopVoice()
  }


})