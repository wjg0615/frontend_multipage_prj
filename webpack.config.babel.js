import webpack from 'webpack';
import path from 'path';
//hash长度定义
import hashConfig from './views/cfg/hash-config';
//通用插件
import basePluginList from './views/cfg/base';
//deploy插件
import deployPluginList from './views/cfg/deploy';
//提取文件(css)插件
import extractTextPluginList from './views/cfg/extracttext';
//clean插件
import cleanPlugin from './views/cfg/clean';
//loaders
import loaders from './views/cfg/loaders';
//打包命令信息
import nodeEnvInfo from './views/cfg/node-env';
import projectPath from './views/cfg/path';

let entry = {};
if(!nodeEnvInfo.deploy) {
    for (let item in nodeEnvInfo.entry) {
        entry[item] = [
            //资源服务器地址
            'webpack-hot-middleware/client?reload=true',
            //当开发没用到react的项目的时候,将下面一行注释掉,防止因为hotloader报错
            'react-hot-loader/patch',
            'webpack/hot/only-dev-server',
            nodeEnvInfo.entry[item]
        ];
    }
}

const config = {
    entry: nodeEnvInfo.deploy ? nodeEnvInfo.entry : entry,
    output: {
        path: path.resolve(projectPath, nodeEnvInfo.currentProject + 'bundle'),
        filename: '[name]' + hashConfig.chunkhash + '.js',
        chunkFilename: '[name]' + hashConfig.chunkhash + '.js',
        publicPath: nodeEnvInfo.deploy ? nodeEnvInfo.publicPath : '/'
    },
    resolve: {
        alias: {},
        extensions: ['.js', '.jsx', '.scss', '.css', '.png', '.jpg']
    },
    //声明外部依赖
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM'
    },
    module: {
        rules: loaders
    },
    plugins: basePluginList
};

if(nodeEnvInfo.clean){
    config.plugins = (config.plugins || []) .concat(cleanPlugin);
}
if(nodeEnvInfo.extract){
    config.plugins = (config.plugins || []) .concat(extractTextPluginList);
}
if(nodeEnvInfo.deploy){
    config.plugins = (config.plugins || []) .concat(deployPluginList);
}else{
    //开启source-map方便调试
    config.devtool = '#source-map';
    config.plugins = (config.plugins || []) .concat([
        //new require('webpack-dashboard/plugin')((new require('webpack-dashboard').setData),
        new webpack.HotModuleReplacementPlugin()
    ]);
}

export default config;
