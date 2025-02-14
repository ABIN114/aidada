"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Modify from https://github.com/webpack/webpack/blob/main/lib/container/ContainerEntryModule.js
 * MIT License http://www.opensource.org/licenses/mit-license.php
 * Author Tobias Koppers @sokra, Zackary Jackson @ScriptedAlchemy, Marais Rossouw @maraisr
 */
const webpack_1 = __importStar(require("webpack"));
const { ConcatSource } = webpack_1.sources;
const ContainerEntryModule = require('webpack/lib/container/ContainerEntryModule');
class TaroContainerEntryModule extends ContainerEntryModule {
    // eslint-disable-next-line no-useless-constructor
    constructor(name, exposes, shareScope) {
        super(name, exposes, shareScope);
    }
    codeGeneration({ moduleGraph, chunkGraph, runtimeTemplate }) {
        const result = super.codeGeneration({ moduleGraph, chunkGraph, runtimeTemplate });
        const originSource = result.sources.get('javascript');
        const newSources = new ConcatSource(originSource);
        const runtimeRequirements = new Set([
            webpack_1.RuntimeGlobals.definePropertyGetters,
            webpack_1.RuntimeGlobals.hasOwnProperty,
            webpack_1.RuntimeGlobals.exports
        ]);
        const getters = [];
        for (const block of this.blocks) {
            const { dependencies } = block;
            const modules = dependencies.map(dependency => {
                const dep = dependency;
                return {
                    name: dep.exposedName,
                    module: moduleGraph.getModule(dep),
                    request: dep.userRequest
                };
            });
            const str = `return ${runtimeTemplate.returningFunction(`(${modules
                .map(({ module, request }) => runtimeTemplate.moduleRaw({
                module,
                chunkGraph,
                request,
                weak: false,
                runtimeRequirements
            }))
                .join(', ')})`)};`;
            getters.push(`${JSON.stringify(modules[0].name)}: ${runtimeTemplate.basicFunction('', str)}`);
        }
        const res = webpack_1.Template.asString([
            '\n',
            'var taroModuleMap = {',
            webpack_1.Template.indent(getters.join(',\n')),
            '};',
            `var taroGet = ${runtimeTemplate.basicFunction('module', [
                'return taroModuleMap[module]();'
            ])};`,
            '__webpack_require__.taro(taroGet);'
        ]);
        newSources.add(res);
        result.sources.set('javascript', newSources);
        return result;
    }
}
exports.default = TaroContainerEntryModule;
webpack_1.default.util.serialization.register(TaroContainerEntryModule, '@tarojs/webpack5-runner/dist/prebundle/TaroContainerEntryModule', 'TaroContainerEntryModule', {
    serialize(obj, context) {
        obj.serialize(context);
    },
    deserialize(context) {
        const { read } = context;
        const obj = new TaroContainerEntryModule(read(), read(), read());
        obj.deserialize(context);
        return obj;
    }
});
//# sourceMappingURL=TaroContainerEntryModule.js.map