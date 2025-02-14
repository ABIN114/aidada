"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsePublicPath = exports.addTrailingSlash = exports.addLeadingSlash = void 0;
const addLeadingSlash = (url = '') => (url.charAt(0) === '/' ? url : '/' + url);
exports.addLeadingSlash = addLeadingSlash;
const addTrailingSlash = (url = '') => (url.charAt(url.length - 1) === '/' ? url : url + '/');
exports.addTrailingSlash = addTrailingSlash;
function parsePublicPath(publicPath = '/') {
    return ['', 'auto'].includes(publicPath) ? publicPath : (0, exports.addTrailingSlash)(publicPath);
}
exports.parsePublicPath = parsePublicPath;
//# sourceMappingURL=path.js.map