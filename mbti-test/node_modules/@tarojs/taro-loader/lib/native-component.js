"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const path = require("path");
const entry_cache_1 = require("./entry-cache");
const page_1 = require("./page");
function default_1(source) {
    var _a;
    const options = (0, loader_utils_1.getOptions)(this);
    const { loaderMeta = {}, config: loaderConfig, isNewBlended = false, runtimePath } = options;
    const { importFrameworkStatement, frameworkArgs, isNeedRawLoader, creatorLocation } = loaderMeta;
    const config = (0, page_1.getPageConfig)(loaderConfig, this.resourcePath);
    config.isNewBlended = isNewBlended;
    const configString = JSON.stringify(config);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(this, s);
    const pageName = options.name;
    // raw is a placeholder loader to locate changed .vue resource
    const entryCacheLoader = path.join(__dirname, 'entry-cache.js') + `?name=${pageName}`;
    entry_cache_1.entryCache.set(pageName, source);
    const raw = path.join(__dirname, 'raw.js');
    const componentPath = isNeedRawLoader
        ? ['!', raw, entryCacheLoader, this.resourcePath].join('!')
        : ['!', entryCacheLoader, this.resourcePath].join('!');
    const processedRuntimePath = Array.isArray(runtimePath) ? runtimePath : [runtimePath];
    const setReconciler = processedRuntimePath.reduce((res, item) => {
        if (/^@tarojs\/plugin-(react|vue)-devtools/.test(item))
            return res;
        return res + `import '${item}'\n`;
    }, '');
    const { globalObject } = ((_a = this._compilation) === null || _a === void 0 ? void 0 : _a.outputOptions) || { globalObject: 'wx' };
    const prerender = `
if (typeof PRERENDER !== 'undefined') {
  ${globalObject}._prerender = inst
}`;
    return `${setReconciler}
import { createNativeComponentConfig } from '${creatorLocation}'
${importFrameworkStatement}
var component = require(${stringify(componentPath)}).default
var config = ${configString};
var inst = Component(createNativeComponentConfig(component, ${frameworkArgs}))
${options.prerender ? prerender : ''}
export default component
`;
}
exports.default = default_1;
//# sourceMappingURL=native-component.js.map