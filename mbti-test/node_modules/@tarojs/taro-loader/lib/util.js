"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPkgVersion = exports.getRootPath = void 0;
const helper_1 = require("@tarojs/helper");
const path = require("path");
function getRootPath() {
    return path.resolve(__dirname, '../');
}
exports.getRootPath = getRootPath;
function getPkgVersion() {
    const pkgPath = path.join(getRootPath(), 'package.json');
    if (helper_1.fs.existsSync(pkgPath)) {
        return require(pkgPath).version;
    }
    return 'unknown';
}
exports.getPkgVersion = getPkgVersion;
//# sourceMappingURL=util.js.map