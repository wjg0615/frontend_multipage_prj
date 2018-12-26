//获取相关的文件(夹))位置
import getLocation from './location';

function returnBool(arg) {
    const _arg = Number(arg);
    if (!isNaN(_arg)) {
        return _arg;
    }
    return (/^true$/i).test(arg);
}

if (!process.env.VNAME) {
    console.error('必须指定打包的name!');
    process.exit(1);
}

//判断开发环境与正式环境
const locationInfo = getLocation(process.env.VNAME);
const nodeEnvInfo = {
    deploy: typeof process.env.VDEPLOY === 'undefined' ? returnBool(process.env.npm_package_config_deploy) : returnBool(process.env.VDEPLOY),
    clean: typeof process.env.VCLEAN === 'undefined' ? returnBool(process.env.npm_package_config_clean) : returnBool(process.env.VCLEAN),
    extract: typeof process.env.VEXTRACT === 'undefined' ? returnBool(process.env.npm_package_config_extract) : returnBool(process.env.VEXTRACT),
    currentProject: locationInfo.currentProject,
    entry: locationInfo.entry,
    publicPath: locationInfo.publicPath,
    pages: locationInfo.pages
};

export default nodeEnvInfo;
