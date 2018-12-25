import nodeEnvInfo from './node-env';

//hash长度定义
const hashConfig = {
    hash: '.[hash:6]',
    //热替换如果使用chunkhash会报错
    chunkhash: !nodeEnvInfo.deploy ? '' : '.[chunkhash:6]'
};
export default hashConfig;