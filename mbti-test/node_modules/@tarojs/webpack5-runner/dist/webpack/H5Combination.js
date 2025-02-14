"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.H5Combination = void 0;
const resolve_1 = require("resolve");
const webpack_virtual_modules_1 = __importDefault(require("webpack-virtual-modules"));
const utils_1 = require("../utils");
const app_1 = __importDefault(require("../utils/app"));
const component_1 = require("../utils/component");
const Combination_1 = require("./Combination");
const H5BaseConfig_1 = require("./H5BaseConfig");
const H5WebpackModule_1 = require("./H5WebpackModule");
const H5WebpackPlugin_1 = require("./H5WebpackPlugin");
const WebpackPlugin_1 = __importDefault(require("./WebpackPlugin"));
class H5Combination extends Combination_1.Combination {
    constructor() {
        super(...arguments);
        this.webpackPlugin = new H5WebpackPlugin_1.H5WebpackPlugin(this);
        this.webpackModule = new H5WebpackModule_1.H5WebpackModule(this);
        this.isMultiRouterMode = false;
        this.isVirtualEntry = false;
    }
    process(config) {
        var _a, _b, _c;
        const baseConfig = new H5BaseConfig_1.H5BaseConfig(this.appPath, config);
        const chain = this.chain = baseConfig.chain;
        const { entry = {}, output = {}, entryFileName = 'app', mode = 'production', sourceMapType = 'eval-cheap-module-source-map', publicPath = '/', chunkDirectory = 'chunk', alias = {}, defineConstants = {}, router, frameworkExts, 
        /** hooks */
        modifyComponentConfig, } = config;
        const externals = [];
        const routerMode = (router === null || router === void 0 ? void 0 : router.mode) || 'hash';
        this.isMultiRouterMode = routerMode === 'multi';
        this.appHelper = new app_1.default(entry, {
            sourceDir: this.sourceDir,
            frameworkExts,
            entryFileName,
            alias,
            defineConstants,
        });
        modifyComponentConfig === null || modifyComponentConfig === void 0 ? void 0 : modifyComponentConfig(component_1.componentConfig, config);
        const virtualEntryMap = {};
        if (this.isBuildNativeComp) {
            delete entry[entryFileName];
            this.appHelper.compsConfigList.forEach((comp, index) => {
                try {
                    (0, resolve_1.sync)(comp, { extensions: ['.js', '.ts'] });
                }
                catch (e) {
                    // 报错证明没有入口文件，通过虚拟模块补全入口文件
                    this.isVirtualEntry = true;
                    // 添加后缀，否则 module.resource 解析出来的 name 是不带后缀的，导致 h5-loader 无法加入编译流程
                    comp += '.js';
                    virtualEntryMap[comp] = 'export default {}';
                }
                entry[index] = [comp];
            });
            this.webpackPlugin.pages = (_a = this.appHelper.appConfig) === null || _a === void 0 ? void 0 : _a.components;
        }
        else if (this.isMultiRouterMode) {
            delete entry[entryFileName];
            this.appHelper.pagesConfigList.forEach((page, index) => {
                entry[index] = [page];
            });
            this.webpackPlugin.pages = (_b = this.appHelper.appConfig) === null || _b === void 0 ? void 0 : _b.pages;
        }
        const webpackOutput = this.getOutput({
            publicPath,
            chunkDirectory,
            customOutput: output,
            entryFileName
        });
        const module = this.webpackModule.getModules();
        const [, pxtransformOption] = this.webpackModule.__postcssOption.find(([name]) => name === 'postcss-pxtransform') || [];
        this.webpackPlugin.pxtransformOption = pxtransformOption;
        const plugin = this.webpackPlugin.getPlugins();
        if (this.isBuildNativeComp) {
            if (this.isVirtualEntry) {
                plugin.VirtualModule = WebpackPlugin_1.default.getPlugin(webpack_virtual_modules_1.default, [virtualEntryMap]);
            }
            // Note: 当开发者没有配置时，优先使用 module 导出组件
            if (!webpackOutput.libraryTarget && !((_c = webpackOutput.library) === null || _c === void 0 ? void 0 : _c.type)) {
                webpackOutput.library = {
                    name: webpackOutput.library,
                    type: 'umd',
                };
            }
        }
        chain.merge({
            entry,
            output: webpackOutput,
            mode,
            devtool: this.getDevtool(sourceMapType),
            resolve: { alias },
            plugin,
            module,
            optimization: this.getOptimization(mode),
            externals,
        });
    }
    getOutput({ publicPath = '/', chunkDirectory, customOutput = {}, entryFileName = 'app' }) {
        const filename = (chunk) => chunk.runtime === entryFileName ? 'js/[name].js' : '[name].js';
        return Object.assign({ path: this.outputDir, filename, chunkFilename: `${chunkDirectory}/[name].js`, publicPath: (0, utils_1.parsePublicPath)(publicPath) }, customOutput);
    }
    getOptimization(nodeEnv) {
        const isProd = nodeEnv === 'production';
        const cacheGroups = {
            default: false,
            defaultVendors: false,
            common: {
                name: isProd ? false : 'common',
                minChunks: 2,
                priority: 1
            },
            vendors: {
                name: isProd ? false : 'vendors',
                minChunks: 2,
                test: (module) => /[\\/]node_modules[\\/]/.test(module.resource),
                priority: 10
            },
            taro: {
                name: isProd ? false : 'taro',
                test: (module) => /@tarojs[\\/][a-z]+/.test(module.context),
                priority: 100
            }
        };
        const optimization = {
            nodeEnv,
            chunkIds: isProd ? 'deterministic' : 'named',
            removeEmptyChunks: true,
            splitChunks: {
                chunks: 'initial',
                hidePathInfo: true,
                minSize: 0,
                cacheGroups
            }
        };
        if (!isProd) {
            cacheGroups.name = false;
            optimization.runtimeChunk = 'single';
        }
        // 组件编译模式下不做代码分割
        if (this.isBuildNativeComp) {
            optimization.splitChunks = false;
        }
        return optimization;
    }
}
exports.H5Combination = H5Combination;
//# sourceMappingURL=H5Combination.js.map