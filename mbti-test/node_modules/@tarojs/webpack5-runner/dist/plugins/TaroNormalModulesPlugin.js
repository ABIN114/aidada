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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TaroSingleEntryDependency_1 = __importDefault(require("../dependencies/TaroSingleEntryDependency"));
const component_1 = require("../utils/component");
const TaroComponentsExportsPlugin_1 = require("./TaroComponentsExportsPlugin");
const TaroNormalModule_1 = __importStar(require("./TaroNormalModule"));
const walk = require('acorn-walk');
const PLUGIN_NAME = 'TaroNormalModulesPlugin';
class TaroNormalModulesPlugin {
    constructor(onParseCreateElement) {
        this.isCache = true;
        this.onParseCreateElement = onParseCreateElement;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
            // cache 开启后，会跳过 JavaScript parser 环节，因此需要收集组件信息，在 finishModules 阶段处理
            compilation.hooks.finishModules.tap(PLUGIN_NAME, (_) => {
                var _a;
                if (!this.isCache)
                    return;
                for (const name of component_1.elementNameSet) {
                    (_a = this.onParseCreateElement) === null || _a === void 0 ? void 0 : _a.call(this, name, component_1.componentConfig);
                }
                for (const name of component_1.componentNameSet) {
                    if (name === 'CustomWrapper' && !component_1.componentConfig.thirdPartyComponents.get('custom-wrapper')) {
                        component_1.componentConfig.thirdPartyComponents.set('custom-wrapper', new Set());
                        return;
                    }
                }
            });
            normalModuleFactory.hooks.createModule.tapPromise(PLUGIN_NAME, (data, { dependencies }) => {
                const dependency = dependencies[0];
                if (dependency instanceof TaroSingleEntryDependency_1.default) {
                    return Promise.resolve(new TaroNormalModule_1.default(Object.assign(data, { miniType: dependency.miniType, name: dependency.name, isNativePage: dependency.options.isNativePage })));
                }
                return Promise.resolve(new TaroNormalModule_1.TaroBaseNormalModule(data));
            });
            // react 的第三方组件支持
            normalModuleFactory.hooks.parser.for('javascript/auto').tap(PLUGIN_NAME, (parser) => {
                parser.hooks.program.tap(PLUGIN_NAME, (ast) => {
                    this.isCache = false;
                    const currentModule = parser.state.current;
                    currentModule.clear();
                    walk.ancestor(ast, {
                        CallExpression: (node, ancestors) => {
                            var _a;
                            // @ts-ignore
                            const callee = node.callee;
                            if (callee.type === 'MemberExpression') {
                                if (callee.property.name !== 'createElement') {
                                    return;
                                }
                            }
                            else {
                                const nameOfCallee = callee.name;
                                if (
                                // 兼容 react17 new jsx transtrom 以及esbuild-loader的ast兼容问题
                                !/^_?jsxs?$/.test(nameOfCallee) &&
                                    // 兼容 Vue 3.0 渲染函数及 JSX
                                    !(nameOfCallee && nameOfCallee.includes('createVNode')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createBlock')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createElementVNode')) &&
                                    !(nameOfCallee && nameOfCallee.includes('createElementBlock')) &&
                                    !(nameOfCallee && nameOfCallee.includes('resolveComponent')) && // 收集使用解析函数的组件名称
                                    // 兼容 Vue 2.0 渲染函数及 JSX
                                    !(0, TaroComponentsExportsPlugin_1.isRenderNode)(node, ancestors)) {
                                    return;
                                }
                            }
                            // @ts-ignore
                            const [type, prop] = node.arguments;
                            // 防止 vue2 中类似 h() 的定义报错
                            if (!type)
                                return;
                            const componentName = type.name;
                            if (type.value) {
                                (_a = this.onParseCreateElement) === null || _a === void 0 ? void 0 : _a.call(this, type.value, component_1.componentConfig);
                                currentModule.elementNameSet.add(type.value);
                            }
                            if (componentName) {
                                currentModule.componentNameSet.add(componentName);
                                if (componentName === 'CustomWrapper' && !component_1.componentConfig.thirdPartyComponents.get('custom-wrapper')) {
                                    component_1.componentConfig.thirdPartyComponents.set('custom-wrapper', new Set());
                                }
                            }
                            if (component_1.componentConfig.thirdPartyComponents.size === 0) {
                                return;
                            }
                            const attrs = component_1.componentConfig.thirdPartyComponents.get(type.value);
                            if (attrs == null || !prop || prop.type !== 'ObjectExpression') {
                                return;
                            }
                            function getPropName(key) {
                                return key.type === 'Identifier' ? key.name : (key.type === 'Literal' ? key.value : null);
                            }
                            const props = prop.properties
                                .filter(p => {
                                if (p.type !== 'Property')
                                    return false;
                                const propName = getPropName(p.key);
                                return propName && propName !== 'children' && propName !== 'id';
                            });
                            const res = props.map(p => getPropName(p.key)).join('|');
                            props.forEach(p => attrs.add(getPropName(p.key)));
                            currentModule.collectProps[type.value] = res;
                        },
                    });
                });
            });
        });
    }
}
exports.default = TaroNormalModulesPlugin;
//# sourceMappingURL=TaroNormalModulesPlugin.js.map