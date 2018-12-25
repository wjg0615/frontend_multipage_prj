//判断运行模式--仿照webpack命名
export const __DEBUG__ = process.env.NODE_ENV === 'development',
    //是否本地开发
    IS_LOCAL = process.env.IS_LOCAL === '1',
    //服务器环境official/test
    IS_OFFICIAL = process.env.SERV_ENV === 'official',

    //请求类型
    REQUEST_TYPE = {
        GET: 1,
        POST: 2
    },

    //基础返回数据
    baseResponseData = {
        result: {
            status: 1
        },
        costTime: 0
    },

    //tomcat错误状态码
    ERRORCODE = {
        //成功
        SUCCESS: 1,
        //请求参数错误
        ERR_PARAM: 0,
        //服务器繁忙(访问过快等)
        BUSY: -1,
        //验证码错误
        ERR_VERIFY: -2,
        //服务器未知错误
        ERR_NOTKNOW: -3
    },

    //域名
    serverHost = IS_OFFICIAL ? 'app.xmaili.net' : 'test.xmaili.net';

console.log({
    "NODE_ENV": process.env.NODE_ENV,
    "IS_LOCAL": process.env.IS_LOCAL,
    "SERV_ENV": process.env.SERV_ENV
});