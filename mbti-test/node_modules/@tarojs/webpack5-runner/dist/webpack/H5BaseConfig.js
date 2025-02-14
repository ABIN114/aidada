"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H5BaseConfig = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const resolve_1 = require("resolve");
const BaseConfig_1 = require("./BaseConfig");
class H5BaseConfig extends BaseConfig_1.BaseConfig {
    constructor(appPath, config) {
        super(appPath, config);
        this.defaultTerserOptions = {
            keep_fnames: true,
            output: {
                comments: false,
                keep_quoted_props: true,
                quote_keys: true,
                beautify: false
            },
            warnings: false
        };
        const mainFields = [...helper_1.defaultMainFields];
        if (config.mode !== 'production') {
            mainFields.unshift('main:h5');
        }
        const resolveOptions = {
            basedir: appPath,
            packageFilter: (pkg, pkgFile) => {
                for (let i = 0; i < mainFields.length; i++) {
                    try {
                        const mainFile = pkg[mainFields[i]];
                        if (mainFile && (0, resolve_1.sync)(path_1.default.resolve(pkgFile, mainFile))) {
                            pkg.main = mainFile;
                            break;
                        }
                    }
                    catch (e) { } // eslint-disable-line no-empty
                }
                return pkg;
            },
        };
        this.chain.merge({
            resolve: {
                mainFields,
                alias: {
                    // Note: link 本地依赖调试，runtime 包需要指向本地 node_modules 顶层的 runtime，保证闭包值 Current 一致，shared 也一样
                    '@tarojs/runtime': (0, resolve_1.sync)('@tarojs/runtime', resolveOptions),
                    '@tarojs/shared': (0, resolve_1.sync)('@tarojs/shared', resolveOptions),
                },
            },
        });
        this.setMinimizer(config, this.defaultTerserOptions);
    }
}
exports.H5BaseConfig = H5BaseConfig;
//# sourceMappingURL=H5BaseConfig.js.map