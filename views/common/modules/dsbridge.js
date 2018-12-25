function getJsBridge() {
    return {
        call: function (method, args, cb) {
            var ret = '';
            if (typeof args == 'function') {
                cb = args;
                args = {};
            }
            if (typeof cb == 'function') {
                window.dscb = window.dscb || 0;
                var cbName = 'dscb' + window.dscb++;
                window[cbName] = cb;
                args['_dscbstub'] = cbName;
            }
            args = JSON.stringify(args || {})

            if (window._dswk) {
                ret = prompt(window._dswk + method, args);
            } else {
                if (typeof _dsbridge == 'function') {
                    ret = _dsbridge(method, args);
                } else if (window._dsbridge) {
                    ret = _dsbridge.call(method, args);
                } else {
                    console.log('找不到_dsbridge');
                    callBrowser(method, args);
                }
            }
            return ret;
        },
        register:function(name,fun){
            window._dsf=window._dsf||{};
            if(typeof name=="object"){
                Object.assign(window._dsf,name)
            }else {
                window._dsf[name] = fun;
            }
        },
        page:function(title,url){
            this.call('launch', {param: 'xmaili://com.xmiles.xmaili/web/CommonWebViewPage?title=' + title + '&html=' + encodeURIComponent(url) + '&withHead=true' });        
        }
    }
};

function callBrowser(method, args) {
    if (method == 'launch') {
        const object = JSON.parse(args);
        const param = object.param;
        const html = getParameterByName(param, 'html');
        location.href = html;
    }
}

function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(url);
    return results == null ? "": decodeURIComponent(results[1]);
}

module.exports=getJsBridge();