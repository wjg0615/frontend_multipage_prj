import hashConfig from './hash-config.js';
//对css等文件独立打包
import ExtractTextPlugin from 'extract-text-webpack-plugin';

//通用插件
const extractTextPlugin = [
    new ExtractTextPlugin({
        filename: '[name]' + hashConfig.chunkhash + '.css',
        disable: false,
        allChunks: true
    })
];
export default extractTextPlugin;
