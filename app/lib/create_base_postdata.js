import Phead from './../lib/phead';

/**
 * 获取基础请求数据
 */
class BasePostData{

    constructor(config, request) {
        this.config = {};
        Object.assign(this.config, config);
        this.request = request;
        return this.generate();
    }

    generate() {
        let data = {
            phead: new Phead(this.request)
            , ispage: 2
        };
        Object.assign(data, this.config);
        return {
            data: data
            , shandle: 0
            , handle: 0
        }
    }
}

export default BasePostData;