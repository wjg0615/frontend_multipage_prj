/**
 * 根据request对象生成phead
 */
class Phead {

    constructor(request) {
        this.phead = {
            "pversion": 0,
            "cversion": 0,
            "channel": 1000,
            "cityid": "440100",
            "gcityid": "440100"
        };
        this.request = request;
        return this.set();
    }

    get() {
        return this.phead;
    }

    set() {
        // 平台非ios就默认为android
        // 红米note4可能爆 Cannot read property 'match' of undefined，这里加一下保护，拿不到UA默认为android
        // eslint-disable-next-line no-implicit-coercion
        if (this.request.headers['user-agent'] && !!this.request.headers['user-agent'].match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
            this.phead.platform = 'ios';
        } else {
            this.phead.platform = 'android';
        }
        if (this.request.query.prd_id) {
            this.phead.prdid = this.request.query.prd_id;
        } else {
            this.phead.prdid = 14000;
        }
        return this.get();
    }
}

export default Phead;