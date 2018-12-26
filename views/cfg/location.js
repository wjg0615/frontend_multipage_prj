import path from 'path';
import projectsPath from './path';

//相关的文件(夹))位置设置
export default function getLocation(name) {
    let currentProject = 'fanli/',
        publicPath = '/qn/views/fanli/bundle/',
        pagesPath = {},
        entry = {},
        pages = [];
    switch (name) {
        case 'fanli':
            pagesPath = [
                'test/home'
            ];
            break;
        case 'develop':
            pagesPath = [
                'test/home'
            ];
            break;
        default:
            break;
    }
    pagesPath.map((value) => {
        var name = value.replace(/[\/-](\w)/g, function($0, $1) {
            return $1.toUpperCase();
        });
        entry[name] = path.resolve(projectsPath, currentProject + value + '/entry/entry.js');
        pages.push({
            entry: path.resolve(projectsPath, currentProject + value + '/index.dev.html'),
            output: path.resolve(projectsPath, currentProject + value + '/index.html'),
            matches: {
                js: name,
                css: name
            }
        });
    });
    return {
        currentProject: currentProject,
        entry: entry,
        publicPath: publicPath,
        pages: pages
    };
}