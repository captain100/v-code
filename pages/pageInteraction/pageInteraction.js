Page({
    data:{},
    onLoad(){
        this.showModal()
    },
    // 提示信息
    showinfo(){
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
        }) 
    },
    showModal(){
        wx.showModal({
            title: '提示',
            content: '这是一个模态弹窗',
            success: function(res) {
                if (res.confirm) {
                console.log('用户点击确定')
                }
            }
        })
    }
})