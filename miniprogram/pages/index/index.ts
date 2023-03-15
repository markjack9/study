// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
    isPageShowing: false,
    data: {
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
        ]
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
    }


})
