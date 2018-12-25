import storeStatics from './store-statics';

/**
 * 工具组合模块
 */
const utils = {
    GLOBAL_URL: typeof location === 'object' ? `${location.protocol}//${location.host}/` : '',
    //七牛图片格式化
    getFormatImg(src, param = '0') {
        const browser = storeStatics.browser;
        if (!src || typeof src !== 'string') {
            return '';
        }
        //远程服务器图片删除protocol
        if (src.indexOf('https://') === 0) {
            src = src.slice(6, src.length);
        } else if (src.indexOf('http://') === 0) {
            src = src.slice(5, src.length);
        }
        if (!src.includes('imageView2') && !src.includes('.gif')) {
            if (browser.isSupportWebp) {
                src += '?imageView2/' + param + '/format/webp';
            } else if (src.includes('.png') || src.includes('.tmp')) {
                src += '?imageView2/' + param + '/format/png';
            } else {
                src += '?imageView2/' + param + '/format/jpg';
            }
        }

        return src;
    },
    //七牛图片格式化，极致压缩，没有透明度
    getTinyImg(src, param = '0') {
        const browser = storeStatics.browser;
        if (!src || typeof src !== 'string') {
            return '';
        }
        //远程服务器图片删除protocol
        if (src.indexOf('https://') === 0) {
            src = src.slice(6, src.length);
        } else if (src.indexOf('http://') === 0) {
            src = src.slice(5, src.length);
        }
        if (!src.includes('imageView2') && !src.includes('.gif')) {
            if (browser.isSupportWebp) {
                src += '?imageView2/' + param + '/format/webp';
            } else {
                src += '?imageView2/' + param + '/format/jpg';
            }
        }
        return src;
    },
    //发送给服务器的基础数据
    getBasePostData(phead = storeStatics.phead || window.phead) {
        let _pheadsource = JSON.stringify(phead);
        _pheadsource = '{"phead":' + _pheadsource + ', "ispage": 1}';
        _pheadsource = '{"data":' + _pheadsource + ', "shandle": 0, "handle": 0}';
        return _pheadsource;
    },
    //判断是否为空的方法
    isNull(data) {
        //解决处理判断数字0=''的问题
        if (data == 0) {
            data = data.toString();
        }
        if (data instanceof Array) {
            return data.length === 0;
        }
        return !data || data == 'null' || data == 'undefined';
    },
    //去掉string左右两边的空格
    trimString(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    },
    //获取url常规参数
    getUrlParam(param_name) {
        const urlReg = new RegExp("(^|&)" + param_name + "=([^&]*)(&|$)");
        const result = window && window.location.search.substr(1).match(urlReg);
        if (result) {
            return unescape(result[2]);
        }
        return null;
    },
    //获取url encode过的数据
    getUrlDecodeParam(param_name) {
        param_name = param_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const urlReg = new RegExp("[\\?&]" + param_name + "=([^&#]*)");
        const result = urlReg.exec(window.location.search);
        if (result) {
            return decodeURIComponent(result[1].replace(/\+/g, " "));
        }
        return null;
    },
    //检查手机号码格式是否正确
    checkPhoneFormat(phone) {
        const pattern = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        return pattern.test(phone);
    },
    //根据phead判断是否已登录
    isLogin(phead = window.phead) {
        return phead && phead.access_token;
    },
    //原生实现DOM addClass
    addClass(obj, cls) {
        const obj_class = obj.className,
            blank = (obj_class != '') ? ' ' : '';
        let added = obj_class + blank + cls;
        obj.className = added;
    },
    //原生实现DOM removeClass
    removeClass(obj, cls) {
        let obj_class = ' ' + obj.className + ' ';
        obj_class = obj_class.replace(/(\s+)/gi, ' ');
        let removed = obj_class.replace(' ' + cls + ' ', ' ');
        removed = removed.replace(/(^\s+)|(\s+$)/g, '');
        obj.className = removed;
    },
    //异步加载js
    loadScriptAsync(url, callback) {
        let script = document.createElement('script');
        script.type = "text/javascript";
        script.addEventListener('load', function() {
            callback && callback();
        }, false);
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
    },
    disableBodyScroll() {
        window.stTemp = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = (-window.stTemp + 'px');
    },
    enableBodyScroll() {
        document.body.style.overflow = "scroll";
        document.body.style.position = "static";
        document.body.style.top = '0px';
        document.body.scrollTop = window.stTemp;
        document.documentElement.scrollTop = window.stTemp;
    },
};

export default utils;