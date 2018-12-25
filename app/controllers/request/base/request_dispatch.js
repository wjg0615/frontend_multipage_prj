import getApiInfo from '../../interface/index';
import RequestBase from './request_base';
/**
 * 判断所属工程并分发扩展请求
 * 本模块不操作数据,不修改类和this指针,仅用于分派接口
 */
export default class RequestDispatch {

    constructor() {} 

    dispatch(nodeRequest) {
        const page = nodeRequest.request.query.page;
        let apiInfo = null;

        if (!page) {
            throw new Error('非法请求, page参数错误');
        }

        apiInfo = getApiInfo(page);

        nodeRequest.page = page;
        nodeRequest.apiInfo = apiInfo;

        if (apiInfo.Class && apiInfo.Class.prototype.concrete) {
            new nodeRequest.apiInfo.Class(nodeRequest).concrete();
        } else {
            new RequestBase(nodeRequest).execute();
        }
    }
}