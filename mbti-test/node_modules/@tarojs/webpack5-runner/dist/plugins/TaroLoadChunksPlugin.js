"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("@tarojs/helper");
const shared_1 = require("@tarojs/shared");
const webpack_1 = require("webpack");
const component_1 = require("../utils/component");
const webpack_2 = require("../utils/webpack");
const PLUGIN_NAME = 'TaroLoadChunksPlugin';
const { ConcatSource } = webpack_1.sources;
class TaroLoadChunksPlugin {
    constructor(options) {
        this.commonChunks = options.commonChunks;
        this.isBuildPlugin = options.isBuildPlugin;
        this.framework = options.framework;
        this.addChunkPages = options.addChunkPages;
        this.pages = options.pages;
        this.needAddCommon = options.needAddCommon || [];
        this.isIndependentPackages = options.isIndependentPackages || false;
    }
    apply(compiler) {
        const pagesList = this.pages;
        const addChunkPagesList = new Map();
        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, (compilation) => {
            let commonChunks;
            const fileChunks = new Map();
            compilation.hooks.afterOptimizeChunks.tap(PLUGIN_NAME, (chunks) => {
                const chunksArray = Array.from(chunks);
                /**
                 * 收集 common chunks 中使用到 @tarojs/components 中的组件
                 */
                commonChunks = chunksArray.filter(chunk => this.commonChunks.includes(chunk.name) && (0, webpack_2.chunkHasJs)(chunk, compilation.chunkGraph)).reverse();
                this.isCompDepsFound = false;
                for (const chunk of commonChunks) {
                    this.collectComponents(compiler, compilation, chunk);
                }
                if (!this.isCompDepsFound) {
                    // common chunks 找不到再去别的 chunk 中找
                    chunksArray
                        .filter(chunk => !this.commonChunks.includes(chunk.name))
                        .some(chunk => {
                        this.collectComponents(compiler, compilation, chunk);
                        return this.isCompDepsFound;
                    });
                }
                /**
                 * 收集开发者在 addChunkPages 中配置的页面及其需要引用的公共文件
                 */
                if (typeof this.addChunkPages === 'function') {
                    this.addChunkPages(addChunkPagesList, Array.from(pagesList).map(item => item.name));
                    chunksArray.forEach(chunk => {
                        const id = (0, webpack_2.getChunkIdOrName)(chunk);
                        addChunkPagesList.forEach((deps, pageName) => {
                            if (pageName === id) {
                                const depChunks = deps.map(dep => ({ name: dep }));
                                fileChunks.set(id, depChunks);
                            }
                        });
                    });
                }
            });
            compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules, { chunk }) => {
                var _a;
                const chunkEntryModule = (0, webpack_2.getChunkEntryModule)(compilation, chunk);
                if (chunkEntryModule) {
                    const entryModule = (_a = chunkEntryModule.rootModule) !== null && _a !== void 0 ? _a : chunkEntryModule;
                    if (entryModule.miniType === helper_1.META_TYPE.EXPORTS) {
                        const source = new ConcatSource();
                        source.add('module.exports=');
                        source.add(modules);
                        return source;
                    }
                    else {
                        return modules;
                    }
                }
                else {
                    return modules;
                }
            });
            /**
             * 在每个 chunk 文本刚生成后，按判断条件在文本头部插入 require 语句
             */
            compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation).render.tap(PLUGIN_NAME, (modules, { chunk }) => {
                var _a;
                const chunkEntryModule = (0, webpack_2.getChunkEntryModule)(compilation, chunk);
                if (chunkEntryModule) {
                    if (this.isBuildPlugin) {
                        return (0, webpack_2.addRequireToSource)((0, webpack_2.getChunkIdOrName)(chunk), modules, commonChunks);
                    }
                    const entryModule = (_a = chunkEntryModule.rootModule) !== null && _a !== void 0 ? _a : chunkEntryModule;
                    const { miniType, isNativePage } = entryModule;
                    if (this.needAddCommon.length) {
                        for (const item of this.needAddCommon) {
                            if ((0, webpack_2.getChunkIdOrName)(chunk) === item) {
                                return (0, webpack_2.addRequireToSource)(item, modules, commonChunks);
                            }
                        }
                    }
                    if (miniType === helper_1.META_TYPE.ENTRY) {
                        return (0, webpack_2.addRequireToSource)((0, webpack_2.getChunkIdOrName)(chunk), modules, commonChunks);
                    }
                    if (this.isIndependentPackages &&
                        (miniType === helper_1.META_TYPE.PAGE || miniType === helper_1.META_TYPE.COMPONENT || isNativePage)) {
                        return (0, webpack_2.addRequireToSource)((0, webpack_2.getChunkIdOrName)(chunk), modules, commonChunks);
                    }
                    // addChunkPages
                    if (fileChunks.size &&
                        (miniType === helper_1.META_TYPE.PAGE || miniType === helper_1.META_TYPE.COMPONENT)) {
                        let source;
                        const id = (0, webpack_2.getChunkIdOrName)(chunk);
                        fileChunks.forEach((v, k) => {
                            if (k === id) {
                                source = (0, webpack_2.addRequireToSource)(id, modules, v);
                            }
                        });
                        return source;
                    }
                }
                else {
                    return modules;
                }
            });
        });
    }
    collectComponents(compiler, compilation, chunk) {
        const chunkGraph = compilation.chunkGraph;
        const moduleGraph = compilation.moduleGraph;
        const modulesIterable = chunkGraph.getOrderedChunkModulesIterable(chunk, compiler.webpack.util.comparators.compareModulesByIdentifier);
        for (const module of modulesIterable) {
            if (module.rawRequest === helper_1.taroJsComponents) {
                this.isCompDepsFound = true;
                const includes = component_1.componentConfig.includes;
                const moduleUsedExports = moduleGraph.getUsedExports(module, chunk.runtime);
                if (moduleUsedExports === null || typeof moduleUsedExports === 'boolean') {
                    component_1.componentConfig.includeAll = true;
                }
                else {
                    for (const item of moduleUsedExports) {
                        includes.add((0, shared_1.toDashed)(item));
                    }
                }
                break;
            }
        }
    }
}
exports.default = TaroLoadChunksPlugin;
//# sourceMappingURL=TaroLoadChunksPlugin.js.map