// app.ts
import {IAppOption} from "./appoption";

App<IAppOption>({
    globalData: {},
    onLaunch() {
        wx.request({
            url: 'http://localhost:8080/trip/trip123',
            method: 'GET',

        })
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        // @ts-ignore

        // 登录
        wx.login({
            success: res => {
                console.log(res.code)
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            },
        })
    },

})