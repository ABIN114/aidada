"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseConfig = void 0;
const helper_1 = require("@tarojs/helper");
const runner_utils_1 = require("@tarojs/runner-utils");
const path_1 = __importDefault(require("path"));
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const webpack_format_messages_1 = __importDefault(require("webpack-format-messages"));
const WebpackPlugin_1 = __importDefault(require("./WebpackPlugin"));
class BaseConfig {
    constructor(appPath, config) {
        var _a, _b, _c;
        const chain = this._chain = new webpack_chain_1.default();
        chain.merge({
            target: ['web', 'es5'],
            resolve: {
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.vue'],
                symlinks: true,
                plugin: {
                    MultiPlatformPlugin: {
                        plugin: runner_utils_1.MultiPlatformPlugin,
                        args: ['described-resolve', 'resolve', { chain }]
                    }
                }
            },
            resolveLoader: {
                modules: ['node_modules']
            },
            output: {
                chunkLoadingGlobal: 'webpackJsonp'
            },
            plugin: {
                webpackbar: WebpackPlugin_1.default.getWebpackBarPlugin({
                    reporters: [
                        'basic',
                        'fancy',
                        {
                            done(_context, { stats }) {
                                var _a;
                                const { warnings, errors } = (0, webpack_format_messages_1.default)(stats);
                                if (stats.hasWarnings()) {
                                    console.log(helper_1.chalk.bgKeyword('orange')('⚠️ Warnings: \n'));
                                    warnings.forEach(w => console.log(w + '\n'));
                                }
                                if (stats.hasErrors()) {
                                    console.log(helper_1.chalk.bgRed('✖ Errors: \n'));
                                    errors.forEach(e => console.log(e + '\n'));
                                    !config.isWatch && process.exit(1);
                                }
                                if (config.isWatch) {
                                    console.log(helper_1.chalk.gray(`→ Watching... [${new Date().toLocaleString()}]\n`));
                                }
                                if (((_a = config.logger) === null || _a === void 0 ? void 0 : _a.stats) === true && config.mode === 'production') {
                                    console.log(helper_1.chalk.bgBlue('ℹ Stats: \n'));
                                    console.log(stats.toString({
                                        colors: true,
                                        modules: false,
                                        children: false,
                                        chunks: false,
                                        chunkModules: false
                                    }));
                                }
                            }
                        }
                    ],
                    basic: ((_a = config.logger) === null || _a === void 0 ? void 0 : _a.quiet) === true,
                    fancy: ((_b = config.logger) === null || _b === void 0 ? void 0 : _b.quiet) !== true,
                })
            },
            watchOptions: {
                aggregateTimeout: 200
            }
        });
        // 持久化缓存
        if ((_c = config.cache) === null || _c === void 0 ? void 0 : _c.enable) {
            delete config.cache.enable;
            const cacheDefault = {
                type: 'filesystem',
                // 让缓存失效
                buildDependencies: {
                    // 与 Config 中处理的配置文件保持一致
                    config: [(0, helper_1.resolveScriptPath)(path_1.default.join(appPath, 'config', 'index'))],
                    files: [(0, helper_1.resolveScriptPath)(path_1.default.join(appPath, 'src', 'app.config'))]
                },
                name: `${process.env.NODE_ENV}-${process.env.TARO_ENV}`
            };
            chain.merge({
                cache: (0, helper_1.recursiveMerge)({}, cacheDefault, config.cache)
            });
        }
    }
    get chain() {
        return this._chain;
    }
    // minimizer 配置
    setMinimizer(config, defaultTerserOptions) {
        var _a, _b;
        if (config.mode !== 'production')
            return;
        let minimize = true;
        const minimizer = {};
        const { jsMinimizer = 'terser', cssMinimizer = 'csso', terser, esbuild, csso } = config;
        /** JS */
        if (jsMinimizer === 'esbuild') {
            if (((_a = esbuild === null || esbuild === void 0 ? void 0 : esbuild.minify) === null || _a === void 0 ? void 0 : _a.enable) === false) {
                // 只有在明确配置了 esbuild.minify.enable: false 时才不启用压缩
                minimize = false;
            }
            else {
                const defaultESBuildOptions = {
                    target: 'es5'
                };
                const esbuildMinifyOptions = (0, helper_1.recursiveMerge)({}, defaultESBuildOptions, ((_b = esbuild === null || esbuild === void 0 ? void 0 : esbuild.minify) === null || _b === void 0 ? void 0 : _b.config) || {});
                minimizer.esBuildMinifyPlugin = WebpackPlugin_1.default.getESBuildMinifyPlugin(esbuildMinifyOptions);
            }
        }
        else {
            if ((terser === null || terser === void 0 ? void 0 : terser.enable) === false) {
                // 只有在明确配置了 terser.enable: false 时才不启用压缩
                minimize = false;
            }
            else {
                const terserOptions = (0, helper_1.recursiveMerge)({}, defaultTerserOptions, (terser === null || terser === void 0 ? void 0 : terser.config) || {});
                minimizer.terserPlugin = WebpackPlugin_1.default.getTerserPlugin(terserOptions);
            }
        }
        /** CSS */
        if (cssMinimizer === 'esbuild') {
            minimizer.esBuildCssPlugin = WebpackPlugin_1.default.getCssMinimizerPlugin(cssMinimizer, {});
        }
        else if (cssMinimizer === 'parcelCss') {
            minimizer.parcelCssPlugin = WebpackPlugin_1.default.getCssMinimizerPlugin(cssMinimizer, {});
        }
        else {
            if ((csso === null || csso === void 0 ? void 0 : csso.enable) !== false) {
                const defaultOption = {
                    mergeRules: false,
                    mergeIdents: false,
                    reduceIdents: false,
                    discardUnused: false,
                    minifySelectors: false
                };
                const cssoConfig = Object.assign(defaultOption, (csso === null || csso === void 0 ? void 0 : csso.config) || {});
                minimizer.cssoWebpackPlugin = WebpackPlugin_1.default.getCssMinimizerPlugin('csso', cssoConfig);
            }
        }
        this.chain.merge({
            optimization: {
                minimize,
                minimizer
            }
        });
    }
}
exports.BaseConfig = BaseConfig;
//# sourceMappingURL=BaseConfig.js.map