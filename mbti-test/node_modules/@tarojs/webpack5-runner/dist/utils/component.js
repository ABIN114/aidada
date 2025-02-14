"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.componentNameSet = exports.elementNameSet = exports.componentConfig = void 0;
exports.componentConfig = {
    includes: new Set(['view', 'catch-view', 'static-view', 'pure-view', 'scroll-view', 'image', 'static-image', 'text', 'static-text']),
    exclude: new Set(),
    thirdPartyComponents: new Map(),
    includeAll: false
};
// 用户 cache 功能开启时，记录 parser 过程中的组件信息
exports.elementNameSet = new Set();
exports.componentNameSet = new Set();
//# sourceMappingURL=component.js.map