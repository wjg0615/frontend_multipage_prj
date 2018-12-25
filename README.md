# 摘要
- 这是一个多页面react+express+webpack项目，因为是2018圣诞节整理的，所以ico使用了阿里图标库的圣诞老人。
- 接下来可能会持续优化更新该项目。

# vscode启动测试-访问地址
http://localhost:3000/prj/common?page=test

# TODO
- 分离page，优化node层结构
- 引入postCSS：添加浏览器css3兼容前缀/特殊单位ren配合原JS-rem方案用来移动端适配/检测css属性书写规范
- 引入dva.js，示例状态管理方法(页面组件复杂时使用，一般用不上)
- 引入eslint
- requestData请求示例，编写示例服务端JAVA接口代码
- dsbridge交互示例，提供客户端接口(待学习)
- 测试服/正式服部署(jenkins)
- nginx配置prj


# 安装node
### 官网地址: 
https://nodejs.org/en/

# node版本管理
#### 可使用n或nvm(参考[http://taobaofed.org/blog/2015/11/17/nvm-or-n/](http://taobaofed.org/blog/2015/11/17/nvm-or-n/))
感觉n的体验比nvm好,切换后各种编辑器,IDE不需要修改node地址

# 项目初始化(以webstorm为例)
#### 项目check下来后执行npm install
#### 项目导入到webstorm后如果识别"import"等语法出错,preferences设置选择jsx
![image](http://img.xmiles.cn/frontend_service/youdao/QQ20170227-163306.png)
#### 启动配置
![image](http://img.xmiles.cn/frontend_service/youdao/FDE53EED-D8F3-412B-9C85-29BCE7182A5E.png)
#### 标注1说明:
#### 使用babel-node而不是node的原因是本地不需要打包node的服务端模块,babel-node可运行"import"等node暂不支持的语法
#### mac可选择node_modules/babel-cli/bin/下的babel-node.js
#### windows请选择node_modules/.bin/下的babel-node.cmd
#### 标注2说明如图:
![image](http://img.xmiles.cn/frontend_service/youdao/QQ20170227-163056.png)
#### 环境变量说明(环境变量都可以通过process.env.XXX获取,想要知道环境变量哪里使用过也可以这样去查找):
- NODE_ENV-----express默认需要的运行模式参数,可选development/production
- PORT----------监听端口
- SERV_ENV-----服务器环境,可选test/official
- IS_LOCAL------是否本地启动
- VNAME--------webpack打包的view name
- VDEPLOY------webpack打包时是否为部署(压缩)模式
- VCLEAN-------webpack打包时是否清理文件夹
- VEXTRACT-----webpack打包时是否提取样式文件

#### 本地启动
![image](http://img.xmiles.cn/frontend_service/youdao/QQ20170227-165311.png)
#### 控制台分两段输出
第一段

```
{ NODE_ENV: 'development', IS_LOCAL: '1', SERV_ENV: 'test' }
```
最后输出

```
webpack: Compiled successfully.
```
启动成功!

# app(服务端)部分代码解释

## app.js

```
import babelRegister from 'babel-register';
```
服务端渲染时识别"import"等语法

```
//匹配服务端渲染不需要读取的文件
const extensions = ['.css', '.less', '.scss', 'sass', 'jpg', 'png'],
    app = express();
for (let item of extensions) {
    require.extensions[item] = () => {
        return false;
    };
}
```
服务端渲染时对react组件中引用的上述格式的文件忽略, 如果有其他需要忽略的格式出现,请在此处添加

## controllers/interface目录
对访问地址上的参数service,appid,funid做处理

## controllers/request/base/request_base.js

```
execute(config) {
    let serverRequest = new ServerRequest(this.nodeRequest);

    if (config) {
        serverRequest.recreatePostData(config.sendData);
        serverRequest.funid = config.funId;
        serverRequest.finish = config.finish;
        if (config.service) {
            serverRequest.service = config.service;
        }
    }
    this.doRequest(serverRequest);
}
```
node转发请求到tomcat的通用实现流程,如果有特殊需求,可基于RequestBase类扩展

## controllers/template_helper目录
旧的纯粹使用art-template的模板方法,用react做服务端渲染的请无视这个文件夹

# views(视图层)部分代码解释

## cfg文件夹
- 结构与其他项目webpack配置结构一样,同样是在location新增/修改页面入口
- node-env模块获取参数对应本文档上述的"环境变量说明"
- 配合webpack.config实现了react热更新

## common/footer.html
- withPlatformFunctions这个参数对应链接上的wpf,指定是否下发jsbridge代码,如果项目在app内打开不需要jsbridge或者是外部(比如微信)打开,这个时候可以指定链接上的wpf参数为0(不下发),默认下发.

## common/components
写本文档的时候只写了两个顶层公共组件Toast和Loading
(以Toast组件为例作简要使用说明)

```
import './styles/toast.scss';
import React from 'react';
import storeActions from '../modules/store-actions';
let toastTimeout = null;
/**
 *  渲染Toast
 */
export default class Toast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: 0
        }
    }
    toast = (toastText, toastState = 1) => {
        //立即隐藏toast
        if(toastState !== 1) {
            toastTimeout && window.clearTimeout(toastTimeout);
            this.setState({
                show: 0
            });
            return;
        }
        if(!toastText) {
            return;
        }
        this.setState({
            toastText: toastText,
            show: 1
        });
        //如果toast状态为展示中,清除倒计时并重新执行
        toastTimeout && window.clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            this.setState({
                show: 0
            });
        }, 3000);
    }
    componentDidMount() {
        storeActions.toast.add(this.toast);
    }
    render() {
        return (
            <div className={`toast_container${this.state.show === 1 ? '' : ' setnone'}`}>
                <div className="toast_tips">{this.state.toastText}</div>
            </div>
        );
    }
}
```
结合storeActions模块

```
import signals from 'signals';
/**
 * 全局事件系统
 */
const Signal = signals.Signal;
const storeActions = {
    toast: new Signal(),
    loading: new Signal(),
    overlay: new Signal()
};

export default storeActions;
```
#### Toast组件使用方法:
1. 在程序的适当位置引入(譬如App)

```
import Toast from './**/common/components/toast';
......
render() {
    ......
    <Toast />
}
```
2. 在需要使用toast的模块/组件内引入storeActions
```
import storeActions from './**/common/modules/store-actions';
......
storeActions.toast.dispatch('hello');
```
#### 注:
当程序需要实现一些跨组件通信的需求的时候,可参考实现.(有调研过Redux,觉得暂时对于我们的应用还不是很必要,会增加程序复杂度)

## projectXXX/index.jsx

```
ReactDOM.render(
    <AppContainer>
        <App data={initialState}/>
    </AppContainer>,
    document.getElementById('react-html-container')
);
if (module.hot) {
    module.hot.accept('./components/app', () => {
        require('./components/app');
        ReactDOM.render(
            <AppContainer>
                <App data={initialState}/>
            </AppContainer>,
            document.getElementById('react-html-container')
        );
    });
}
```
#### 实现热更新
修改components/app下的无论是同步import还是异步require.ensure的模块,浏览器会在不刷新页面的前提下实现更新(由于样式文件被提取后热更新会失败,开发时统一设置不提取,即本文档提到的VEXTRACT环境变量)

#### 无论服务端还是客户端渲染,顶层组件(App)都带有一个data的props
![image](http://img.xmiles.cn/frontend_service/youdao/QQ20170306-103923@2x.png)

为了方便,在模块App中将其放置到一个可供其他模块访问的对象中

```
//把静态数据写到storeStatics
Object.assign(storeStatics, {
    phead: props.data.phead,
    browser: props.data.browser
});
```
特别说明一下browser对象下面的isapp元素,它的值是从链接上获取的,当我们在服务端渲染UI需要判断是否在app内的时候就可以用它去判断.为了避免误会,如果链接上不带isapp这个参数,browser对象中的isapp为undefined

#### http(s)切换
为了frontend_service使用不同协议都能正常访问,服务层requestBase类会使用不同的协议向tomcat发送请求,而在view层中,写页面时则需要对资源访问地址做一些处理
- 对服务器下发的外链资源,统一接入utils.getFormatImg方法处理

```
getFormatImg(src, param = '0') {
    const browser = storeStatics.browser;
    if (!src || typeof src !== 'string') {
        return '';
    }
    //远程服务器图片删除protocol
    if (src.indexOf('https://') === 0) {
        src = src.slice(6, src.length);
    } else if (src.indexOf('http://') === 0) {
        src = src.slice(5, src.length);
    }
    if (!src.includes('imageView2') && !src.includes('.gif')) {
        if (browser.isSupportWebp) {
            src += '?imageView2/' + param + '/format/webp';
        } else if (src.includes('.png') || src.includes('.tmp')) {
            src += '?imageView2/' + param + '/format/png';
        } else {
            src += '?imageView2/' + param + '/format/jpg';
        }
    }
    return src;
}
```

- 对自行上传的七牛资源,粘贴时请去除协议
```
<img src="//img.xmiles.cn/xxxxxxx.png" />
```

# 测试
可参考[http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)
#### 全局安装mocha

```
npm i mocha -g
```

#### webstorm集成mocha
![image](http://img.xmiles.cn/frontend_service/youdao/QQ20170228-172211.png)
这只是其中一种配置方法,也可以使用babel-node

#### 参数说明

```
mocha './app/test/**/*.@(js|jsx)' --recursive --compilers js:babel-register --colors --bail -t 20000
```
- './app/test/**/*.test.@(js|jsx)' --recursive----测试app/test目录下全部.test.js(jsx)
- --compilers js:babel-register--------------babel-register编译
- --bail-------------------------------------第一个测试用例失败后终止测试
- -t 20000---------------------------------主要用于异步测试的timeout控制,单位为ms

#### 测试命令(参考根目录下的build.sh文件)
```
//windows下用set
export IS_LOCAL=1&&export NODE_ENV=production&&export SERV_ENV=official&&npm test
```

# 部署流程
(参考根目录下的build.sh,build.gradle文件以及jenkins配置)

# 其他说明
### .babelrc
所有经过babel编译这一步都会用到,谨慎修改,比如app目录和views目录的打包都用到
### .eslintrc
js语法检测
### .npmrc
对一些github上即使设置了代理下载仍然很慢的资源使用国内地址
### pass_xx.passwd
服务器账户密码,用文件而不是直接使用字符串是因为当密码有特殊字符时不知道怎么处理才能登陆上去
### start.config.js
pm2 启动文件
#### 启动命令

```
//windows下用set
export START_PORT=13363&&pm2 start start.config.js --env dev
```
其中--env dev指定环境变量,启动正式服务器时不需要这个参数

## logs
pm2的log暂时还没有很好的利用起来,只是做一些线上调试的时候使用
