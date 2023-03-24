// pages/mytrips/mytrips.ts
import {routing} from "../../utils/routing";

Page({

      data: {
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
onSwiperChange(){
   },
    onPromotionItemTap(e: any){
          console.log(e)
        const promotionID = e.currentTarget.dataset.promotionID
        if (promotionID){
            console.log('mromotionId is :' + promotionID)
        }
    },
    onRegisterTap(){
        const redirectURL = routing.register()
        wx.navigateTo(
            {
                // url: `/pages/register/register?redirect=${encodeURIComponent(redirectURL)}`,
                url: routing.register({
                    redirectURL: redirectURL,
                })
            }
        )
    }
})