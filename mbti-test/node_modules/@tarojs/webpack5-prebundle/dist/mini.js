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
exports.MiniPrebundle = void 0;
// Inspired by [vite](https://github.com/vitejs/vite)
/** @license
 * MIT License
 *
 * Copyright (c) 2019-present, Yuxi (Evan) You and Vite contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const perf_hooks_1 = require("perf_hooks");
const webpack_1 = require("webpack");
const prebundle_1 = __importDefault(require("./prebundle"));
const bundle_1 = require("./prebundle/bundle");
const utils_1 = require("./utils");
const constant_1 = require("./utils/constant");
const TaroModuleFederationPlugin_1 = __importDefault(require("./webpack/TaroModuleFederationPlugin"));
class MiniPrebundle extends prebundle_1.default {
    getIsBuildPluginPath(filePath, isBuildPlugin) {
        return isBuildPlugin ? `${filePath}/plugin` : filePath;
    }
    bundle() {
        return __awaiter(this, void 0, void 0, function* () {
            const PREBUNDLE_START = perf_hooks_1.performance.now();
            this.metadata.bundleHash = yield (0, utils_1.getBundleHash)(this.appPath, this.deps, this.chain, this.cacheDir);
            if (this.preMetadata.bundleHash !== this.metadata.bundleHash) {
                this.isUseCache = false;
                try {
                    const { metafile } = yield (0, bundle_1.bundle)({
                        appPath: this.appPath,
                        deps: this.deps,
                        chain: this.chain,
                        prebundleOutputDir: this.prebundleCacheDir,
                        customEsbuildConfig: this.customEsbuildConfig,
                        customSwcConfig: this.customSwcConfig
                    });
                    // 找出 @tarojs/runtime 被 split 切分的 chunk，作为后续 ProvidePlugin 的提供者。
                    // 原因是 @tarojs/runtime 里使用了一些如 raf、caf 等全局变量，又因为 esbuild 把
                    // @tarojs/runtime split 成 entry 和依赖 chunk 两部分。如果我们把 entry 作为
                    // ProvidePlugin 的提供者，依赖 chunk 会被注入 raf、caf，导致循环依赖的问题。所以
                    // 这种情况下只能把依赖 chunk 作为 ProvidePlugin 的提供者。
                    metafile && Object.keys(metafile.outputs).some(key => {
                        const output = metafile.outputs[key];
                        if (output.entryPoint === 'entry:@tarojs_runtime') {
                            const dep = output.imports.find(dep => {
                                const depPath = dep.path;
                                const depOutput = metafile.outputs[depPath];
                                return depOutput.exports.includes('TaroRootElement');
                            });
                            if (dep) {
                                this.metadata.taroRuntimeBundlePath = path_1.default.join(this.appPath, dep.path);
                            }
                            return true;
                        }
                    });
                }
                catch (result) {
                    return this.handleBundleError(result === null || result === void 0 ? void 0 : result.errors);
                }
            }
            else {
                this.metadata.taroRuntimeBundlePath = path_1.default.join(this.appPath, this.preMetadata.taroRuntimeBundlePath);
            }
            this.measure('Prebundle duration', PREBUNDLE_START);
        });
    }
    buildLib() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const BUILD_LIB_START = perf_hooks_1.performance.now();
            const exposes = {};
            const devtool = this.config.enableSourceMap && 'hidden-source-map';
            const mainBuildOutput = this.chain.output.entries();
            const taroRuntimeBundlePath = this.metadata.taroRuntimeBundlePath || exposes['./@tarojs/runtime'];
            const output = {
                path: this.remoteCacheDir,
                chunkLoadingGlobal: mainBuildOutput.chunkLoadingGlobal,
                globalObject: mainBuildOutput.globalObject
            };
            const provideObject = {
                window: [taroRuntimeBundlePath, 'window$1'],
                document: [taroRuntimeBundlePath, 'document$1'],
                navigator: [taroRuntimeBundlePath, 'nav'],
                requestAnimationFrame: [taroRuntimeBundlePath, '_raf'],
                cancelAnimationFrame: [taroRuntimeBundlePath, '_caf'],
                Element: [taroRuntimeBundlePath, 'TaroElement'],
                SVGElement: [taroRuntimeBundlePath, 'SVGElement'],
                MutationObserver: [taroRuntimeBundlePath, 'MutationObserver'],
                history: [taroRuntimeBundlePath, 'history'],
                location: [taroRuntimeBundlePath, 'location'],
                URLSearchParams: [taroRuntimeBundlePath, 'URLSearchParams'],
                URL: [taroRuntimeBundlePath, 'URL'],
            };
            const customWebpackConfig = this.option.webpack;
            if ((_a = customWebpackConfig === null || customWebpackConfig === void 0 ? void 0 : customWebpackConfig.provide) === null || _a === void 0 ? void 0 : _a.length) {
                customWebpackConfig.provide.forEach(cb => {
                    cb(provideObject, taroRuntimeBundlePath);
                });
                delete customWebpackConfig.provide;
            }
            this.metadata.mfHash = (0, utils_1.getMfHash)({
                bundleHash: this.metadata.bundleHash,
                mode: this.mode,
                devtool,
                output,
                taroRuntimeBundlePath
            });
            if (this.preMetadata.mfHash !== this.metadata.mfHash) {
                this.isUseCache = false;
                helper_1.fs.existsSync(this.remoteCacheDir) && helper_1.fs.emptyDirSync(this.remoteCacheDir);
                for (const id of this.deps.keys()) {
                    const flatId = (0, utils_1.flattenId)(id);
                    exposes[`./${id}`] = path_1.default.join(this.prebundleCacheDir, `${flatId}.js`);
                }
                this.metadata.runtimeRequirements = new Set();
                const compiler = this.getRemoteWebpackCompiler({
                    cache: {
                        type: 'filesystem',
                        cacheDirectory: path_1.default.join(this.cacheDir, 'webpack-cache'),
                        buildDependencies: {
                            config: Object.values(exposes)
                        }
                    },
                    devtool,
                    entry: path_1.default.resolve(__dirname, './webpack/index.js'),
                    mode: this.mode,
                    output,
                    plugins: [
                        new TaroModuleFederationPlugin_1.default({
                            name: constant_1.MF_NAME,
                            filename: 'remoteEntry.js',
                            runtime: 'runtime',
                            exposes
                        }, {
                            deps: this.deps,
                            env: this.env,
                            platformType: this.platformType,
                            remoteAssets: this.metadata.remoteAssets,
                            isBuildPlugin: this.config.isBuildPlugin,
                            runtimeRequirements: this.metadata.runtimeRequirements
                        }),
                        new webpack_1.ProvidePlugin(provideObject)
                    ]
                }, customWebpackConfig);
                this.metadata.remoteAssets = yield new Promise((resolve, reject) => {
                    compiler.run((error, stats) => {
                        compiler.close(err => {
                            var _a;
                            if (error || err)
                                return reject(error || err);
                            const { assets = [], errors = [] } = stats.toJson();
                            if (errors[0])
                                return reject(errors[0]);
                            const remoteAssets = ((_a = assets === null || assets === void 0 ? void 0 : assets.filter(item => this.config.isBuildPlugin
                                ? item.name !== 'plugin/runtime.js'
                                : item.name !== 'runtime.js')) === null || _a === void 0 ? void 0 : _a.map(item => ({
                                name: path_1.default.join('prebundle', item.name)
                            }))) || [];
                            resolve(remoteAssets);
                        });
                    });
                });
            }
            else {
                this.metadata.runtimeRequirements = new Set(this.preMetadata.runtimeRequirements);
                this.metadata.remoteAssets = this.preMetadata.remoteAssets;
            }
            helper_1.fs.copy(this.remoteCacheDir, path_1.default.join(this.getIsBuildPluginPath(mainBuildOutput.path, this.config.isBuildPlugin), 'prebundle'));
            this.measure(`Build remote ${constant_1.MF_NAME} duration`, BUILD_LIB_START);
        });
    }
    run() {
        const _super = Object.create(null, {
            run: { get: () => super.run }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.isUseCache = true;
            /** 扫描出所有的 node_modules 依赖 */
            /**
             * 找出所有 webpack entry
             * TODO:
             *   - 目前只处理了 Page entry，例如原生小程序组件 js entry 等并没有处理
             */
            const entries = yield this.getEntries(this.entryPath);
            // plugin-platform 等插件的 runtime 文件入口
            const runtimePath = typeof this.config.runtimePath === 'string' ? [this.config.runtimePath] : this.config.runtimePath || [];
            const { include = [], exclude = [] } = this.option;
            yield this.setDeps(entries, include.concat(...runtimePath.map(item => item.replace(/^post:/, ''))), exclude);
            /** 使用 esbuild 对 node_modules 依赖进行 bundle */
            yield this.bundle();
            /** 把依赖的 bundle 产物打包成 Webpack Module Federation 格式 */
            yield this.buildLib();
            /** 项目 Host 配置 Module Federation */
            this.setHost();
            yield _super.run.call(this);
        });
    }
}
exports.MiniPrebundle = MiniPrebundle;
//# sourceMappingURL=mini.js.map