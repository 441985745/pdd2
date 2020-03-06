const app = getApp();
Page({
    data: {
        //判断小程序的API，回调，参数，组件等是否在当前版本可用。
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    onLoad: function () {
        var that = this;
        //如果缓存中有openid,说明登录过,授权过
        if(wx.getStorageSync('openId')){
            console.log(wx.getStorageSync('openId'))
            //从数据库查出用户信息并放入全局变量中
            that.queryUsreInfo();
            wx.switchTab({
                url: '/pages/index/index'
            })
        }
        var that = this;
         // 登录
         //首次登录时,将code传入后台,获取openid,并且在授权后放入缓存中
        wx.login({
            success: res => {
            console.log("授权页面里的登录参数:")
            console.log(res)
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            
            app.globalData.openid="test"
            console.log(app.globalData.openid)
            }
        })
        
    },
    bindGetUserInfo: function (e) {
        if (e.detail.userInfo) {
            //用户按了允许授权按钮
            var that = this;
            //插入登录的用户的相关信息到数据库
            wx.setStorageSync('openId',app.globalData.openid)
            wx.request({
                url: app.globalData.urlPath + 'user/add',
                data: {
                    openid: getApp().globalData.openid,
                    nickName: e.detail.userInfo.nickName,
                    avatarUrl: e.detail.userInfo.avatarUrl,
                    province:e.detail.userInfo.province,
                    city: e.detail.userInfo.city
                },
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                
                    //将openid放入缓存中
                    //wx.setStorageSync('openId',app.globalData.openid)
                    //从数据库获取用户信息
                    that.queryUsreInfo();
                    console.log("插入小程序登录用户信息成功！");
                }
            });
            //授权成功后，跳转进入小程序首页
            wx.switchTab({
                url: '/pages/index/index'  
            })
        } else {
            //用户按了拒绝按钮
            wx.showModal({
                title:'警告',
                content:'您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
                showCancel:false,
                confirmText:'返回授权',
                success:function(res){
                    if (res.confirm) {
                        console.log('用户点击了“返回授权”')
                    } 
                }
            })
        }
    },
    //获取用户信息接口
    queryUsreInfo: function () {
        wx.request({
            url: app.globalData.urlPath + 'user/userInfo',
            data: {
                openid: wx.getStorageSync('openId')
            },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                console.log(res.data);
                getApp().globalData.userInfo = res.data;
            }
        })
    },

})