/**
 * 判断浏览器的方法
 */
export default class Browser {

    constructor(ua, isapp) {
        //避免开发时出现误会,当isapp有值时才执行判断
        if(typeof isapp !== 'undefined') {
            this.isapp = isapp === '1';
        }
        if(!ua){
            return this.getDefault();
        }
        this.ua = ua;
        this.sua = this.ua.toLowerCase();
        return this.get();
    }

    // 针对无法获取UA的情况，这种情况一般为国产Android
    getDefault() {
        return {
            bIsIOS: false,
            bIsAndroid: true,
            androidVersion: 4.4,
            bIsQQ: false,
            bIsWechat: false,
            bIsWeibo: false,
            bIsHuawei: false,
            ua: false,
            isSupportWebp: false,
            isapp: this.isapp
        };
    }

    get() {
        let browser = {
            bIsIOS: !!this.ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            bIsAndroid: this.sua.match(/android/i) == "android",
            androidVersion: Number(this.sua.substr(this.sua.indexOf('android') + 8, 3)),
            bIsQQ: this.sua.match(/qq/i) == "qq",
            bIsWechat: this.sua.match(/micromessenger/i) == "micromessenger",
            bIsWeibo: this.sua.match(/weibo/i) == "weibo",
            bIsHuawei: this.sua.match(/huawei/i) == "huawei",
            ua: this.sua,
            isapp: this.isapp
        };
        browser.isSupportWebp = browser.bIsAndroid && browser.androidVersion > 4.1 && !browser.bIsHuawei;
        return browser;
    }

}