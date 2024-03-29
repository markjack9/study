// index.ts
// 获取应用实例
import {routing} from "../../utils/routing";



Page({
    isPageShowing: false,
    data: {
        avatarURL: '',
        setting: {
            skew: 0,
            rotate: 0,
            showLocation: true,
            showScale: true,
            subKey: '',
            layerStyle: -1,
            enableZoom: true,
            enableScroll: true,
            enableRotate: false,
            showCompass: false,
            enable3D: false,
            enableOverlooking: false,
            enableSatellite: false,
            enableTraffic: false,
        },
        location: {
            latitude: 25.04428,
            longitude: 121.5373,
        },
        scale: 10,
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
                latitude: 25.24866,
                longitude: 121.60050,
                width: 50,
                height: 50
            },
            {
                iconPath: "/resources/car.png",
                id: 1,
                latitude: 25.03995,
                longitude: 121.56026,
                width: 50,
                height: 50
            }
        ],

    },
    onMyLocationTap() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                })
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权',
                })
            }
        })
    },
    onScanClicked() {
        wx.scanCode({
            success: async () => {
               await this.selectComponent('#licModal').showModal()
                const carID = 'car123'
                // const redirectURL=`/pages/lock/lock?car_id=${car_id}`
                const redirectURL = routing.lock({
                    car_id: carID,
                })
                wx.navigateTo(
                    {
                        // url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`,
                        url: routing.register({
                            redirectURL: redirectURL,
                        })
                    }
                )
                // wx.showModal({
                //     title: '身份认证',
                //     content: '认证成功才能进行使用',
                //     success: () => {
                //
                //     }
                // })


            }

        })
    },
    onMYTripsTap() {
        const myregisURL = routing.myregis()
        wx.navigateTo(
            {
                url: myregisURL,
            }
        )
    },
    onShow() {
        this.isPageShowing = true;
    },
    onHide() {
        this.isPageShowing = false;
    },

    moveCars() {
        const map = wx.createMapContext("mymap")
        const dest = {
            latitude: 25.04428,
            longitude: 121.5373,
        }
        const moveCar = () => {
            dest.latitude += 0.1
            dest.longitude += 0.1
            map.translateMarker({
                destination: {
                    latitude: dest.latitude,
                    longitude: dest.longitude,
                },
                autoRotate: false,
                markerId: 0,
                rotate: 0,
                duration: 5000,
                animationEnd: () => {
                    if (this.isPageShowing) {
                        moveCar()
                    }
                }
            })
        }
        moveCar()
    },
    async onLoad(e: any) {
        const userinfo: WechatMiniprogram.UserInfo = e.detail.userInfo

        this.setData({
            avatarURL: userinfo.avatarUrl
        })
        console.log(this.data.avatarURL)
    },
    onModalOk(){
        console.log('ok clicked')
    }

})
