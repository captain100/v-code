Page({
    data: {
        showPicUrls:[]
    },
    uploadfile: function(){ 
        var self = this
        wx.chooseImage({
            count: 9,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function(res) {
                console.log('uploadfile', res)
                var tempFilePaths = res.tempFilePaths
                // console.log(tempFilePaths)
                // self.setData({
                //     showPicUrls: tempFilePaths
                // })
                // self.getImageInfo(tempFilePaths)


                wx.uploadFile({
                    url: 'http://10.10.8.23:3333',
                    filePath: tempFilePaths[0],
                    // header: {
                    //     'Content-Type': 'multipart/form-data'
                    // },
                    name: 'uploadFile[]',
                    success: res => {
                        console.log('success', res)
                    },
                    fail: err => {
                        console.log('error', err)
                    },
                    complete: info => {
                        console.log(info)
                    }
                })

            }
        })
    },
    // 获取图片信息
    getImageInfo: function(tmp){
        wx.getImageInfo({
            src: tmp[0],
            success: function(res){
                console.log(res)
            }
        })
    },
    // 预览图片
    previewImages: function(event) {
        var self = this
        console.log(event)
        const { showPicUrls } = self.data
        const { url } = event.currentTarget.dataset
        console.log(url)
        console.log(showPicUrls)
        wx.previewImage({
            current: url,
            urls: showPicUrls
        })
    }   

})