# test ssh 部署脚本

cd /data/node/frontend/

echo '更新test分支代码'
git pull
if [ $? -ne 0 ]; then
    echo '更新 失败'
    exit 1
else
    echo '更新 成功'
fi

echo '切换glibc-2.14'
export LD_LIBRARY_PATH=/opt/glibc-2.14/lib:$LD_LIBRARY_PATH

echo '服务端代码转译'
npm run deploy
if [ $? -ne 0 ]; then
    echo '服务端代码转译 失败'
    exit 1
else
    echo '服务端代码转译 成功'
fi

echo '前端代码转译'
export VNAME=fanli&&export VDEPLOY=1&&export VCLEAN=1&&export VEXTRACT=1&&npm run deploy-page
if [ $? -ne 0 ]; then
    echo '前端代码转译 失败'
    exit 1
else
    echo '前端代码转译 成功'
fi

echo '把文件放到部署环境frontend_13363'
tar -cf frontend.tar views/ dist/ bin/ public/ .babelrc .npmrc package.json package-lock.json webpack.config.babel.js start.config.js
if [ $? -ne 0 ]; then
    echo '压缩 失败'
    exit 1
else
    echo '压缩 成功'
fi

cp frontend.tar ../frontend_13363/
if [ $? -ne 0 ]; then
    echo '复制 失败'
    exit 1
else
    echo '复制 成功'
fi

cd ../frontend_13363

tar -xf frontend.tar
if [ $? -ne 0 ]; then
    echo '解压 失败'
    exit 1
else
    echo '解压 成功'
fi

echo '重启服务'
export START_PORT=13363&&pm2 restart start.config.js --env dev

