import RequestBase from '../base/request_base';
import axios from 'axios';

// 请求用户信息
export default class RequestInviteShare extends RequestBase {

    constructor (...args){
        super(...args);
    }

    //具体实现
    concrete() {
        // this.nodeRequest.postData.data.phead.access_token = 'jKnN6m1YQost9S3xM2N2';
        this.nodeRequest.tmplData.serverNow = this.nodeRequest.apiInfo.host.indexOf('test') >= 0 ? 'test' : 'ok';
        //console.log(this.nodeRequest.apiInfo.host)
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/userInfo`,
            data: {
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            // this.nodeRequest.tmplData.teamInfo = response.data; //这里自定义字段
            this.dataReady(response.data); 
        }).catch((e)=>{
            console.log(e);
            this.dataReady();
        })
        
    }

}