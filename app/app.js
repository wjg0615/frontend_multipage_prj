import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//匹配服务端渲染不需要读取的文件
const extensions = ['.css', '.less', '.scss', 'sass', 'jpg', 'png'],
    app = express();
for (let item of extensions) {
    require.extensions[item] = () => {
        return false;
    };
}
import { rootPath } from './cfg/path';
import { __DEBUG__, IS_LOCAL } from './cfg/const';
import logger from 'morgan';
//页面通用请求
import common from './routers/common';

import domain from 'domain';

// view engine setup

// https://aui.github.io/art-template/docs/options.html
var template = require('art-template');
template.defaults.extname = '.html';

// https://aui.github.io/art-template/express/
app.engine('html', require('express-art-template'));
app.set('view engine', 'html');
app.set('views', path.join(rootPath, './views'));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(rootPath, 'public', 'favicon.ico')));
app.use(logger('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// 捕获异步异常
app.use(function(req, res, next) {
    const reqDomain = domain.create();
    reqDomain.on('error', function(err) { // 下面抛出的异常在这里被捕获
        logger('default', err);
        if (IS_LOCAL) {
            console.log('domain error', err);
        }
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err.stack
        });
    });
    reqDomain.run(next);
});

//判断process.env.VNAME不为空才进行热加载设置,避免环境设置错误导致的bug
if (__DEBUG__ && IS_LOCAL && process.env.VNAME) {
    //热更新
    const webpack = require('webpack');
    const webpackConfig = require('./../webpack.config.babel').default;
    const compiler = webpack(webpackConfig);
    app.use(require('webpack-dev-middleware')(compiler, {
        hot: true,
        stats: {
            colors: true
        }
    }));
    app.use(require('webpack-hot-middleware')(compiler));
}
//将静态资源访问目录设置到public下,访问时目录名指定为files(可以指定任意名称),设置静态文件缓存为30日
app.use('/prj/files', express.static(path.join(rootPath, './public'), { maxAge: 60 * 1000 * 60 * 24 * 30 }));
app.use('/prj/views', express.static(path.join(rootPath, './views'), { maxAge: 60 * 1000 * 60 * 24 * 30 }));
app.use('/prj/common', common);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    logger('default', err);
    next(err);
});

// 捕捉同步异常
// eslint-disable-next-line max-params
app.use(function(err, req, res, next) {
    logger('combined', err);
    if (IS_LOCAL) {
        console.log('500 err', err);
    }
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err.stack
    });
});

module.exports = app;