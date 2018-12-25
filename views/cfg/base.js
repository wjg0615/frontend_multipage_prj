import webpack from 'webpack';
import path from 'path';
import projectsPath from './path.js';
//打包生成文件的hash记录
import AssetsAndReplaceWebpackPlugin from 'xm-assets-replace-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
//打包命令信息
import nodeEnvInfo from './node-env';

//通用插件
const basePlugin = [
    new webpack.DefinePlugin({
        __DEBUG__: !nodeEnvInfo.deploy,
        'process.env.NODE_ENV': nodeEnvInfo.deploy ? JSON.stringify('production') : JSON.stringify('development')
    }),
    new AssetsAndReplaceWebpackPlugin({
        path: path.resolve(projectsPath, nodeEnvInfo.currentProject + 'chunksname'),
        prettyPrint: true,
        filename: 'chunksname.json',
        pages: nodeEnvInfo.pages,
        processOutput: function (assets) {
            return JSON.stringify(assets);
        }
    }),
    new WebpackMd5Hash(),
    // 如果出现任何错误 就终止构建
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin()
];

export default basePlugin;
