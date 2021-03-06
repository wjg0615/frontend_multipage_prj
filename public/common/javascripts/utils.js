var GLOBAL_URL = "http://" + location.host + "/";
var sUserAgent = navigator.userAgent.toLowerCase();
var browser = {
    bIsIOS: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
    bIsUc: sUserAgent.match(/ucweb/i) == "ucweb",
    bIsAndroid: sUserAgent.match(/android/i) == "android",
    bIsAndroidVersion: Number(sUserAgent.substr(sUserAgent.indexOf('android') + 8, 3)),
    bIsQQ: sUserAgent.match(/qq/i) == "qq",
    bIsWechat: sUserAgent.match(/micromessenger/i) == "micromessenger",
    bIsWeibo: sUserAgent.match(/weibo/i) == "weibo",
    bIsHuawei: sUserAgent.match(/huawei/i) == "huawei"
};
browser.isSupportWebp = function() {
    return browser.bIsAndroid && browser.bIsAndroidVersion > 4.1 && !browser.bIsHuawei;
};

/**
 * 判断是否为空的方法
 */
function isNull(data) {
    //解决处理判断数字0=''的问题
    if (data == 0) {
        data = data.toString();
    }
    return data == null || data == '' || data == 'undefined' || data.length == 0;
}

function getFormatImg(src, param) {
    if (isNull(src)) {
        return '';
    }
    param = param || '0';
    if (src.indexOf('imageView2') === -1 || src.indexOf('.gif') === -1) {
        if (browser.isSupportWebp()) {
            src += '?imageView2/' + param + '/format/webp'
        } else {
            if (src.indexOf('png') > -1) {
                src += '?imageView2/' + param + '/format/png'
            } else {
                src += '?imageView2/' + param + '/format/jpg'
            }
        }
    }
    return src;
}
function getBasePostData(phead) {
    phead = phead || window.phead;
    var _pheadsource = JSON.stringify(phead);
    _pheadsource = '{"phead":' + _pheadsource + ', "ispage": 1}';
    _pheadsource = '{"data":' + _pheadsource + ', "shandle": 0, "handle": 0}';
    return _pheadsource;
}

function getUrlParam (param_name) {
    var reg = new RegExp("(^|&)" + param_name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null
}
function getUrlDecodeParam (param_name) {
    param_name = param_name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + param_name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.search);
    if (results == null) return "";
    else return decodeURIComponent(results[1].replace(/\+/g, " "))
}
function checkPhoneFormat(phone) {
    var pattern = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (pattern.test(phone)) {
        return true;
    }
    return false;
}
function isLogin(phead) {
    phead = phead || window.phead;
    if (phead && phead.access_token) {
        return true;
    }
    return false;
}
