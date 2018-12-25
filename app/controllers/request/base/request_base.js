import path from 'path';
import { templatePath } from './../../../cfg/path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import handleVasSonicReturn from './tencent_vassonic_filter';
/**
 * [request 发送post请求]                [使用promise实现]
 * @param  {[object]} postData          [发送到tomcat服务器的数据,不作修改]
 * @param  {[object]} request           [请求数据, 用于获取参数]
 * @return {[object]} response          [完成请求后发送数据/页面]
 * @return {[number]} requestType       [请求类型]
 * @return {[number]} funid             [funid]
 * @return {[string]} service           [请求的service]
 * @return {[object]} apiInfo           [接口定义]
 */
export default class RequestBase {
    constructor(nodeRequest) {
        this.nodeRequest = nodeRequest;
        this.nodeRequest.generateTmplData();
    }

    /**
     * 默认处理为根据配置进行模板渲染并返回
     */
    dataReady(serverData) {
        let data = serverData,
            tmplData = null;
        //以ispage判断返回数据还是返回页面--1为数据, 其他为页面
        if (this.nodeRequest.getIsPage() === 1) {
            this.nodeRequest.response.send(JSON.stringify(data));
            return;
        }
        if (!this.nodeRequest.apiInfo.template) {
            throw new Error('模板配置错误');
        }

        this.nodeRequest.tmplData.data = data;
        tmplData = this.nodeRequest.tmplData;

        const appPath = path.resolve(templatePath, this.nodeRequest.apiInfo.template),
            App = require(appPath);
        //这里把这两个字段删除，是因为这两个字段对业务没有用，又影响到Tencent/VasSonic框架的diff比较
        if (tmplData && tmplData.currentTime) {
            delete tmplData["currentTime"];
        }
        if (tmplData && tmplData.data && tmplData.data.costTime) {
            delete tmplData.data["costTime"];
        }
        //获得初始state
        tmplData.initialState = JSON.stringify(tmplData);
        tmplData.reactHtml = ReactDOMServer.renderToString( < App data = { tmplData }
            />);
            this.nodeRequest.response.render(this.nodeRequest.apiInfo.template, tmplData, (err, html) => {
                if (!err) {
                    //把输出的html，按Tencent/VasSonic框架协议进行处理
                    handleVasSonicReturn(this.nodeRequest.request, this.nodeRequest.response, html);
                }
            });
        }
    }