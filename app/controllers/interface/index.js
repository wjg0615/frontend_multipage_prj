import { serverHost } from './../../cfg/const';

import getStaticPagesApi from './static_pages';

/**
 * 获取页面相关信息
 */
export default function getApiInfo(page) {
    let apiInfo = {
        host: serverHost,
        project: 'fanli'
    };
    Object.assign(apiInfo, getStaticPagesApi(page)); 
    return apiInfo;
}