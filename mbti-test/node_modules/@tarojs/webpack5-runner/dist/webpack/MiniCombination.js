"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniCombination = void 0;
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const component_1 = require("../utils/component");
const BuildNativePlugin_1 = require("./BuildNativePlugin");
const Combination_1 = require("./Combination");
const MiniBaseConfig_1 = require("./MiniBaseConfig");
const MiniWebpackModule_1 = require("./MiniWebpackModule");
const MiniWebpackPlugin_1 = require("./MiniWebpackPlugin");
class MiniCombination extends Combination_1.Combination {
    constructor() {
        super(...arguments);
        this.isBuildPlugin = false;
        this.optimizeMainPackage = {
            enable: true
        };
    }
    process(config) {
        const baseConfig = new MiniBaseConfig_1.MiniBaseConfig(this.appPath, config);
        const chain = this.chain = baseConfig.chain;
        const { entry = {}, output = {}, mode = 'production', globalObject = 'wx', sourceMapType = 'cheap-module-source-map', fileType = {
            style: '.wxss',
            config: '.json',
            script: '.js',
            templ: '.wxml'
        }, 
        /** special mode */
        isBuildPlugin = false, 
        /** hooks */
        modifyComponentConfig, optimizeMainPackage } = config;
        this.fileType = fileType;
        modifyComponentConfig === null || modifyComponentConfig === void 0 ? void 0 : modifyComponentConfig(component_1.componentConfig, config);
        if (isBuildPlugin) {
            // 编译目标 - 小程序原生插件
            this.isBuildPlugin = true;
            this.buildNativePlugin = BuildNativePlugin_1.BuildNativePlugin.getPlugin(this);
            chain.merge({
                context: path_1.default.join(process.cwd(), this.sourceRoot, 'plugin')
            });
        }
        if (optimizeMainPackage) {
            this.optimizeMainPackage = optimizeMainPackage;
        }
        const webpackEntry = this.getEntry(entry);
        const webpackOutput = this.getOutput({
            publicPath: '/',
            globalObject,
            isBuildPlugin,
            output
        });
        const webpackPlugin = new MiniWebpackPlugin_1.MiniWebpackPlugin(this);
        const webpackModule = new MiniWebpackModule_1.MiniWebpackModule(this);
        const module = webpackModule.getModules();
        const [, pxtransformOption] = webpackModule.__postcssOption.find(([name]) => name === 'postcss-pxtransform') || [];
        webpackPlugin.pxtransformOption = pxtransformOption;
        const plugin = webpackPlugin.getPlugins();
        chain.merge({
            entry: webpackEntry,
            output: webpackOutput,
            mode,
            devtool: this.getDevtool(sourceMapType),
            resolve: {
                alias: this.getAlias()
            },
            plugin,
            module,
            optimization: this.getOptimization()
        });
    }
    getEntry(entry) {
        return this.isBuildPlugin ? this.buildNativePlugin.entry : entry;
    }
    getOutput({ publicPath, globalObject, isBuildPlugin, output }) {
        return Object.assign({ path: this.outputDir, publicPath, filename: '[name].js', chunkFilename: '[name].js', globalObject, enabledLibraryTypes: isBuildPlugin ? ['commonjs'] : [] }, output);
    }
    getAlias() {
        const { alias = {}, taroComponentsPath } = this.config;
        return Object.assign(Object.assign({}, alias), { [`${helper_1.taroJsComponents}$`]: taroComponentsPath || `${helper_1.taroJsComponents}/mini` });
    }
    getOptimization() {
        return {
            usedExports: true,
            runtimeChunk: {
                name: 'runtime'
            },
            splitChunks: {
                chunks: 'all',
                maxInitialRequests: Infinity,
                minSize: 0,
                cacheGroups: {
                    default: false,
                    defaultVendors: false,
                    common: {
                        name: 'common',
                        minChunks: 2,
                        priority: 1
                    },
                    vendors: {
                        name: 'vendors',
                        minChunks: 2,
                        test: module => /[\\/]node_modules[\\/]/.test(module.resource),
                        priority: 10
                    },
                    taro: {
                        name: 'taro',
                        test: module => /@tarojs[\\/][a-z]+/.test(module.context),
                        priority: 100
                    }
                }
            }
        };
    }
}
exports.MiniCombination = MiniCombination;
//# sourceMappingURL=MiniCombination.js.map