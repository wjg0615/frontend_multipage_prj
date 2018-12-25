import RequestStaticPage from './../request/base/request_static_page';

export default function getStaticPagesApi(page) {
    let apiInfo = {
        Class: RequestStaticPage
    };
    switch (page) {
        case 'test':
            apiInfo.title = '测试页面标题';
            apiInfo.template = './fanli/test/home/index';
            break;
        default:
            apiInfo.title = '获取数据';
            apiInfo.template = null;
            break;
    }
    return apiInfo;
}