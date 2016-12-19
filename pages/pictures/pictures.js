var FIXWIDTH = 180;

Page({
    data:{
        leftLayout:{
            height: 0,
            data:[]
        },
        rightLayout:{
            height: 0,
            data:[]
        }
    },
    onLoad: function() {
        // var arr = []
        // for(var i = 0 ; i < 15; i+=1) {
        //     var random = Math.floor(Math.random() * 10)
        //     var url = `/public/images/${ random === 0 ? 2 : random}.jpg`
        //     var obj = {
        //         url,
        //         unique: i,
        //         imgname: random === 0 ? 2 : random,
        //         width: 0,
        //         height: 0,
        //         scale_width: 0,
        //         scale_height: 0
        //     }
        //     arr.push(obj)    
        // }
        // this.setData({
        //     pic_list: arr
        // })
        this.fetchData()

    },
    // loadImg: function(e) {
    //     var { width, height } = e.detail
    //     var { id: index } = e.target.dataset
    //     var {pic_list} = this.data
    //     pic_list[index].width = width
    //     pic_list[index].height = height
    //     pic_list[index].scale_width = FIXWIDTH
    //     pic_list[index].scale_height = Math.floor(height / width * FIXWIDTH)
    //     this.setData({
    //         pic_list
    //     })
    // },
    fetchData: function() {
        var arr = []
        for(var i = 0 ; i < 15; i+=1) {
            var random = Math.floor(Math.random() * 10)
            var url = `/public/images/${ random === 0 ? 2 : random}.jpg`
            var obj = {
                url,
                unique: i,
                imgname: random === 0 ? 2 : random,
                width: 0,
                height: 0,
                scale_width: 0,
                scale_height: 0
            }
            arr.push(obj)    
        }
        // 生成promise
        arr = arr.map((item) => {
            return new Promise((resolve, reject) => {
                return wx.getImageInfo({
                    src: item.url,
                    success: function(obj){
                        item.width = obj.width
                        item.height = obj.height
                        item.scale_width = FIXWIDTH
                        item.scale_height = Math.floor(item.height / item.width * FIXWIDTH) 
                        return resolve(item)
                    },
                    fail: function(err) {
                        console.log('error ',err)
                        return reject(err)
                    }
                })
            })
        })

        Promise.all(arr).then(result => {
            let {leftLayout, rightLayout} = this.data
            for (var i = 0; i < result.length; i++){
                if(leftLayout.height <= rightLayout.height) {
                    leftLayout.data.push(result[i])
                    leftLayout.height += result[i].scale_height
                } else {
                    rightLayout.data.push(result[i])
                    rightLayout.height += result[i].scale_height
                }
            }

            this.setData({
                leftLayout,
                rightLayout
            })
        })   
    }
})