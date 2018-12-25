import webpack from 'webpack';
/**
 * 打包可部署正式服务器的代码
 * 包含插件--压缩
 */
const deployPlugin = [
    new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })
];
export default deployPlugin;
