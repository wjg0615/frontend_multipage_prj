import RequestBase from '../base/request_base';
import axios from 'axios';

// 请求分享者的数据
export default class RequestMallZeroShoppingApp extends RequestBase {

    constructor (...args){
        super(...args);
    }

    //具体实现
    concrete() {
        
        // this.nodeRequest.postData.data.phead.access_token = 'HHXOQmtcT0OTnB1LsKWN';
        // this.nodeRequest.apiInfo.host = 'maixgotest.quzhuanxiang.com';

        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/relation/getAssociationMembers`,
            data: {
                associationId: this.nodeRequest.request.query.associationId,
                pageNum: 1,
                pageSize: 20
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            this.nodeRequest.tmplData.memberInfo = response.data;
            this.dataReady(); 
        }).catch((e)=>{
            this.dataReady(); 
        })
    }
}