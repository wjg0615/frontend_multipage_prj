import storeStatics from './store-statics';

/**
 * 使用class修改原有的env
 * 前后端公用,服务端必须传入phead,客户端可传可不传
 */
export default class Env {
    constructor(phead = (window ? window.phead : null)) {
        this.phead = phead;
    }

    isWechat() {
        return this.phead && this.phead.prdid == 1010;
    }

    isH5() {
        return !storeStatics.browser.isapp;
    }

    isCmzj() {
        return this.phead && (!isNaN(this.phead.prdid) && (this.phead.prdid >= 4000 && this.phead.prdid < 4500));
    }

    isApp() {
        return !this.isH5();
    }

}