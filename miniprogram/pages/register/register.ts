// pages/register/register.ts
import {routing} from "../../utils/routing";

Page({
    data: {
        redirectURL: '',
        licNo: '',
        name: '',
        gendersIndex: 0,
        genders: ['未知', '男', '女', '其他'],
        birthDate: '1990',
        LicImgURL: '',
        state: 'UNSUBMITTED' as 'UNSUBMITTED' | 'PENDING' | 'VERIFIED',
        check_state: false,
    },
    onUploadLic() {
        wx.chooseImage({
            success: res => {
                if (res.tempFilePaths.length > 0) {
                    this.setData({
                        LicImgURL: res.tempFilePaths[0]
                    })
                    //上传照片之后识别出来传数据到表单
                    setTimeout(() => {
                        this.setData({
                            licNo: '123123123',
                            name: 'Mark',
                            gendersIndex: 0,
                            birthDate: '1970-05-09',
                        }, 1000);
                    })
                }

            }
        })
    },
    onLoad(opt: Record<'redirect', string>) {
        const o: routing.RegisterOpts = opt
        if (o.redirect) {
            this.data.redirectURL = decodeURIComponent(o.redirect)
        }
    },
    onGenderChange(e: any) {
        this.setData({
            gendersIndex: e.detail.value,
            //传递gendersIndex所选的字段内容
        })
    },
    onBirthDateChange(e: any) {
        this.setData({
            birthDate: e.detail.value,
            //传递birthDate所选的字段内容
        })
    },
    onSubmit() {
        this.setData({
            state: 'PENDING',
        })
        setTimeout(() => {
            this.onLicVerified()
        }, 3000);
    },
    onResubmit() {
        this.setData({
            state: 'UNSUBMITTED',
            LicImgURL: '',
            check_state: false,
        })
    },
    onLicVerified() {
        this.setData({
            state: 'VERIFIED',
            check_state: true,
        })
        if (this.data.redirectURL) {
            wx.redirectTo({
                url: this.data.redirectURL,
            })
        }

    }
})