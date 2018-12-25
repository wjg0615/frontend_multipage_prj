import Browser from '../../../utils/browser';

/**
 * 请求数据对象，保存请求参数以及请求结果
 */
export default class NodeRequest {
    // eslint-disable-next-line max-params
    constructor(postData, request, response, requestType, page, apiInfo) {
        /**
         * 协议结构：{'data':{},'handle':0,'shandle':0}
         */
        this.postData = postData;

        this.request = request;

        this.response = response;

        this.requestType = requestType;

        this.page = page;

        this.apiInfo = apiInfo;

        this.tmplData = {};
    }

    generateTmplData() {
        this.tmplData = {
            title: this.apiInfo.title,
            browser: new Browser(this.request.headers['user-agent'], this.request.query.isapp),
            phead: this.getPhead(),
            //把链接信息传递到view
            withPlatformFunctions: this.request.query.wpf
        };
    }

    getPhead() {
        const dataCon = this.postData.data;
        let phead = null;

        if (!dataCon || typeof dataCon !== 'object') {
            throw new Error('非法请求, 内层data数据错误');
        }
        phead = dataCon.phead;
        if (typeof phead === 'string') {
            try {
                phead = JSON.parse(phead);
            } catch (e) {
                throw new Error(e);
            }
        }
        return phead;
    }

    getIsPage() {
        const data = this.postData.data;
        let isPage = 2;

        if (!data || typeof data !== 'object') {
            throw new Error('非法请求, 内层data数据错误');
        }
        if (data.ispage) {
            isPage = data.ispage;
        } else {
            isPage = this.request.query.ispage;
        }
        return parseInt(isPage);
    }

}