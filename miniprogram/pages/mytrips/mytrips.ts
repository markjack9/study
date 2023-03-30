// pages/mytrips/mytrips.ts
import {routing} from "../../utils/routing";


interface Trip {
    id: string
    start: string
    end: string
    duration: string
    fee: string
    distance: string
    status: string
}

interface MainItem {
    id: string
    navId: string
    navScrollId: string
    data: Trip
}

interface NavItem {
    id: string
    mainId: string
    label: string
}

interface MainItemQueryResult {
    id: string
    top: number
    dataset: {
        navId: string
        navScrollId: string
    }
}

Page({
    scrollStates: {
        mainItems: [] as MainItemQueryResult [],
    },

    data: {
        navindex: 0,
        tripsHeight: 0,
        redirectURL: '',
        current: 0,
        vertical: false,
        indicatorDots: true,
        autoPlay: true,
        interval: 3000,
        duration: 500,
        circular: true,
        multiItemCount: 1,
        prevMargin: '',
        nextMargin: '',
        mainItems: [] as MainItem[],
        navItems: [] as NavItem[],
        scrollTop: 0,
        mainScroll: '',
        navCount: 0,
        navSel: '',
        navScroll: '',
        promotionItems: [
            {
                img: 'https://img.mukewang.com/5f7301d80001fdee18720764.jpg',
                promotionID: 0,
            },
            {
                img: 'https://img.mukewang.com/5f6805710001326c18720764.jpg',
                promotionID: 1,
            },
            {
                img: 'https://img.mukewang.com/5f6173b400013d4718720764.jpg',
                promotionID: 2,
            },

        ]
    },
    async onLoad() {



        this.populateTrips()
        const userInfo = await getApp<IAppOption>().globalData.userInfo
        this.setData({
            avatarURL: userInfo.avatarUrl,
        })
    },
    onReady() {
        wx.createSelectorQuery().select('#heading')
            .boundingClientRect((rect => {

                const height = wx.getSystemInfoSync().windowHeight = rect.height
                this.setData({
                    tripsHeight: height,
                    navCount: Math.round(height / 50),
                })

            })).exec()
    },
    populateTrips() {
        const mainItems: MainItem[] = []
        const navItems: NavItem[] = []
        let navSel = ''
        let prevNav = ''
        for (let i = 0; i < 100; i++) {
            const mainId = 'main-' + i
            const navId = 'nav-' + i
            const tripId = (10001 + i).toString()
            if (!prevNav){
                prevNav = navId
            }


            mainItems.push({
                id: mainId,
                navId: navId,
                navScrollId: prevNav,
                data: {
                    id: tripId,
                    start: '高雄',
                    end: '南投',
                    distance: '27.0公里',
                    duration: '0时44分',
                    fee: '200元',
                    status: '已完成',
                },

            })


            navItems.push({
                id: navId,
                mainId: mainId,
                label: tripId,
            })
            if (i === 0) {
                navSel = navId
            }
            prevNav = navId
        }
        this.setData({
            mainItems,
            navItems,
            navSel,

        }, () => {
            this.prepareScrollStates()
        })
    },
    prepareScrollStates() {
        wx.createSelectorQuery().selectAll('.trip')
            .fields({
                id: true,
                dataset: true,
                rect: true,
            }).exec(res => {
            this.scrollStates.mainItems = res[0]


        })
    },

    onPromotionItemTap(e: any) {

        const promotionID = e.currentTarget.dataset.promotionID
        if (promotionID) {
            console.log('mromotionId is :' + promotionID)
        }
    },
    onRegisterTap() {

        wx.navigateTo(
            {
                // url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`,
                url: routing.register(),
            }
        )
    },
    onNavItemTap(e: any) {
        const mainId: string = e.currentTarget?.dataset?.mainId
        const navId: string = e.currentTarget?.dataset?.id
        if (mainId) {
            this.setData({
                mainScroll: mainId,
                navSel: navId,
            })

        }
    },
    onMainScroll(e: any) {

        const top: number = e.currentTarget?.offsetTop + e.detail?.scrollTop
        if (top === undefined) {
            return
        }



        const selItem = this.scrollStates.mainItems.find(
            v => v.top >= top)
        if (!selItem) {
            return
        }



        this.setData({
            navSel: selItem.dataset.navId,
            navScroll: selItem.dataset.navScrollId,

        })



    }
})