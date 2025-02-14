"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.entryCache = void 0;
const loader_utils_1 = require("loader-utils");
exports.entryCache = new Map();
function default_1() {
    const { name } = (0, loader_utils_1.getOptions)(this);
    if (name && exports.entryCache.has(name)) {
        const content = exports.entryCache.get(name);
        exports.entryCache.delete(name);
        return content;
    }
}
exports.default = default_1;
//# sourceMappingURL=entry-cache.js.map