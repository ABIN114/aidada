"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MF_NAME = exports.moduleRE = exports.importsRE = exports.singlelineCommentsRE = exports.multilineCommentsRE = exports.langRE = exports.scriptRE = exports.commentRE = exports.assetsRE = exports.virtualModuleRE = exports.virtualModulePrefix = void 0;
const KNOWN_ASSET_TYPES = [
    // css
    'css',
    'less',
    'sass',
    'scss',
    'styl',
    'stylus',
    'pcss',
    'postcss',
    // json
    'json',
    // images
    'png',
    'jpe?g',
    'gif',
    'svg',
    'ico',
    'webp',
    'avif',
    // media
    'mp4',
    'webm',
    'ogg',
    'mp3',
    'wav',
    'flac',
    'aac',
    // fonts
    'woff2?',
    'eot',
    'ttf',
    'otf',
    // other
    'wasm',
    'webmanifest',
    'pdf',
    'txt'
];
exports.virtualModulePrefix = 'virtual-module:';
exports.virtualModuleRE = new RegExp(`^${exports.virtualModulePrefix}`);
exports.assetsRE = new RegExp(`\\.(${KNOWN_ASSET_TYPES.join('|')})$`);
exports.commentRE = /<!--(.|[\r\n])*?-->/;
exports.scriptRE = /(<script\b(?:\s[^>]*>|>))(.*?)<\/script>/gims;
exports.langRE = /\blang\s*=\s*(?:"([^"]+)"|'([^']+)'|([^\s'">]+))/im;
exports.multilineCommentsRE = /\/\*(.|[\r\n])*?\*\//gm;
exports.singlelineCommentsRE = /\/\/.*/g;
// A simple regex to detect import sources. This is only used on
// <script lang="ts"> blocks in vue (setup only) or svelte files, since
// seemingly unused imports are dropped by esbuild when transpiling TS which
// prevents it from crawling further.
// We can't use es-module-lexer because it can't handle TS, and don't want to
// use Acorn because it's slow. Luckily this doesn't have to be bullet proof
// since even missed imports can be caught at runtime, and false positives will
// simply be ignored.
exports.importsRE = /(?<!\/\/.*)(?<=^|;|\*\/)\s*import(?!\s+type)(?:[\w*{}\n\r\t, ]+from\s*)?\s*("[^"]+"|'[^']+')\s*(?=$|;|\/\/|\/\*)/gm;
exports.moduleRE = /^[^./\\][^:]/;
exports.MF_NAME = 'taro_app_library';
//# sourceMappingURL=constant.js.map