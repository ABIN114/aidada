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
/**
 * Modify from https://github.com/webpack/webpack/blob/main/lib/container/ContainerPlugin.js
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
 */
const ContainerPlugin_1 = __importDefault(require("webpack/lib/container/ContainerPlugin"));
const TaroContainerEntryModuleFactory_1 = __importDefault(require("./TaroContainerEntryModuleFactory"));
const ContainerEntryDependency = require('webpack/lib/container/ContainerEntryDependency');
const PLUGIN_NAME = 'TaroContainerPlugin';
class TaroContainerPlugin extends ContainerPlugin_1.default {
    constructor(options, params) {
        super(options);
        this.params = params;
        this.runtimeRequirements = params.runtimeRequirements || new Set();
    }
    apply(compiler) {
        switch (this.params.platformType) {
            case 'web':
                super.apply(compiler);
                break;
            default:
                super.apply(compiler);
                this.applyMiniApp(compiler);
        }
        compiler.hooks.thisCompilation.tap({
            name: PLUGIN_NAME,
            stage: 100
        }, compilation => {
            /**
             * 收集打包 Remote 应用时使用到的 Webpack runtime 工具函数。
             * Remote 应用与 Host 应用的 runtime 可以共用减少重复代码加载，
             * 可以为 Host 应用的 Webpack runtime 增加 Remote 应用使用到的工具函数。
             */
            compilation.hooks.afterRuntimeRequirements.tap(PLUGIN_NAME, () => {
                const chunkGraphEntries = compilation._getChunkGraphEntries();
                for (const chunk of chunkGraphEntries) {
                    if (chunk.name === 'runtime') {
                        const chunkGraph = compilation.chunkGraph;
                        const cgc = chunkGraph._getChunkGraphChunk(chunk);
                        const runtimeRequirements = cgc.runtimeRequirementsInTree;
                        runtimeRequirements.forEach(item => this.runtimeRequirements.add(item));
                    }
                }
            });
            /**
             * 删除多余的 assets
             *  - entry chunk
             *  - remote runtime chunk
             */
            compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, (assets, callback) => __awaiter(this, void 0, void 0, function* () {
                delete assets['main.js'];
                delete assets['runtime.js'];
                callback();
            }));
        });
    }
    applyMiniApp(compiler) {
        compiler.hooks.thisCompilation.tap({
            name: PLUGIN_NAME,
            stage: 100
        }, compilation => {
            /**
             * 劫持 ContainerEntryDependency，把生成的 Module 替换为 TaroContainerEntryModule
             * 目的是修改 remoteEntry.js 的 container module 输出：
             *   1. 插入 taroModuleMap 把异步逻辑改为同步
             *   2. 插入自动注册模块的逻辑
             */
            compilation.dependencyFactories.set(ContainerEntryDependency, new TaroContainerEntryModuleFactory_1.default());
        });
    }
}
exports.default = TaroContainerPlugin;
//# sourceMappingURL=TaroContainerPlugin.js.map