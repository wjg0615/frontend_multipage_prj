import RequestBase from './../base/request_base';

/**
 * 外部h5首页接口
 */
export default class RequestStaticPage extends RequestBase {

    constructor (...args){
        super(...args);
    }

    //具体实现
    concrete() {
        //直接返回
        this.dataReady();
    }

}