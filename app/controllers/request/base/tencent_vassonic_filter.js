import crypto from 'crypto';
/**
 * 
 * 把输出的html，按Tencent/VasSonic框架协议进行处理的方法
 * @param {any} html 
 * @returns 
 * @memberof RequestBase
 */
let handleVasSonicReturn = function(request, response ,html) {
    //accept_diff，表示终端是否支持VasSonic模式，true为支持，否则不支持
    //只有新版本的客户端支持，旧版本的客户端或者浏览器访问就不支持
    let use_vassonic = request.headers["use-vassonic"];
    let accept_diff = request.headers["accept-diff"];
    if (!use_vassonic || !accept_diff) {
        //如果不支持，直接返回html内容
        response.send(html);
        return;
    }

    //如果是支持VasSonic
    //设置cache-offline
    //true	缓存到磁盘并展示返回内容; false	展示返回内容，无需缓存到磁盘; store	缓存到磁盘，如果已经加载缓存，则下次加载，否则展示返回内容; http	容灾字段，如果http表示终端六个小时之内不会采用sonic请求该URL
    response.setHeader("cache-offline", true);
    
    //页面整体etag
    let htmlMd5 = crypto.createHash('sha1').update(html).digest('hex');

    //客户端上传缓存页面整体etag
    let request_etag = request.headers["if-none-match"];
    //客户端上传缓存模版template-tag
    let request_template_tag = request.headers["template-tag"];

    if (request_etag && request_etag == htmlMd5){
        //页面etag相等，没有变化，返回304
        response.setHeader("Content-Length", 0);
        response.statusCode = 304;
        response.send("");
    } else {
        //etag不相同，判断模版变化还是数据变化
        let title = "";
        let templateHtml = html.replace(/<title(.*?)<\/title>/i, function (titleHtml) {
            title = titleHtml;
            return "{title}";
        });
        //判断是否成功替换wnsdiffbody
        let flag = false;
        let tagIndex = 0, tagPrefix = 'auto';
        let diffTagNames = {};
        templateHtml = templateHtml.replace(/<!--sonicdiff-?(\w*)-->([\s\S]+?)<!--sonicdiff-?(\w*)-end-->/ig, function (diffhtml, tagName) {
            flag = true;
            if (!tagName) {
                tagName = tagPrefix + tagIndex++;
            }

            diffTagNames[tagName] = diffhtml;

            return '{' + tagName + '}';
        });
        let templateMd5 = crypto.createHash('sha1').update(templateHtml).digest('hex');

        if (!request_template_tag || request_template_tag != templateMd5 || !flag) {
            //客户端没有缓存，或者模版变化了，或者没有diff到数据
            response.setHeader("template-change", true);
            response.setHeader("sonic-etag", htmlMd5);
            response.setHeader("template-tag", templateMd5);
            response.send(html);
        } else {
            //模版没有变化，数据变化了
            response.setHeader("template-change", false);
            response.setHeader("sonic-etag", htmlMd5);
            response.setHeader("template-tag", templateMd5);
            let result = {
                'data': {
                    '{title}': title
                },
                'diff': '',
                'html-sha1': htmlMd5,
                "template-tag": templateMd5
            };
            Object.keys(diffTagNames).forEach(v => {
                result['data']['{' + v + '}'] = diffTagNames[v];
            });
            response.send(JSON.stringify(result));
        }
    }
}

export default handleVasSonicReturn;