"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.externalEsbuildModule = void 0;
const path_1 = require("path");
function externalEsbuildModule({ path, namespace, importer, pluginData }) {
    if (namespace === 'file' && importer && path) {
        path = (0, path_1.resolve)(importer, path);
    }
    return {
        path,
        namespace,
        pluginData,
        external: true
    };
}
exports.externalEsbuildModule = externalEsbuildModule;
//# sourceMappingURL=utils.js.map