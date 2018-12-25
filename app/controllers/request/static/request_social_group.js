import RequestBase from '../base/request_base';
import axios from 'axios';

// 请求分享者的数据
export default class RequestMallZeroShoppingApp extends RequestBase {

    constructor (...args){
        super(...args);
    }

    getGroupMember = (associationId) => {
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/relation/getAssociationMembers`,
            data: {
                associationId: associationId,
                pageNum: 1,
                pageSize: 15
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            this.nodeRequest.tmplData.groupMemberInfo = response.data;
            this.dataReady(); //这里默认data 
        }).catch((e)=>{
            console.log(e);
            this.dataReady(); 
        })
    }

    getGroupInfo = () => {
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/relation/getAssociation`,
            data: {
            },
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            console.log('getGroupInfo: ' + JSON.stringify(response.data))
            if(response.data.code = '100') {
                this.nodeRequest.tmplData.groupInfo = response.data;
                if(response.data.result.list && response.data.result.list.length == 1) {
                    this.nodeRequest.tmplData.associationId = response.data.result.list[0].associationId;
                    console.log('associationId: ' + response.data.result.list[0].associationId)
                    this.getGroupMember(response.data.result.list[0].associationId)
                }else {
                    this.dataReady();
                }
            }else {
                this.dataReady();
            }
        }).catch((e)=>{
            console.log(e);
            this.dataReady();
        })
        
    }

    //具体实现
    concrete() {
       //this.nodeRequest.postData.data.phead.access_token = 'VM2gexEt3C2gDbj5Ck3m';
      // this.nodeRequest.apiInfo.host = 'maixgotest.quzhuanxiang.com';
        axios({
            method: 'post',
            url: `https://${this.nodeRequest.apiInfo.host}/maixgo-app/userInfo`,
            data: {},
            headers: {...this.nodeRequest.postData.data.phead} ,  
        }).then((response)=>{
            this.nodeRequest.tmplData.userInfo = response.data;
            this.getGroupInfo(); 
        }).catch((e)=>{
            console.log(e);
            this.dataReady(); 
        })
    }
}