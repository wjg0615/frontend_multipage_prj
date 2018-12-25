import path from 'path';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import projectsPath from './path';
import nodeEnvInfo from './node-env';

//插件列表
const cleanPlugin = [
    new CleanWebpackPlugin([path.resolve(projectsPath, nodeEnvInfo.currentProject + '/bundle/*')], {
        root: projectsPath,
        verbose: true,
        dry: false
    })
];
export default cleanPlugin;
