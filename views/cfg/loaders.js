//对css等文件独立打包
import ExtractTextPlugin from 'extract-text-webpack-plugin';
//打包命令信息
import nodeEnvInfo from './node-env';
const loaders = [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
    },
    {
        test: /\.css$/,
        loader: nodeEnvInfo.extract ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader'
            ]
        }) : [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.scss$/,
        loader: nodeEnvInfo.extract ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
                'css-loader',
                'sass-loader'
            ]
        }) : [
            'style-loader',
            'css-loader',
            'sass-loader'
        ]
    },
    {
        test: /\.(png|jpg|eot|svg|ttf|woff)$/,
        use: [{
            loader: 'url-loader',
            options: {
                limit: 5120
            }
        }]
    }
];

export default loaders;
