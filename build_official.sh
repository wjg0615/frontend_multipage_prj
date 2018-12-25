#!/bin/sh
echo $1
node -v

deployOfficialServer=true
user=xxx
host='127.0.0.1'
passFile='pass_x.passwd'

echo deployOfficialServer: ${deployOfficialServer}
echo user: ${user}
echo host: ${host}
echo passFile: ${passFile}

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

echo '单元测试'
export IS_LOCAL=1&&export NODE_ENV=production&&export SERV_ENV=official&&npm test

if [ $? -ne 0 ]; then
    echo '单元测试 失败'
    exit 1
else
    echo '单元测试 成功'
fi

echo '压缩需要部署的目录及文件'
zip -r -q frontend_xmaili_service.zip app/ views/ dist/ bin/ public/ .babelrc .npmrc package.json package-lock.json webpack.config.babel.js start.config.js qn_deploy.sh pass_x.passwd

if [ $? -ne 0 ]; then
    echo '压缩需要部署的目录及文件 失败'
    exit 1
else
    echo '压缩需要部署的目录及文件 成功'
fi

echo '上传文件'
sshpass -f ${passFile} scp ./frontend.zip ${user}@${host}:/data/node/frontend_13363/

if [ $? -ne 0 ]; then
    echo '上传文件 失败'
    exit 1
else
    echo '上传文件 成功'
fi

echo "部署正式"
gradle -q deployOfficial --info -PisOfficial="${deployOfficialServer}"