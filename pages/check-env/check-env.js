// (function(){
//             console.log('-------------')
//             console.log(navigator)
//             var node = document.documentElement
//             var cssType = node.style
//             var _html = ''
//             for(var key in cssType){
//                 _html += '<p>' + key + '</p>'
//             }
//             console.log(Object.keys(cssType).length)

//             var div = document.createElement('div')
//             document.body.appendChild(div)
//             div.innerHTML = Object.keys(cssType).join(', ') + '   ' + Object.keys(cssType).length
//         })();

Page({ 
    onLoad() {
        console.log('---------')
        wx.getUserInfo({
          success: function(res) {
            var userInfo = res.userInfo
            var nickName = userInfo.nickName
            var avatarUrl = userInfo.avatarUrl
            var gender = userInfo.gender //性别 0：未知、1：男、2：女 
            var province = userInfo.province
            var city = userInfo.city
            var country = userInfo.country
            console.log(userInfo)
          }
        })
        wx.getSystemInfoSync({
             success: function(res) {
                console.log(res.model)
                console.log(res.pixelRatio)
                console.log(res.windowWidth)
                console.log(res.windowHeight)
                console.log(res.language)
                console.log(res.version)
              }
        })
    }
})