"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasure = exports.commitMeta = exports.getMfHash = exports.formatDepsString = exports.sortDeps = exports.getBundleHash = exports.getHash = exports.isScanIncluded = exports.isOptimizeIncluded = exports.isExclude = exports.getDefines = exports.getCacheDir = exports.flattenId = exports.getResolve = exports.createResolve = void 0;
const helper_1 = require("@tarojs/helper");
const crypto_1 = require("crypto");
const enhanced_resolve_1 = __importDefault(require("enhanced-resolve"));
const path_1 = __importDefault(require("path"));
const perf_hooks_1 = require("perf_hooks");
let resolve;
function createResolve(appPath, resolveOptions) {
    const defaultResolveOptions = {
        conditionNames: ['require', 'import', 'module', 'webpack', 'development', 'browser'],
        aliasFields: ['browser'],
        cache: true,
        mainFiles: ['index'],
        exportsFields: ['exports'],
        roots: appPath
    };
    const resolver = enhanced_resolve_1.default.create(Object.assign(Object.assign({}, defaultResolveOptions), resolveOptions));
    resolve = function (importer, request) {
        return new Promise((resolve, reject) => {
            resolver({}, importer, request, {}, (err, resolvedPath) => {
                if (err)
                    return reject(err);
                resolve(resolvedPath);
            });
        });
    };
}
exports.createResolve = createResolve;
function getResolve() {
    return resolve;
}
exports.getResolve = getResolve;
function flattenId(id) {
    return id.replace(/(\s*>\s*)/g, '__').replace(/[/.:]/g, '_');
}
exports.flattenId = flattenId;
function getCacheDir(appPath, env = '') {
    return path_1.default.resolve(appPath, './node_modules/.taro', env);
}
exports.getCacheDir = getCacheDir;
function getDefines(chain) {
    let defines;
    if (chain.plugins.has('definePlugin')) {
        chain.plugin('definePlugin').tap(args => {
            defines = Object.assign({}, args[0]);
            Object.keys(defines).forEach(name => {
                if (typeof defines[name] !== 'string') {
                    delete defines[name];
                }
            });
            return args;
        });
    }
    return defines;
}
exports.getDefines = getDefines;
function isExclude(id, excludes) {
    return Boolean(excludes.find(item => {
        const dollarTailRE = /\$$/;
        if (item instanceof RegExp) {
            return item.test(id);
        }
        else if (dollarTailRE.test(item)) {
            // 全路径匹配
            item = item.replace(dollarTailRE, '');
            if (item === id)
                return true;
        }
        else {
            if (item === id || id.startsWith(item + '/'))
                return true;
        }
    }));
}
exports.isExclude = isExclude;
function isOptimizeIncluded(path) {
    return /\.m?[jt]sx?$/.test(path);
}
exports.isOptimizeIncluded = isOptimizeIncluded;
function isScanIncluded(path) {
    return /\.vue/.test(path);
}
exports.isScanIncluded = isScanIncluded;
function getHash(content) {
    return (0, crypto_1.createHash)('sha256').update(content).digest('hex').substring(0, 8);
}
exports.getHash = getHash;
function getBundleHash(appPath, deps, chain, cacheDir) {
    return __awaiter(this, void 0, void 0, function* () {
        const defines = getDefines(chain);
        const lockfiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
        const lockfilesContents = yield Promise.all(lockfiles.map(item => {
            return new Promise(resolve => {
                helper_1.fs.readFile(path_1.default.join(appPath, item))
                    .then(content => resolve(content.toString()))
                    .catch(() => resolve(''));
            });
        }));
        return getHash(formatDepsString(deps) +
            lockfilesContents.join('\n') +
            JSON.stringify(defines) +
            cacheDir);
    });
}
exports.getBundleHash = getBundleHash;
const sortDeps = (a, b) => {
    const x = typeof a === 'string' ? a : a[0];
    const y = typeof b === 'string' ? b : b[0];
    return x.localeCompare(y);
};
exports.sortDeps = sortDeps;
function formatDepsString(deps) {
    const list = Array.from(deps.entries()).sort(exports.sortDeps);
    return JSON.stringify(list);
}
exports.formatDepsString = formatDepsString;
function getMfHash(obj) {
    return getHash(JSON.stringify(obj));
}
exports.getMfHash = getMfHash;
function commitMeta(appPath, metadataPath, metadata) {
    return __awaiter(this, void 0, void 0, function* () {
        // Todo: 改为相对路径
        yield helper_1.fs.writeJSON(metadataPath, metadata, {
            spaces: 2,
            replacer(key, value) {
                if (value instanceof Set) {
                    return Array.from(value);
                }
                if (key === 'taroRuntimeBundlePath') {
                    return path_1.default.relative(appPath, value);
                }
                return value;
            }
        });
    });
}
exports.commitMeta = commitMeta;
function getMeasure(isLogTiming) {
    return function (name, start) {
        if (isLogTiming) {
            const now = perf_hooks_1.performance.now();
            const duration = now - start;
            console.log(helper_1.chalk.cyan(`${name}: ${Math.round(duration)}ms\n`));
        }
    };
}
exports.getMeasure = getMeasure;
__exportStar(require("./path"), exports);
__exportStar(require("./webpack"), exports);
//# sourceMappingURL=index.js.map