Page({
    data:{
        title: "组建测试",
        decs : "随着微信小程序的推出，将在业内掀起新的一轮的技术革命，为了能跟上时代的脚步，开始研究其组件的应用。",
        components:[
            {
                id: "viewId",
                title:"试图容器",
                iconPath: "",
                isopen:false,
                data:["view", "scroll-view", "swiper"]
            },
            {
                id: "baseId",
                title:"基础内容",
                iconPath: "",
                isopen:false,
                data:["icon", "text", "progress"]
            },
            {
                id: "formId",
                title:"表单组件",
                iconPath: "",
                isopen:false,
                data:["button", "checkout", "form", "input", "label", "picker", "radio", "slider", "switch"]
            },
            {
                id: "optionsId",
                title:"操作反馈",
                iconPath: "",
                isopen:false,
                data:["action-sheet", "modal", "toast", "loading"]
            },
            {
                id: "navigater",
                title:"导航",
                iconPath: "",
                isopen:false,
                data:["navigater"]
            },
            {
                id: "medai",
                title:"媒体组件",
                iconPath: "",
                isopen:false,
                data:["audio", "image", "video"]
            },
            {
                id: "mapId",
                title:"地图",
                iconPath: "",
                isopen:false,
                data:["map"] 
            },
            {
                id: "canvesId",
                title:"画布",
                iconPath: "",
                isopen:false,
                data:["canves"]
            }
        ]
    },
    // 控制下拉列表
    widgetsToggle: function(e){
        var id = e.currentTarget.id
        var list = this.data.components
        for(var i = 0; i < list.length; i++) {
            if (id === list[i].id) {
                list[i].isopen = !list[i].isopen
            } else {
                list[i].isopen = false
            } 
        }
        this.setData({
            components: list
        })
    },
    // 打开新的页面
    openPage: function(e){
        var componentName = e.currentTarget.dataset.type
        if(componentName === undefined){
            console.log(' e.target.dataset.type = ', e)
        }
        wx.navigateTo({
            url: `/pages/component/${componentName}/${componentName}`,
            success: function(){
                console.log('调取页面成功')
            },
            fail: function(){
                console.log('接口调用失败的回调函数')
            }
        })
    }

})