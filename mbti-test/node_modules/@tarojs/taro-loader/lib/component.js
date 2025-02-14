"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_utils_1 = require("loader-utils");
const path = require("path");
const entry_cache_1 = require("./entry-cache");
function default_1(source) {
    var _a;
    const options = (0, loader_utils_1.getOptions)(this);
    const stringify = (s) => (0, loader_utils_1.stringifyRequest)(this, s);
    const pageName = options.name;
    const { isNeedRawLoader } = options.loaderMeta;
    // raw is a placeholder loader to locate changed .vue resource
    const raw = path.join(__dirname, 'raw.js');
    const entryCacheLoader = path.join(__dirname, 'entry-cache.js') + `?name=${pageName}`;
    entry_cache_1.entryCache.set(pageName, source);
    const componentPath = isNeedRawLoader
        ? ['!', raw, entryCacheLoader, this.resourcePath].join('!')
        : ['!', entryCacheLoader, this.resourcePath].join('!');
    const { globalObject } = ((_a = this._compilation) === null || _a === void 0 ? void 0 : _a.outputOptions) || { globalObject: 'wx' };
    const prerender = `
if (typeof PRERENDER !== 'undefined') {
  ${globalObject}._prerender = inst
}`;
    return `import { createComponentConfig } from '@tarojs/runtime'
import component from ${stringify(componentPath)}
var inst = Component(createComponentConfig(component, '${pageName}'))
${options.prerender ? prerender : ''}
export default component
`;
}
exports.default = default_1;
//# sourceMappingURL=component.js.map