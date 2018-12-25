import RequestDispatch from './request_dispatch';
import BasePostData from '../../../lib/create_base_postdata';
import NodeRequest from './node_request';
import { REQUEST_TYPE } from './../../../cfg/const';

/**
 * 合并common下的post/get到一个方法内执行
 */
export default class RequestCombine {

    constructor(request, response, requestType) {
        this.request = request;
        this.response = response;
        this.requestType = requestType;
        this.exec();
    }

    exec() {
        let postData = null,
            request = null,
            //创建基础postData的副本
            basePostData = new BasePostData(null, this.request);
        //判断是post/get
        if (this.requestType === REQUEST_TYPE.GET) {
            const getData = this.request.query;
            //获取放在url上的data参数
            if (getData.data) {
                try {
                    basePostData = JSON.parse(decodeURI(getData.data));
                } catch (e) {
                    throw new Error(e);
                }
                if (!basePostData || typeof basePostData !== 'object') {
                    throw new Error('data参数错误');
                }
            } else if (this.request.headers.phead) { // 从header获取phead
                // 出错了直接抛出
                basePostData.data.phead = JSON.parse(this.request.headers.phead);
            }
            basePostData.handle = 0;
            basePostData.shandle = 0;
            postData = basePostData;
        } else if (this.requestType === REQUEST_TYPE.POST) {
            postData = this.request.body;
        } else {
            throw new Error('请使用正确的方式请求');
        }
        //发送到tomcat服务器--postData为json
        request = new NodeRequest(postData, this.request, this.response, this.requestType);
        // eslint-disable-next-line no-new
        new RequestDispatch().dispatch(request);
    } 
}