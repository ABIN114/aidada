"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePublicPath = exports.formatOpenHost = exports.addHtmlSuffix = exports.stripTrailingSlash = exports.stripBasename = exports.hasBasename = exports.addTrailingSlash = exports.addLeadingSlash = exports.getRootPath = exports.emptyTogglableObj = void 0;
const os_1 = require("os");
const path_1 = __importDefault(require("path"));
exports.emptyTogglableObj = {
    enable: false,
    config: {}
};
const getRootPath = function () {
    return path_1.default.resolve(__dirname, '../../');
};
exports.getRootPath = getRootPath;
const addLeadingSlash = (url = '') => (url.charAt(0) === '/' ? url : '/' + url);
exports.addLeadingSlash = addLeadingSlash;
const addTrailingSlash = (url = '') => (url.charAt(url.length - 1) === '/' ? url : url + '/');
exports.addTrailingSlash = addTrailingSlash;
const hasBasename = (path = '', prefix = '') => new RegExp('^' + prefix + '(\\/|\\?|#|$)', 'i').test(path) || path === prefix;
exports.hasBasename = hasBasename;
const stripBasename = (path = '', prefix = '') => (0, exports.hasBasename)(path, prefix) ? path.substr(prefix.length) : path;
exports.stripBasename = stripBasename;
const stripTrailingSlash = (path = '') => (path.charAt(path.length - 1) === '/' ? path.substring(0, path.length - 1) : path);
exports.stripTrailingSlash = stripTrailingSlash;
const addHtmlSuffix = (path = '') => `${path}.html`;
exports.addHtmlSuffix = addHtmlSuffix;
const formatOpenHost = (host) => {
    var _a;
    let result = host;
    // 配置host为0.0.0.0时,可以转换为ip打开, 其他以配置host默认打开
    if (!result || result === '0.0.0.0' || result.startsWith('local-ip')) {
        // 设置localhost为初值, 防止没正确获取到host时以0.0.0.0打开
        result = 'localhost';
        const interfaces = (0, os_1.networkInterfaces)();
        for (const devName in interfaces) {
            const isEnd = (_a = interfaces[devName]) === null || _a === void 0 ? void 0 : _a.some(item => {
                // 取IPv4, 不为127.0.0.1的内网ip
                if (['IPv4', 4, '4'].includes(item.family) && item.address !== '127.0.0.1' && !item.internal) {
                    result = item.address;
                    return true;
                }
                return false;
            });
            // 若获取到ip, 结束遍历
            if (isEnd) {
                break;
            }
        }
    }
    return result;
};
exports.formatOpenHost = formatOpenHost;
function parsePublicPath(publicPath = '/') {
    return ['', 'auto'].includes(publicPath) ? publicPath : (0, exports.addTrailingSlash)(publicPath);
}
exports.parsePublicPath = parsePublicPath;
//# sourceMappingURL=index.js.map