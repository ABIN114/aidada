"use strict";
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
exports.Combination = void 0;
const helper_1 = require("@tarojs/helper");
const runner_utils_1 = require("@tarojs/runner-utils");
const shared_1 = require("@tarojs/shared");
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const component_1 = require("../utils/component");
class Combination {
    constructor(appPath, config) {
        var _a, _b;
        this.isWeb = (0, shared_1.isWebPlatform)();
        /** special mode */
        // 将组件打包为原生模块
        this.isBuildNativeComp = false;
        // 正常打包页面的同时，把组件也打包成独立的原生模块
        this.newBlended = false;
        this.appPath = appPath;
        this.rawConfig = config;
        this.sourceRoot = config.sourceRoot || 'src';
        this.outputRoot = config.outputRoot || 'dist';
        this.sourceDir = path_1.default.resolve(appPath, this.sourceRoot);
        this.outputDir = path_1.default.resolve(appPath, this.outputRoot);
        this.isBuildNativeComp = !!config.isBuildNativeComp;
        this.newBlended = !!config.newBlended;
        this.enableSourceMap = (_b = (_a = config.enableSourceMap) !== null && _a !== void 0 ? _a : config.isWatch) !== null && _b !== void 0 ? _b : process.env.NODE_ENV !== 'production';
    }
    make() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.pre(this.rawConfig);
            this.process(this.config);
            yield this.post(this.config, this.chain);
        });
    }
    process(_config) { }
    pre(rawConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const preMode = rawConfig.mode || process.env.NODE_ENV;
            const mode = ['production', 'development', 'none'].find(e => e === preMode) ||
                (!rawConfig.isWatch || process.env.NODE_ENV === 'production' ? 'production' : 'development');
            /** process config.sass options */
            const sassLoaderOption = yield (0, runner_utils_1.getSassLoaderOption)(rawConfig);
            this.config = Object.assign(Object.assign({}, rawConfig), { sassLoaderOption,
                mode, frameworkExts: rawConfig.frameworkExts || helper_1.SCRIPT_EXT });
        });
    }
    post(config, chain) {
        return __awaiter(this, void 0, void 0, function* () {
            const { modifyWebpackChain, webpackChain, onWebpackChainReady } = config;
            const data = {
                componentConfig: component_1.componentConfig
            };
            if ((0, shared_1.isFunction)(modifyWebpackChain)) {
                yield modifyWebpackChain(chain, webpack_1.default, data);
            }
            if ((0, shared_1.isFunction)(webpackChain)) {
                webpackChain(chain, webpack_1.default, helper_1.META_TYPE);
            }
            if ((0, shared_1.isFunction)(onWebpackChainReady)) {
                onWebpackChainReady(chain);
            }
        });
    }
    getDevtool(sourceMapType) {
        /** @docs https://webpack.js.org/configuration/devtool/ */
        return this.enableSourceMap && sourceMapType;
    }
    getPrebundleOptions() {
        if (this.isBuildNativeComp)
            return { enable: false };
        if (this.prebundleOptions)
            return this.prebundleOptions;
        const include = ['@tarojs/taro', '@tarojs/runtime'];
        const exclude = [];
        if (this.isWeb) {
            include.push('@tarojs/router');
        }
        else {
            // 小程序编译 Host 时需要扫描 @tarojs/components 的 useExports，因此不能被 external
            exclude.push('@tarojs/components');
        }
        const defaultOptions = {
            enable: this.config.mode !== 'production',
            timings: false,
            force: false,
            include,
            exclude,
            esbuild: {}
        };
        if ((0, shared_1.isObject)(this.config.compiler)) {
            this.prebundleOptions = (0, helper_1.recursiveMerge)({}, defaultOptions, this.config.compiler.prebundle);
        }
        return this.prebundleOptions;
    }
}
exports.Combination = Combination;
//# sourceMappingURL=Combination.js.map