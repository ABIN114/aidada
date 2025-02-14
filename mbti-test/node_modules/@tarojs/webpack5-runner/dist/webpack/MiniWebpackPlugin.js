"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniWebpackPlugin = void 0;
const helper_1 = require("@tarojs/helper");
const shared_1 = require("@tarojs/shared");
const BuildNativePlugin_1 = __importDefault(require("../plugins/BuildNativePlugin"));
const MiniCompileModePlugin_1 = __importDefault(require("../plugins/MiniCompileModePlugin"));
const MiniPlugin_1 = __importDefault(require("../plugins/MiniPlugin"));
const MiniSplitChunksPlugin_1 = __importDefault(require("../plugins/MiniSplitChunksPlugin"));
const WebpackPlugin_1 = __importDefault(require("./WebpackPlugin"));
class MiniWebpackPlugin {
    constructor(combination) {
        this.combination = combination;
    }
    getPlugins() {
        var _a;
        const plugins = {
            providerPlugin: this.getProviderPlugin(),
            definePlugin: this.getDefinePlugin(),
            miniCssExtractPlugin: this.getMiniCssExtractPlugin()
        };
        const copyWebpackPlugin = this.getCopyWebpackPlugin();
        if (copyWebpackPlugin)
            plugins.copyWebpackPlugin = copyWebpackPlugin;
        if (!this.combination.isBuildPlugin) {
            /** 需要在 MiniPlugin 前，否则无法获取 entry 地址 */
            const miniSplitChunksPlugin = this.getMiniSplitChunksPlugin();
            if (miniSplitChunksPlugin)
                plugins.miniSplitChunksPlugin = miniSplitChunksPlugin;
        }
        const definePluginOptions = plugins.definePlugin.args[0];
        const mainPlugin = this.getMainPlugin(definePluginOptions);
        plugins.miniPlugin = mainPlugin;
        if (((_a = this.combination.config.experimental) === null || _a === void 0 ? void 0 : _a.compileMode) === true) {
            plugins.taroCompileModePlugin = WebpackPlugin_1.default.getPlugin(MiniCompileModePlugin_1.default, [{
                    combination: this.combination,
                }]);
        }
        return plugins;
    }
    getProviderPlugin() {
        return WebpackPlugin_1.default.getProviderPlugin({
            window: ['@tarojs/runtime', 'window'],
            document: ['@tarojs/runtime', 'document'],
            navigator: ['@tarojs/runtime', 'navigator'],
            requestAnimationFrame: ['@tarojs/runtime', 'requestAnimationFrame'],
            cancelAnimationFrame: ['@tarojs/runtime', 'cancelAnimationFrame'],
            Element: ['@tarojs/runtime', 'TaroElement'],
            SVGElement: ['@tarojs/runtime', 'SVGElement'],
            MutationObserver: ['@tarojs/runtime', 'MutationObserver'],
            history: ['@tarojs/runtime', 'history'],
            location: ['@tarojs/runtime', 'location'],
            URLSearchParams: ['@tarojs/runtime', 'URLSearchParams'],
            URL: ['@tarojs/runtime', 'URL'],
        });
    }
    getDefinePlugin() {
        var _a, _b, _c, _d, _e, _f, _g;
        const { env = {}, runtime = {}, defineConstants = {}, framework = 'react', buildAdapter = helper_1.PLATFORMS.WEAPP } = this.combination.config;
        env.FRAMEWORK = JSON.stringify(framework);
        env.TARO_ENV = JSON.stringify(buildAdapter);
        env.TARO_PLATFORM = JSON.stringify(process.env.TARO_PLATFORM || shared_1.PLATFORM_TYPE.MINI);
        env.SUPPORT_TARO_POLYFILL = env.SUPPORT_TARO_POLYFILL || '"enabled"';
        const envConstants = Object.keys(env).reduce((target, key) => {
            target[`process.env.${key}`] = env[key];
            return target;
        }, {});
        const runtimeConstants = {
            ENABLE_INNER_HTML: (_a = runtime.enableInnerHTML) !== null && _a !== void 0 ? _a : true,
            ENABLE_ADJACENT_HTML: (_b = runtime.enableAdjacentHTML) !== null && _b !== void 0 ? _b : false,
            ENABLE_SIZE_APIS: (_c = runtime.enableSizeAPIs) !== null && _c !== void 0 ? _c : false,
            ENABLE_TEMPLATE_CONTENT: (_d = runtime.enableTemplateContent) !== null && _d !== void 0 ? _d : false,
            ENABLE_CLONE_NODE: (_e = runtime.enableCloneNode) !== null && _e !== void 0 ? _e : false,
            ENABLE_CONTAINS: (_f = runtime.enableContains) !== null && _f !== void 0 ? _f : false,
            ENABLE_MUTATION_OBSERVER: (_g = runtime.enableMutationObserver) !== null && _g !== void 0 ? _g : false
        };
        return WebpackPlugin_1.default.getDefinePlugin([envConstants, defineConstants, runtimeConstants]);
    }
    getCopyWebpackPlugin() {
        const combination = this.combination;
        const { appPath, config } = combination;
        const { copy } = config;
        let copyWebpackPlugin;
        if (copy === null || copy === void 0 ? void 0 : copy.patterns.length) {
            copyWebpackPlugin = WebpackPlugin_1.default.getCopyWebpackPlugin(appPath, copy);
        }
        return copyWebpackPlugin;
    }
    getMiniCssExtractPlugin() {
        const { fileType } = this.combination;
        const { miniCssExtractPluginOption = {} } = this.combination.config;
        const args = Object.assign({
            filename: `[name]${fileType.style}`,
            chunkFilename: `[name]${fileType.style}`
        }, miniCssExtractPluginOption);
        return WebpackPlugin_1.default.getMiniCssExtractPlugin(args);
    }
    getMiniSplitChunksPlugin() {
        const { fileType } = this.combination;
        const { optimizeMainPackage } = this.combination;
        let miniSplitChunksPlugin;
        if (optimizeMainPackage === null || optimizeMainPackage === void 0 ? void 0 : optimizeMainPackage.enable) {
            miniSplitChunksPlugin = WebpackPlugin_1.default.getPlugin(MiniSplitChunksPlugin_1.default, [{
                    exclude: optimizeMainPackage.exclude,
                    fileType,
                    combination: this.combination
                }]);
        }
        return miniSplitChunksPlugin;
    }
    getMainPlugin(definePluginOptions) {
        var _a;
        const { combination } = this;
        const options = {
            commonChunks: this.getCommonChunks(),
            constantsReplaceList: definePluginOptions,
            pxTransformConfig: ((_a = this.pxtransformOption) === null || _a === void 0 ? void 0 : _a.config) || {},
            hot: false,
            combination,
        };
        const plugin = combination.isBuildNativeComp ? BuildNativePlugin_1.default : MiniPlugin_1.default;
        return WebpackPlugin_1.default.getPlugin(plugin, [options]);
    }
    getCommonChunks() {
        const { buildNativePlugin, config } = this.combination;
        const { commonChunks } = config;
        const defaultCommonChunks = (buildNativePlugin === null || buildNativePlugin === void 0 ? void 0 : buildNativePlugin.commonChunks) || ['runtime', 'vendors', 'taro', 'common'];
        let customCommonChunks = defaultCommonChunks;
        if ((0, shared_1.isFunction)(commonChunks)) {
            customCommonChunks = commonChunks(defaultCommonChunks.concat()) || defaultCommonChunks;
        }
        else if ((0, shared_1.isArray)(commonChunks) && commonChunks.length) {
            customCommonChunks = commonChunks;
        }
        return customCommonChunks;
    }
}
exports.MiniWebpackPlugin = MiniWebpackPlugin;
//# sourceMappingURL=MiniWebpackPlugin.js.map