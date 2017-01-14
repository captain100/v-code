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
  },
  onReady() {
    // 使用 wx.createAudioContext 获取 audio 上下文 context
    this.audioCtx = wx.createAudioContext('myAudio')
    // this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46')
    this.audioCtx.play()
  }


})