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
const helper_1 = require("@tarojs/helper");
const loader_utils_1 = require("loader-utils");
const path_1 = __importDefault(require("path"));
const webpack_1 = require("../utils/webpack");
const MiniPlugin_1 = __importDefault(require("./MiniPlugin"));
const PLUGIN_NAME = 'BuildNativePlugin';
class BuildNativePlugin extends MiniPlugin_1.default {
    constructor() {
        super(...arguments);
        this.pageLoaderName = '@tarojs/taro-loader/lib/native-component';
    }
    apply(compiler) {
        super.apply(compiler);
        this.addLoadChunksPlugin(compiler);
    }
    run(compiler) {
        return __awaiter(this, void 0, void 0, function* () {
            this.appConfig = yield this.getAppConfig();
            this.getPages();
            this.getPagesConfig();
            this.getConfigFiles(compiler);
            this.addEntries();
            this.addLoader(compiler);
        });
    }
    getPages() {
        if ((0, helper_1.isEmptyObject)(this.appConfig)) {
            throw new Error('缺少 app 全局配置，请检查！');
        }
        const appPages = this.appConfig.components;
        if (!appPages || !appPages.length) {
            throw new Error('全局配置缺少 components 字段，请检查！');
        }
        if (!this.isWatch) {
            (0, helper_1.printLog)("compile" /* processTypeEnum.COMPILE */, '发现入口', this.getShowPath(this.appEntry));
        }
        const { frameworkExts } = this.options;
        this.prerenderPages = new Set();
        this.pages = new Set([
            ...appPages.map(item => {
                const pagePath = (0, helper_1.resolveMainFilePath)(path_1.default.join(this.options.sourceDir, item), frameworkExts);
                return {
                    name: item,
                    path: pagePath,
                    isNative: false
                };
            })
        ]);
    }
    // entry 删除 app.js
    addEntries() {
        super.addEntries();
        const deps = this.dependencies;
        for (const [key, dep] of deps.entries()) {
            if (dep.miniType === 'ENTRY') {
                deps.delete(key);
                break;
            }
        }
    }
    addLoadChunksPlugin(compiler) {
        const fileChunks = new Map();
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, compilation => {
            compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, chunks => {
                for (const chunk of chunks) {
                    const id = (0, webpack_1.getChunkIdOrName)(chunk);
                    if (this.options.commonChunks.includes(id))
                        return;
                    const deps = [];
                    for (const group of chunk.groupsIterable) {
                        group.chunks.forEach(chunk => {
                            const currentChunkId = (0, webpack_1.getChunkIdOrName)(chunk);
                            if (id === currentChunkId)
                                return;
                            deps.push({
                                name: currentChunkId
                            });
                        });
                    }
                    fileChunks.set(id, deps);
                }
            });
            compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules, { chunk }) => {
                if (!(0, webpack_1.getChunkEntryModule)(compilation, chunk))
                    return modules;
                // addChunkPages
                if (fileChunks.size) {
                    let source;
                    const id = (0, webpack_1.getChunkIdOrName)(chunk);
                    fileChunks.forEach((v, k) => {
                        if (k === id) {
                            source = (0, webpack_1.addRequireToSource)(id, modules, v);
                        }
                    });
                    return source;
                }
            });
        });
    }
    // 不生成 app.json
    generateConfigFile(compilation, compiler, filePath, config) {
        if (filePath === this.appEntry)
            return;
        super.generateConfigFile(compilation, compiler, filePath, config);
    }
    // 加载 taro-runtime 前必须先加载端平台插件的 runtime
    addLoader(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, compilation => {
            compiler.webpack.NormalModule.getCompilationHooks(compilation).loader.tap(PLUGIN_NAME, (_loaderContext, module) => {
                if (module.rawRequest === '@tarojs/runtime') {
                    module.loaders.unshift({
                        loader: '@tarojs/taro-loader/lib/taro-runtime',
                        options: {
                            runtimePath: this.options.runtimePath
                        }
                    });
                }
            });
        });
    }
    /**
     * 各组件的样式文件中引入 common chunks 中的公共样式文件
     */
    injectCommonStyles({ assets }, { webpack }) {
        const { ConcatSource } = webpack.sources;
        const styleExt = this.options.fileType.style;
        const REG_STYLE_EXT = new RegExp(`\\.(${styleExt.replace('.', '')})(\\?.*)?$`);
        const commons = [];
        Object.keys(assets).forEach(assetName => {
            const fileName = path_1.default.basename(assetName, path_1.default.extname(assetName));
            if ((helper_1.REG_STYLE.test(assetName) || REG_STYLE_EXT.test(assetName)) && this.options.commonChunks.includes(fileName)) {
                commons.push(assetName);
            }
        });
        if (commons.length > 0) {
            this.pages.forEach(page => {
                if (page.isNative)
                    return;
                const pageStyle = `${page.name}${styleExt}`;
                if (pageStyle in assets) {
                    const source = new ConcatSource('');
                    const originSource = assets[pageStyle];
                    commons.forEach(item => {
                        source.add(`@import ${JSON.stringify((0, loader_utils_1.urlToRequest)(path_1.default.posix.relative(path_1.default.dirname(pageStyle), item)))};\n`);
                    });
                    source.add(originSource);
                    assets[pageStyle] = source;
                }
            });
        }
    }
}
exports.default = BuildNativePlugin;
//# sourceMappingURL=BuildNativePlugin.js.map