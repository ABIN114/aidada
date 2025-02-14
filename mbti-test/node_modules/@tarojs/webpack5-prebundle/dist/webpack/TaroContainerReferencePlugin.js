"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Modify from https://github.com/webpack/webpack/blob/main/lib/container/ContainerReferencePlugin.js
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra and Zackary Jackson @ScriptedAlchemy
 */
const helper_1 = require("@tarojs/helper");
const path_1 = __importDefault(require("path"));
const ContainerReferencePlugin_1 = __importDefault(require("webpack/lib/container/ContainerReferencePlugin"));
const RemoteModule_1 = __importDefault(require("webpack/lib/container/RemoteModule"));
const utils_1 = require("../utils");
const constant_1 = require("../utils/constant");
const TaroRemoteRuntimeModule_1 = __importDefault(require("./TaroRemoteRuntimeModule"));
const ExternalsPlugin = require('webpack/lib/ExternalsPlugin');
const FallbackDependency = require('webpack/lib/container/FallbackDependency');
const FallbackItemDependency = require('webpack/lib/container/FallbackItemDependency');
const FallbackModuleFactory = require('webpack/lib/container/FallbackModuleFactory');
const RemoteToExternalDependency = require('webpack/lib/container/RemoteToExternalDependency');
const PLUGIN_NAME = 'TaroContainerReferencePlugin';
const slashCode = '/'.charCodeAt(0);
class TaroContainerReferencePlugin extends ContainerReferencePlugin_1.default {
    constructor(options, params) {
        super(options);
        this.params = params;
        const { remotes = {} } = options;
        const remoteName = Object.keys(remotes)[0] || constant_1.MF_NAME;
        const [, remoteConfig] = this._remotes.find(([key, config]) => key === remoteName && config) || [this.remoteName, { external: [], shareScope: 'default' }];
        this.deps = params.deps;
        this.isBuildPlugin = params.isBuildPlugin || false;
        this.remoteAssets = params.remoteAssets || [];
        this.remoteName = remoteName;
        this.remoteConfig = remoteConfig;
        this.runtimeRequirements = params.runtimeRequirements;
    }
    apply(compiler) {
        switch (this.params.platformType) {
            case 'web':
                this.applyWebApp(compiler);
                break;
            default:
                this.applyMiniApp(compiler);
        }
    }
    applyWebApp(compiler) {
        const { _remotes: remotes, _remoteType: remoteType } = this;
        const remoteExternals = {};
        for (const [key, config] of remotes) {
            let i = 0;
            for (const external of config.external) {
                if (external.startsWith('internal '))
                    continue;
                remoteExternals[`webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`] = external;
                i++;
            }
        }
        new ExternalsPlugin(remoteType, remoteExternals).apply(compiler);
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            compilation.dependencyFactories.set(RemoteToExternalDependency, normalModuleFactory);
            compilation.dependencyFactories.set(FallbackItemDependency, normalModuleFactory);
            compilation.dependencyFactories.set(FallbackDependency, new FallbackModuleFactory());
            /**
             * 把预编译的依赖改为 Remote module 的形式
             * 例如把 import '@tarojs/taro' 改为 import '[remote]/@tarojs/taro'
             */
            normalModuleFactory.hooks.factorize.tap(PLUGIN_NAME, data => {
                if (!data.request.includes('!')) {
                    for (const [key, config] of remotes) {
                        if (data.request.startsWith(`${key}`) && (data.request.length === key.length || data.request.charCodeAt(key.length) === slashCode)) {
                            return new RemoteModule_1.default(data.request, config.external.map((external, i) => external.startsWith('internal ') ? external.slice(9) : `webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`), `.${data.request.slice(key.length)}`, config.shareScope);
                        }
                    }
                    const [key, config] = [this.remoteName, this.remoteConfig];
                    for (const dep of this.deps.keys()) {
                        if (data.request === dep || data.request === '@tarojs/runtime') {
                            const externalList = typeof config.external === 'string' ? [config.external] : config.external;
                            return new RemoteModule_1.default(`${key}/${data.request}`, externalList.map((external, i) => external.startsWith('internal ')
                                ? external.slice(9)
                                : `webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`), `./${data.request}`, config.shareScope || 'default' // share scope
                            );
                        }
                    }
                }
                // Note: webpack 5.78.0 类型禁用了返回 void 的情况，但实际在 webpack 中仍使用同样方法返回 void
                // https://github.com/webpack/webpack/blob/main/lib/container/ContainerReferencePlugin.js#L99
                return undefined;
            });
            const { RuntimeGlobals } = compiler.webpack;
            /** 修改 webpack runtime */
            compilation.hooks.runtimeRequirementInTree
                .for(RuntimeGlobals.ensureChunkHandlers)
                .tap(PLUGIN_NAME, (chunk, set) => {
                set.add(RuntimeGlobals.hasOwnProperty);
                set.add(RuntimeGlobals.initializeSharing);
                set.add(RuntimeGlobals.module);
                set.add(RuntimeGlobals.moduleFactoriesAddOnly);
                set.add(RuntimeGlobals.shareScopeMap);
                // 收集 Remote runtime 使用到的工具函数
                this.runtimeRequirements.forEach(item => set.add(item));
                compilation.addRuntimeModule(chunk, new TaroRemoteRuntimeModule_1.default(this.params.platformType));
            });
        });
    }
    applyMiniApp(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            /**
             * 把预编译的依赖改为 Remote module 的形式
             * 例如把 import '@tarojs/taro' 改为 import '[remote]/@tarojs/taro'
             */
            const [key, config] = this._remotes.find(([key, config]) => key === this.remoteName && config) || { external: [], shareScope: 'default' };
            normalModuleFactory.hooks.factorize.tap(PLUGIN_NAME, data => {
                if (!data.request.includes('!')) {
                    for (const dep of this.deps.keys()) {
                        if (data.request === dep || data.request === '@tarojs/runtime') {
                            return new RemoteModule_1.default(data.request, config.external.map((external, i) => external.startsWith('internal ')
                                ? external.slice(9)
                                : `webpack/container/reference/${key}${i ? `/fallback-${i}` : ''}`), `./${data.request}`, config.shareScope // share scope
                            );
                        }
                    }
                }
                // Note: webpack 5.78.0 类型禁用了返回 void 的情况，但实际在 webpack 中仍使用同样方法返回 void
                // https://github.com/webpack/webpack/blob/main/lib/container/ContainerReferencePlugin.js#L99
                return undefined;
            });
            /** 修改 webpack runtime */
            compilation.hooks.additionalTreeRuntimeRequirements.tap(PLUGIN_NAME, (chunk, set) => {
                // 收集 Remote runtime 使用到的工具函数
                this.runtimeRequirements.forEach(item => set.add(item));
                compilation.addRuntimeModule(chunk, new TaroRemoteRuntimeModule_1.default(this.params.platformType));
            });
            /**
             * 在 dist/app.js 头部注入 require，
             * 依赖所有的预编译 chunk 和 remoteEntry
             */
            const hooks = compiler.webpack.javascript.JavascriptModulesPlugin.getCompilationHooks(compilation);
            hooks.render.tap(PLUGIN_NAME, (modules, { chunk }) => {
                var _a;
                const chunkEntryModule = (0, utils_1.getChunkEntryModule)(compilation, chunk);
                if (chunkEntryModule) {
                    if (this.isBuildPlugin) {
                        let id = (0, utils_1.getChunkIdOrName)(chunk);
                        const idList = id.split(path_1.default.sep);
                        if (idList.length > 1) {
                            idList.splice(0, 1);
                            id = idList.join(path_1.default.sep);
                        }
                        return (0, utils_1.addRequireToSource)(id, modules, this.remoteAssets);
                    }
                    const entryModule = (_a = chunkEntryModule.rootModule) !== null && _a !== void 0 ? _a : chunkEntryModule;
                    if (entryModule.miniType === helper_1.META_TYPE.ENTRY) {
                        return (0, utils_1.addRequireToSource)((0, utils_1.getChunkIdOrName)(chunk), modules, this.remoteAssets);
                    }
                    return modules;
                }
                else {
                    return modules;
                }
            });
            /**
             * 模块 "webpack/container/reference/[remote]" 用于网络加载 remoteEntry.js，
             * 在小程序环境则不需要了，因此将模块输出改为空字符串，减少不必要的代码
             */
            hooks.renderModuleContent.tap(PLUGIN_NAME, (source, module) => {
                if (module.userRequest === `webpack/container/reference/${this.remoteName}`) {
                    const { RawSource } = compiler.webpack.sources;
                    return new RawSource('');
                }
                return source;
            });
        });
    }
}
exports.default = TaroContainerReferencePlugin;
//# sourceMappingURL=TaroContainerReferencePlugin.js.map