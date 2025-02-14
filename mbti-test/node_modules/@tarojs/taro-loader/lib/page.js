"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageConfig = void 0;
const loader_utils_1 = require("loader-utils");
const path = require("path");
const entry_cache_1 = require("./entry-cache");
function default_1(source) {
    var _a;
    const options = (0, loader_utils_1.getOptions)(this);
    const { config: loaderConfig } = options;
    const config = getPageConfig(loaderConfig, this.resourcePath);
    const configString = JSON.stringify(config);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(this, s);
    const pageName = options.name;
    const { isNeedRawLoader, modifyInstantiate } = options.loaderMeta;
    // raw is a placeholder loader to locate changed .vue resource
    const entryCacheLoader = path.join(__dirname, 'entry-cache.js') + `?name=${pageName}`;
    entry_cache_1.entryCache.set(pageName, source);
    const raw = path.join(__dirname, 'raw.js');
    const componentPath = isNeedRawLoader
        ? ['!', raw, entryCacheLoader, this.resourcePath].join('!')
        : ['!', entryCacheLoader, this.resourcePath].join('!');
    const { globalObject } = ((_a = this._compilation) === null || _a === void 0 ? void 0 : _a.outputOptions) || { globalObject: 'wx' };
    const prerender = `
if (typeof PRERENDER !== 'undefined') {
  ${globalObject}._prerender = inst
}`;
    const hmr = !options.hot ? '' : `if (process.env.NODE_ENV !== 'production') {
  const cache = __webpack_require__.c || {}
  Object.keys(cache).forEach(item => {
    if (item.indexOf('${pageName}') !== -1) delete cache[item]
  })
}`;
    if (typeof options.loaderMeta.modifyConfig === 'function') {
        options.loaderMeta.modifyConfig(config, source);
    }
    let instantiatePage = `var inst = Page(createPageConfig(component, '${pageName}', {root:{cn:[]}}, config || {}))`;
    if (typeof modifyInstantiate === 'function') {
        instantiatePage = modifyInstantiate(instantiatePage, 'page');
    }
    return `import { createPageConfig } from '@tarojs/runtime'
import component from ${stringify(componentPath)}
var config = ${configString};
${config.enableShareTimeline ? 'component.enableShareTimeline = true' : ''}
${config.enableShareAppMessage ? 'component.enableShareAppMessage = true' : ''}
${instantiatePage}
${options.prerender ? prerender : ''}
${hmr}
export default component
`;
}
exports.default = default_1;
function getPageConfig(configs, resourcePath) {
    const configPath = removeExt(resourcePath) + '.config';
    for (const name in configs) {
        const config = configs[name];
        const currentPath = config.path.endsWith('.config') ? config.path : removeExt(config.path);
        if (currentPath === configPath) {
            return config.content;
        }
    }
    return {};
}
exports.getPageConfig = getPageConfig;
function removeExt(file) {
    return path.join(path.dirname(file), path.basename(file, path.extname(file)));
}
//# sourceMappingURL=page.js.map