/* app bridge */
var __jsbridge;
function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}
connectWebViewJavascriptBridge(function (bridge) {
    bridge.init(function (message, responseCallback) {
        console.log("js receive message:", message);
        if (responseCallback) {
            console.log("js response callback");
            responseCallback("js response callback")
        }
    });
    __jsbridge = bridge;
    platformBindFinish()
});
function sendNativeMessage(func, args, callback) {
    if (__jsbridge) {
        __jsbridge.callHandler(func, args, function (response) {
            callback(response)
        })
    } else {
        return invokeCompatNativeMethod(func, args)
    }
}
function invokeCompatNativeMethod(func, args) {
    var methodName = "Platform." + func;
    var methodArgs = "(";
    for (var i = 0; i < args.length; i++) {
        if (i > 0) {
            methodArgs += ", "
        }
        if (typeof(args[i]) == "string") {
            methodArgs += "'" + escapeQuotes(args[i]) + "'"
        } else {
            methodArgs += args[i]
        }
    }
    methodArgs += ");";
    var jscmd = methodName + methodArgs;
    var result = eval(jscmd);
    return result
}
function escapeQuotes(str) {
    var result = str.replace(/'/g, "\\\'");
    result = result.replace(/\\\"/g, "\\\\\"");
    return result
}
function platformBindFinish() {
}
function platform_showLoading() {
    sendNativeMessage("showLoading", "")
}
function platform_dismissLoading() {
    sendNativeMessage("dismissLoading", "")
}
function platform_showPageLoading() {
    sendNativeMessage("showPageLoading", "")
}
function platform_hidePageLoading() {
    sendNativeMessage("hidePageLoading", "")
}
function platform_launch(param) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("launch", args)
}
function platform_showSharePanel(shareTitle, shareContent, targetUrl, iconUrl, callbackUrl) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("showSharePanel", args)
}
function platform_setShareContent(content) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("setShareContent", args)
}
function platform_shareDirectly(shareTitle, shareContent, targetUrl, iconUrl, callbackUrl, shareMedia) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("shareDirectly", args)
}
function platform_loadFinish() {
    sendNativeMessage("loadFinish", "")
}
function platform_getPheadJsonString(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("getPheadJsonString", args)
}
function platform_openDialogWebView(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("openDialogWebView", args)
}
function platform_gotoPay(params) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("gotoPay", args)
}
function platform_gotoLogin(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("gotoLogin", args)
}
function platform_checkLoginAndGoto(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("checkLoginAndGoto", args)
}
function platform_isAppInstall(pkg, callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("isAppInstall", args)
}
function platform_finishSelf() {
    sendNativeMessage("finishSelf", "")
}
function platform_copyToClipboard(content) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("copyToClipboard", args)
}
function platform_gotoLoginDirectly(param) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("gotoLoginDirectly", args)
}
function platform_reloadAll() {
    sendNativeMessage("reloadAll", "")
}
function platform_registerMessage(what) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("registerMessage", args)
}
function platform_sendMessage(what, params) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("sendMessage", args)
}
function platform_downloadFile(appName, targetUrl) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("downloadFile", args)
}
function platform_statisticAppClickAction(appName) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("statisticAppClickAction", args)
}
function platform_rateApp() {
    sendNativeMessage("rateApp", "")
}
function platform_setActionButtons(param) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("setActionButtons", args)
}
function platform_checkinFinish() {
    sendNativeMessage("checkinFinish", "")
}
function platform_checkinRemindSwitch(onoff) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("checkinRemindSwitch", args)
}
function platform_umengStatistics(eventid, datajsonstring) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("umengStatistics", args)
}
function platform_getMarketingInfo(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("getMarketingInfo", args)
}
function platform_tokenExpired(callbackJs) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("tokenExpired", args)
}
function platform_enablePullToRefresh(onoff) {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("enablePullToRefresh", args)
}
function platform_updateTitle() {
    var args = Array.prototype.slice.call(arguments);
    sendNativeMessage("updateTitle", args)
}
function platformBase() {
    var args = Array.prototype.slice.call(arguments);
    var name = args[0];
    args.shift();
    sendNativeMessage(name, args)
}