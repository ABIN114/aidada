"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const path = require("path");
const constants_1 = require("./constants");
const entry_cache_1 = require("./entry-cache");
function default_1(source) {
    var _a;
    const options = (0, loader_utils_1.getOptions)(this);
    const config = getPageConfig(options.config, this.resourcePath);
    const configString = JSON.stringify(config);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(this, s);
    const pageName = options.name;
    const { isNeedRawLoader, importFrameworkStatement, mockAppStatement, frameworkArgs, creator, creatorLocation } = options.loaderMeta;
    const appConfig = options.appConfig;
    const frameworkArgsArray = frameworkArgs.split(',');
    frameworkArgsArray.splice(frameworkArgsArray.length - 1, 1, 'appConfig');
    const frameworkArgsCopy = frameworkArgsArray.join(',');
    // raw is a placeholder loader to locate changed .vue resource
    const entryCacheLoader = path.join(__dirname, 'entry-cache.js') + `?name=${pageName}`;
    entry_cache_1.entryCache.set(pageName, source);
    const raw = path.join(__dirname, 'raw.js');
    const componentPath = isNeedRawLoader
        ? ['!', raw, entryCacheLoader, this.resourcePath].join('!')
        : ['!', entryCacheLoader, this.resourcePath].join('!');
    const runtimePath = Array.isArray(options.runtimePath) ? options.runtimePath : [options.runtimePath];
    let setReconcilerPost = '';
    const setReconciler = runtimePath.reduce((res, item) => {
        if (constants_1.REG_POST.test(item)) {
            setReconcilerPost += `import '${item.replace(constants_1.REG_POST, '')}'\n`;
            return res;
        }
        else {
            return res + `import '${item}'\n`;
        }
    }, '');
    const { globalObject } = ((_a = this._compilation) === null || _a === void 0 ? void 0 : _a.outputOptions) || { globalObject: 'wx' };
    const prerender = `
if (typeof PRERENDER !== 'undefined') {
  ${globalObject}._prerender = inst
}`;
    return `${setReconciler}
import { createPageConfig, window } from '@tarojs/runtime'
import { ${creator} } from '${creatorLocation}'
${setReconcilerPost}
${importFrameworkStatement}
var config = ${configString};
var appConfig = ${JSON.stringify(appConfig)};
window.__taroAppConfig = appConfig
${mockAppStatement}
${creator}(App, ${frameworkArgsCopy})
var component = require(${stringify(componentPath)}).default
${config.enableShareTimeline ? 'component.enableShareTimeline = true' : ''}
${config.enableShareAppMessage ? 'component.enableShareAppMessage = true' : ''}
var inst = Page(createPageConfig(component, '${pageName}', {}, config || {}))
${options.prerender ? prerender : ''}
export default component
`;
}
exports.default = default_1;
function getPageConfig(configs, resourcePath) {
    const configPath = removeExt(resourcePath) + '.config';
    for (const name in configs) {
        const config = configs[name];
        if (removeExt(configs[name].path) === configPath) {
            return config.content;
        }
    }
    return {};
}
function removeExt(file) {
    return path.join(path.dirname(file), path.basename(file, path.extname(file)));
}
//# sourceMappingURL=independentPage.js.map