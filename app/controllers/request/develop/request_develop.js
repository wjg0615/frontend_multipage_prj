import RequestBase from '../base/request_base';
import axios from 'axios';

// 请求用户信息
export default class RequestDevelop extends RequestBase {

    constructor (...args){
        super(...args);
    }

    //具体实现
    concrete() {
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