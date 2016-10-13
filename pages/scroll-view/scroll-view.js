Page({
    data: {
        loading: false,
        list:[],
        tab:'all',
        page:1,
        isFixed: false
    },
    onLoad: function() {
        const { page, tab, list } = this.data
        this.requestFun(page, tab, list)
    },
    onReadg:function(){

    },
    // 请求数据
    requestFun(page, tab, list){
        var that = this
        wx.request({
            url: 'https://cnodejs.org/api/v1/topics',
            method: 'GET',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                page,
                tab,
                limit: 10
            },
            success: function(res) {
                var newList = res.data.data
                newList.map((item, index) => {
                    newList[index].reply_count = that.revenue(item.reply_count)
                    newList[index].visit_count = that.revenue(item.visit_count) 
                })
                that.setData({
                    page,
                    loading: true,
                    list: list.concat(newList)
                })
            },
            fail:function(err) {
                that.setData({
                    loading: true
                })
            }
        })
    },
    // 下一页的数据
    nextPge(){
        console.log('下一页的数据')
        const { page, tab, list} = this.data
        this.requestFun(page + 1, tab, list)
    },
    showPageTop(){
        console.log('据顶部展示的数据')
    },
    showPageBottom(){
        console.log('据底部展示的数据')
    },
    scrollHandle(e){
        console.log(111)
        if (e.detail.scrollTop >80){
            this.setData({
                isFixed: true
            })
        }
        if (e.detail.scrollTop <= 80){
            this.setData({
                isFixed: false
            })
        }

    },
    revenue(num){
        var str = num.toString()
        var length = str.length
        if(length <= 3) return str
        var index = length % 3
        // 将数字转换成 23,540,450的形势
        return index != 0 ? str.substr(0, index) +','+ str.substr(index).match(/\d{3}/g).join(',') : str.substr(index).match(/\d{3}/g).join(',')
    }


})