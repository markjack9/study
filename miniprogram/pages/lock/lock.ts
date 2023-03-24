// pages/lock/lock.ts

import {routing} from "../../utils/routing";

Page({
    data: {
        avatarURL: '',
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        shareLocation: 0,

    },
    // 查看是否授权

    // onLoad: function() {
    //     // 查看是否授权

    // },
    onLoad(opt:Record<'car_id', string>) {

        const o: routing.LockOpts = opt
        console.log('unlocking car', o.car_id)
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            console.log('The user is authorized')
                        }
                    })
                }
            }
        })
    },
    onGetUserInfo(e: any) {
        const userinfo: WechatMiniprogram.UserInfo = e.detail.userInfo
        this.setData({
            avatarURL: userinfo.avatarUrl,
        })
    },
    onOpenlockd() {
        wx.getLocation({
            type: 'gcj02',
            success: loc => {
                console.log('starting a trip',{
                    location: {
                        latitude: loc.latitude,
                        longitude: loc.longitude,
                    },
                    avatarURL: this.data.shareLocation
                    ? this.data.avatarURL: '',
                })
            }
        })
        const tripID = 'trip456'
        wx.showLoading({
           title: '开锁中',
            mask: true,
        })
        setTimeout(()=> {
       wx.redirectTo({
           // url: `/pages/driving/drving?trip_id=${tripID}`,
           url: routing.drving({
               trip_id: tripID
           }),
           complete: () => {
               wx.hideLoading()
           }
       })
        },3000);
    },


    onShareLocation() {
        if (this.data.shareLocation === 0) {
            this.setData({
                shareLocation: 1,
            })
            console.log(this.data.shareLocation)
        }else {
            this.setData({
                shareLocation: 0,
            })
            console.log(this.data.shareLocation)
        }

    }

})