import RequestBase from '../base/request_base';
import axios from 'axios';

// 请求分享者的数据
export default class RequestMallZeroShoppingApp extends RequestBase {

    constructor (...args){
        super(...args);
    }

    getTeamInfo = () => {
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/relation/getFriends`,
            data: {
                type: 2, //1为好友， 2为团队
                searchName: "",
                searchTime: "",
                pageNum: 1,
                pageSize: 20
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            this.nodeRequest.tmplData.teamInfo = response.data; //这里自定义字段
            this.dataReady(); //这里默认data 
        }).catch((e)=>{
            console.log(e);
            this.dataReady();
        })
    }

    //具体实现
    concrete() {
      // this.nodeRequest.postData.data.phead.access_token = '3wyMpdT8yG7ERrovq6R9';
      // this.nodeRequest.apiInfo.host = 'maixgotest.quzhuanxiang.com';
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/relation/getFriends`,
            data: {
                type: 1, //1为好友， 2为团队
                searchPhone: "",
                searchTime: "",
                pageNum: 1,
                pageSize: 20
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            this.nodeRequest.tmplData.friendInfo = response.data; //这里自定义字段
            this.getTeamInfo()
        }).catch((e)=>{
            console.log(e);
            this.dataReady();
        })
    }
}